import { DrizzleError } from "drizzle-orm";
import type { ErrorResult } from "./api";
import { json } from "@sveltejs/kit";

export const dbError = (error: any): Response => {
    if (error instanceof DrizzleError) {
        console.log("Cause: ", error.cause);
        console.log("Message: ", error.message);
        console.log("Name: ", error.name);

        return json({
            message: `${error.name}:${error.message}`,
            code: 500
        }, { status: 500 })
    } else {
        console.log("Error: ", error);
        if (error?.message.indexOf("UNIQUE constraint failed") > -1) {
            return json({
                message: "Duplicate resource. Resource has already been created",
                code: 500
            }, { status: 500 })
        }
    }

    return json({
        message: error?.message ?? "Error in handleDbError",
        code: 500
    }, { status: 500 })
}