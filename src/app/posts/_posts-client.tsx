"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { fetchPost, Post } from "#/app/posts/_fetch-posts";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";

const getRandomPosts = (posts: Post[], count: number): Post[] => {
    const shuffled = [...posts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

export default function PostsClientPage() {
    const {
        data: posts,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery<Post[], Error>({
        queryKey: ["posts"],
        queryFn: fetchPost,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false
    });

    if (isError) {
        return <div className="p-4 text-red-500">Error: {error.message}</div>;
    }

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex flex-row gap-4 overflow-x-auto pb-4">
                {posts &&
                    getRandomPosts(posts, 3).map((post) => (
                        <Card key={post.id} className="min-w-[300px]">
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-3">{post.body}</p>
                            </CardContent>
                        </Card>
                    ))}
            </div>
            <div className="mt-4">
                <Button onClick={() => refetch()} disabled={isFetching}>
                    {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Refetch
                </Button>
            </div>
        </div>
    );
}
