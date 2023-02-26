import Photos from "@/components/Photos";

const fetchPhotos = (url: string) => fetch(url + new URLSearchParams({
    expand: 'photos',
    sort: '-created'
}), {
    method: 'get',
    cache:'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())

export default async function Trips({params}: { params: { trip: string } }) {
    const tripID = params.trip
    const data = await fetchPhotos(`https://steven-pocketbase.fly.dev/api/collections/trips/records/${tripID}?`)
    const photoArr = data.expand.photos
    return (
        <Photos photos={photoArr}/>
    )
}

export async function generateStaticParams() {
    const fetcher = () => fetch('https://steven-pocketbase.fly.dev/api/collections/trips/records?' + new URLSearchParams({
        sort: '-created',
        expand: 'photos',
    }), {
        method: 'get',
    }).then((res) => res.json())

    const data = await fetcher()

    const paramsArr = data.items.map((item: any, index: number) => {
        return (
            {
                trip: item.id,
                fallback: 'blocking',
            }
        )
    })

    return paramsArr
}