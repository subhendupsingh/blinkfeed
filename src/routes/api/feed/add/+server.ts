import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { categories, rssFeeds, subcategories } from '$lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { queue } from '$lib/helpers/queue';

export const POST: RequestHandler = async ({locals: { db }, request, platform}) => {
  const { url, categoryId, subcategoryId } = await request.json() as { url: string; categoryId: number; subcategoryId?: number };

  // Validate the RSS URL
  try {
    new URL(url);
  } catch {
    throw error(400, 'Invalid URL');
  }

  const category = await db.select().from(categories).where(eq(categories.id, categoryId)).get();
  if (!category) {
    throw error(400, 'Category not found');
  }

  // If a subcategory is provided, ensure it belongs to the category
  if (subcategoryId) {
    const subcategory = await db
      .select()
      .from(subcategories)
      .where(and(eq(subcategories.id, subcategoryId), eq(subcategories.categoryId, categoryId)))
      .get();
    if (!subcategory) {
      throw error(400, 'Subcategory does not belong to the selected category');
    }
  }

  // Check for duplicate RSS feeds
  const existingFeed = await db.select().from(rssFeeds).where(eq(rssFeeds.url, url)).get();
  if (existingFeed) {
    throw error(409, 'Feed already exists');
  }

  // Insert the new RSS feed with 'pending' status
  const [newFeed] = await db
    .insert(rssFeeds)
    .values({
      url,
      categoryId,
      subcategoryId,
      status: 'approved',
      createdAt: new Date(),
    })
    .returning();

    // Publish the new feed to the queue
    const queueResponse = await queue.publish({
      body: { id: newFeed.id, url, categoryId, subcategoryId }
    });

    console.log({queueResponse});

   // Return a success response with the inserted feed
   return json({ success: true, feed: newFeed });
};