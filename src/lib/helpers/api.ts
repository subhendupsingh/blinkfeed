import { json, type RequestEvent } from "@sveltejs/kit";

const endpointUrl = "/api";

export type ErrorResult = {
    message: string;
    code: number;
}

export type ApiResponse<T> = {
    data: T | null;
    error: ErrorResult["message"] | null;
}

export const errorGuard = (data: any): data is ErrorResult => {
    return data.message && data.code;
}

const sendRequest = async <T>(params: {path: string, method: "GET" | "POST" | "PUT" | "DELETE", eFetch?: RequestEvent["fetch"], body?: any}): Promise<ApiResponse<T>> => {
    try {
        const url = `${endpointUrl}${params.path}`
        const f = params.eFetch ? params.eFetch : fetch;
        const response = await f(url, {
            method: params.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.body),
            credentials: 'include',
        });

        return await parseApiResponse<T>(response);
        
        /* const res = await response.json();

        if (errorGuard(res)) {
            return { data: null, error: res.message };
        }

        return { data: res as T, error: null }; */
    } catch (error) {
        console.error(error);
        return { data: null, error: (error as Error).message };
    }
}

export const api = {
    async get<T>(url: string, eFetch?: RequestEvent["fetch"]) {
        return await sendRequest<T>({
            path: url,
            method: 'GET',
            eFetch
        });
    },

    async post<T>(url: string, body: any, eFetch?: RequestEvent["fetch"]) {
        return await sendRequest<T>({
            path: url,
            method: 'POST',
            body,
            eFetch
        });
    },

    async put<T>(url: string, body: any, eFetch?: RequestEvent["fetch"]) {
        return await sendRequest<T>({
            path: url,
            method: 'PUT',
            body,
            eFetch
        });
    },

    async delete<T>(url: string, body?: any, eFetch?: RequestEvent["fetch"]) {
        return await sendRequest<T>({
            path: url,
            method: 'DELETE',
            body,
            eFetch
        });
    }
}

const isError = (data: any): data is ErrorResult => {
    return data.message && data.code;
}

export const parseApiResponse = async <T>(response: any): Promise<ApiResponse<T>> => {
    const contentType =response.headers.get("content-type")
    let data = null;
    
    if(contentType && contentType.indexOf("application/json") !== -1){
        data = await response.json();
    }else{
        data = await response.text();
    }

    if(response.ok){
        if(isError(data)){
            return {
                data: null,
                error: data.message
            };
        }

        const d: T = data; 
        return { data: d, error: null };
    }
    
    return { data: null, error: data.message };
}

export const respond = async <T>(response: any): Promise<Response> => {
    const res = await parseApiResponse<T>(response);
    return json(res);
}