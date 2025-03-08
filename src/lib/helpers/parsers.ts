import { parse } from 'node-html-parser';

export async function getFavicon(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    const faviconLink =
      root.querySelector('link[rel="icon"]')?.getAttribute('href') ||
      root.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
      `/favicon.ico`; // Fallback to default favicon

    if(faviconLink.indexOf("https://")<0){
        return (url.endsWith('/') ? url : url + '/') + faviconLink;        
    }  

    return faviconLink;
  } catch (err) {
    console.log(`Error while fetching favicon: ${err}`);
    return ''; // Return empty string if favicon fetch fails
  }
}

export async function getOgImage(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const root = parse(html);
      const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content');
      return ogImage || ''; // Return empty string if no OG image is found
    } catch {
      return ''; // Return empty string on error
    }
}

export function isTuple<T extends any>(array: T[]): array is [T, ...T[]] {
    return array.length > 0;
 }