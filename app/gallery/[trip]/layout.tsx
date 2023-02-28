import React from "react";

export default function TripLayout({children,}: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}

export const dynamicParams = true

export async function generateStaticParams() {
    const fetcher = () => fetch('https://steven-pocketbase.fly.dev/api/collections/trips/records?' + new URLSearchParams({
        sort: '-created',
    }), {
        method: 'get',
    }).then((res) => res.json())

    const data = await fetcher()

    const paramsArr = data.items.map((item: any, index: number) => {
        return (
            {
                trip: item.slug,
            }
        )
    })
    return paramsArr
}
