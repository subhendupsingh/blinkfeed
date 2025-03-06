import { dev } from "$app/environment";
import { QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY, QSTASH_TOKEN } from "$env/static/private";
import { Client, Receiver, type PublishToUrlResponse } from "@upstash/qstash"

const processUrl = dev ? 'https://23da-2401-4900-8838-78a9-eda6-d776-4e23-8768.ngrok-free.app/api/feed/process' : "";

export const queue = {
    publish: async (params: { body: any, url?: string}): Promise<PublishToUrlResponse | null> => {
        try {
            const client = new Client({ token: QSTASH_TOKEN });
            const response = await client.publishJSON({
                url: params.url ?? processUrl,
                body: params.body
            });
            
            return response;
        } catch (error) {
            console.log('error while publishing to queue', error);
            return null;
        }
    },
    verify: async (params: { body: any, signature: string, url?: string}): Promise<boolean> => {
        const receiver = new Receiver({
            currentSigningKey: QSTASH_CURRENT_SIGNING_KEY,
            nextSigningKey: QSTASH_NEXT_SIGNING_KEY,
        });

        const isValid = receiver.verify({
            body: params.body,
            signature: params.signature,
            url: params.url ?? processUrl
        });

        return isValid;
    }
}