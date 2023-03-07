import React, { Ref } from "react";
import useSWR from 'swr'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API } from "@/public/variables";

const fetcher = (url: string) => fetch(url + new URLSearchParams({
    sort: '-created',
}), {
    method: 'get',
    cache: 'force-cache',
    // next: {
    //     revalidate: 60,
    // }
}).then((res) => res.json())


export default function Trips({ setIsLoaded }: { setIsLoaded: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { data, error, isLoading } = useSWR(`${API}/collections/trips/records?`, fetcher)
    const currentPath = usePathname()
    return (
        <>
            {!isLoading && data.items.map((trip: any, index: number) => {
                if (index+1 === data.items.length) {
                    setIsLoaded(true)
                }
                return (
                    <Link href={`/gallery/${trip.slug}`}
                        key={trip.id}
                        style={{
                            textDecoration: `${currentPath?.includes(trip.slug) ? 'underline' : 'none'}`,
                            textUnderlineOffset: '8px',
                            color: 'inherit',
                        }}
                    >
                        <h3 style={{
                            zIndex: '1300', //Otherwise the text will not stay underneath the main navbar
                        }}>
                            {trip.name}
                        </h3>
                    </Link>
                )
            })}
        </>
    )
}