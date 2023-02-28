import Photos from "@/components/Photos";

const fetchPhotos = (url: string, slug: string) => fetch(url + new URLSearchParams({
    filter: `slug='${slug}'`,
    expand: 'photos.trip',
    sort: '-created',
}), {
    method: 'get',
    cache:'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())

export default async function Trips({params}: { params: { trip: string } }) {
    const tripSlug = params.trip
    const data = await fetchPhotos(`https://steven-pocketbase.fly.dev/api/collections/trips/records?`, tripSlug)
    const photoArr = data.items[0].expand.photos
    return (
        <>
            <Photos photos={photoArr}/>
        </>
    )
}

