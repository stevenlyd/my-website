import Photos from "@/components/Photos";
import { API } from "@/public/variables";

const fetchPhotos = () => fetch(`${API}/collections/iphone/records?` + new URLSearchParams({
    sort: '-created',
}), {
    method: 'get',
    cache: 'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())

export default async function Page() {
    const data = await fetchPhotos()
    const photoArr = data.items
    return (
        <>
            <Photos photos={photoArr} layout='grid' />
        </>
    )
}