import { articles, rssFeeds } from '$lib/db/schema';
import { queue } from '$lib/helpers/queue';
import type { DB } from '$lib/types/bindings';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import Parser from 'rss-parser';
import { getFavicon , getOgImage, isTuple } from '$lib/helpers/parsers';
import { json } from '@sveltejs/kit';
import type { ErrorResult } from '$lib/helpers/api';
import type { BatchItem } from 'drizzle-orm/batch';

const parser = new Parser();

export const POST: RequestHandler = async ({locals: { db }, request}) => {
    const signature = request.headers.get("Upstash-Signature");
    
    if(!signature) {
        return new Response("Could not process the feed URL, signature missing", { status: 401 });
    }

    const body = await request.text();

    const isValid = await queue.verify({ body, signature });

    if (!isValid) {
        return new Response("Invalid request, signature verification failed, not processing the queue", { status: 401 });
    }

    const { id, url, categoryId, subcategoryId } = JSON.parse(body);

    try {
        const feed = await db.select().from(rssFeeds).where(eq(rssFeeds.id, id)).get();
        
        if (!feed || feed.status !== 'approved') {
            return new Response("Feed is not approved", { status: 400 });
        }

        //TODO: Check if any new article after last fetched

        const parsedFeed = await parser.parseURL(feed.url);

        const queryBatch: BatchItem<"sqlite">[] = [];
        let authorName = "Unknown";
        for (const item of parsedFeed.items) {
            if(!item.link || !item.title){
                continue;
            }

            if(!isNewerThanSixMonths(item.pubDate || '')) {
                console.log("Article is older than six months, skipping");
                continue;
            }

            console.log({title: item.title, link: item.link})

            const existingArticle = item.link && await db
              .select()
              .from(articles)
              .where(eq(articles.link, item.link))
              .get();
      
            if (!existingArticle) {
              authorName = item.creator || item.author || authorName;
              const ogImage = await getOgImage(item.link);
              // Insert new article
              queryBatch.push(db.insert(articles).values({
                rssFeedId: id,
                title: item.title,
                pubDate: item.pubDate ? new Date(item.pubDate) : null,
                author: item.creator || item.author,
                summary: item.contentSnippet,
                createdAt: new Date(),
                link: item.link,
                ogImage
              }));
            }
        }

        const metadata = await fetchFeedMetadata(parsedFeed);

        if(metadata){
            queryBatch.push(db.update(rssFeeds).set({
                favicon: metadata.favicon,
                author: authorName,
                blogLastUpdatedAt: metadata.lastUpdated ? new Date(metadata.lastUpdated) : null,
                latestArticles: JSON.stringify(metadata.latestArticles),
                ogImage: metadata.ogImage,
                description: metadata.description,
                blogName: metadata.blogName,
                lastFetchedAt: new Date()
            }).where(eq(rssFeeds.id, id)));
        }

        if(queryBatch.length > 0 && isTuple(queryBatch)){
            await db.batch(queryBatch);
        }

        console.log("Feed processed successfully");

    } catch (error) {
        return new Response("Failed to process the feed URL", { status: 500 });
    }

    return new Response();
};

const fetchFeedMetadata = async (feed: any): Promise<{ favicon: string, author: string, lastUpdated: string, latestArticles: string[], ogImage: string, description: string, blogName: string } | null> => {
    try {
        const favicon = await getFavicon(feed.link); // Fetch favicon from the feed's website
        const author = feed.author || feed.creator || 'Unknown'; // Author name
        const lastUpdated = feed.lastBuildDate || feed.pubDate || new Date().toISOString(); // Last updated timestamp
        const latestArticles = feed.items.slice(0, 3).map((item: any) => {
            return {title: item.title, link: item.link};
        });
        const blogName = feed.title || 'Unknown';
        const latestArticleUrl = latestArticles[0];
        const ogImage = await getOgImage(latestArticleUrl.link);
        const description = feed.description || '';
    
        return { favicon, author, lastUpdated, latestArticles, ogImage, description, blogName } ;
      } catch (err) {
        console.log(`Error while fetching blog metadata: ${err}`)
        return null;
      }
}

const isNewerThanSixMonths = (publishDate: string): boolean => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const cutoffTimestamp = sixMonthsAgo.getTime();
    let pubDate: Date | null = null;
    try {
        pubDate = new Date(publishDate);
    } catch (err) {
        console.log(`Error parsing publish date: ${err}`);
        return false;
    }
    return pubDate && pubDate.getTime() > cutoffTimestamp;
}
