import React from "react";
import useSWR from 'swr'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useMediaQuery} from "@mui/material";

const fetcher = (url: string) => fetch(url + new URLSearchParams({
    sort: '-created',
}), {
    method: 'get',
    cache:'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())

export default function Trips() {
    const {data, error, isLoading} = useSWR('https://steven-pocketbase.fly.dev/api/collections/trips/records?', fetcher)
    const mobile = !useMediaQuery('(min-width:700px)')
    const currentPath = usePathname()
    return (
        <div style={{
            position: 'sticky',
            top: '120px',
            left: '0px',
            display: 'flex',
            flexDirection: `${mobile ? 'row' : 'column'}`,
            justifyContent: `${mobile ? 'space-around' : 'start'}`,
            margin: `${mobile ? '0px 0px 25px 0px' : '0px 25px 0px 0px'}`,
        }}>
            {!isLoading && data.items.map((trip: any, index: number) => {
                return (
                    <Link href={`/gallery/${trip.id}`} key={trip.id} style={{
                        textDecoration: `${currentPath === `/gallery/${trip.id}` ? 'underline':'none'}`,
                        textUnderlineOffset:'8px',
                        color: 'inherit',
                    }}>
                        <h4>{trip.name}</h4>
                    </Link>
                )
            })}
        </div>
    )
}