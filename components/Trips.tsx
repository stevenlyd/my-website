import React from "react";
import useSWR from 'swr'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useMediaQuery} from "@mui/material";
import {API} from "@/public/variables";

const fetcher = (url: string) => fetch(url + new URLSearchParams({
    sort: '-created',
}), {
    method: 'get',
    cache: 'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())


export default function Trips() {
    const {data, error, isLoading} = useSWR(`${API}/collections/trips/records?`, fetcher)
    const mobile = !useMediaQuery('(min-width:700px)')
    const currentPath = usePathname()
    return (
        <>
                   {!isLoading && data.items.map((trip: any, index: number) => {
                return (
                    <Link href={`/gallery/${trip.slug}`} key={trip.id} style={{
                        textDecoration: `${currentPath?.includes(trip.slug) ? 'underline' : 'none'}`,
                        textUnderlineOffset: '8px',
                        color: 'inherit',
                    }}
                    >
                        <h3 style={{
                            zIndex: '1300',
                        }}>
                            {trip.name}
                        </h3>
                    </Link>
                )
            })} 
        </>
    )
}