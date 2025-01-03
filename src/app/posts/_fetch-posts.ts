export interface Post {
    id: number;
    title: string;
    body: string;
}

export function fetchPost() {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
}
