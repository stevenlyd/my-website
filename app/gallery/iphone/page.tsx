import {API} from "@/public/variables";
import Photos from "@/components/Photos";

const fetchPhotos = () => fetch(`${API}/collections/iphone/records?` + new URLSearchParams({
    sort: '-created',
}), {
    method: 'get',
    cache: 'force-cache',
    // next: {
    //     revalidate: 60,
    // }
}).then((res) => res.json())

export default async function Iphone() {
    const data = await fetchPhotos()
    const photoArr = data.items
    return (
        <>
            <Photos photos={photoArr} layout='grid' />
        </>
    )
}