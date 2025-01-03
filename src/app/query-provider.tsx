"use client";

import React from "react";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 6 * 1000
            }
        }
    });
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        // Make a new query client if we don't have one.
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
