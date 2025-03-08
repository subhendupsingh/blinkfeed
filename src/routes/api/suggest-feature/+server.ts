import { bugReports } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dbError } from '$lib/helpers/errors';

export const POST: RequestHandler = async ({request, locals: {db}}) => {
    try {
        const body = await request.json() as { contact: string; message: string };

        if(!body.contact || !body.message) {
            return json({ success: false, message: 'Please enter contact and message' }, { status: 400 });
        }
        const newSuggestion = await db.insert(bugReports).values({
            contact: body.contact,
            message: body.message
        });
        
        return json({ success: true, newSuggestion });
    } catch (error) {
        return dbError(error);
    }
};