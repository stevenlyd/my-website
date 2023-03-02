import React from "react";
import {API} from "@/public/variables";

export default function TripLayout({children,}: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}

export const dynamicParams = true

export async function generateStaticParams() {
    const fetcher = () => fetch(`${API}/collections/trips/records?` + new URLSearchParams({
        sort: '-created',
    }), {
        method: 'get',
    }).then((res) => res.json())

    const data = await fetcher()

    const paramsArr = data.items.map((item: any, index: number) => {
        return (
            {
                tripSlug: item.slug,
            }
        )
    })
    return paramsArr
}
