import Photos from "@/components/Photos";
import {API} from "@/public/variables";

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

export default async function Trips({params}: { params: { tripSlug: string } }) {
    const tripSlug = params.tripSlug
    const data = await fetchPhotos(`${API}/collections/trips/records?`, tripSlug)
    const photoArr = data.items[0].expand.photos
    return (
        <>
            <Photos photos={photoArr} layout={'list'}/>
        </>
    )
}

