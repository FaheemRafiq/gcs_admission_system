import axios from 'axios';

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions<T> {
    url: string;
    method?: FetchMethod;
    body?: T;
    headers?: Record<string, string>;
}

async function AxiosWrapper<TBody = unknown>({ url, method = 'GET', body, headers = {} }: FetchOptions<TBody>) {
    return axios({
        url,
        method,
        headers: {
            ...headers,
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        data: body,
    });
}

export { AxiosWrapper };
