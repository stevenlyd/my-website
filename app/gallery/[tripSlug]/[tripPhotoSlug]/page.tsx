import SImage from "@/components/SImage";
import {API} from "@/public/variables";
import Exif from "@/components/Exif";
import PhotoDetail from "@/components/PhotoDetail";

const fetchPhoto = (slug: string) => fetch(`${API}/collections/photos/records?` + new URLSearchParams({
    filter: `slug='${slug}'`,
}), {
    method: 'get',
    cache: 'force-cache',
    // next: {
    //     revalidate: 60,
    // }
}).then((res) => res.json())

export default async function TripPhoto({params:{tripPhotoSlug}}: {params: {tripPhotoSlug: string}}) {
    const photoSlug = tripPhotoSlug
    const data = await fetchPhoto(photoSlug)
    const photo = data.items[0]

    return (
        <PhotoDetail photo={photo}/>
    )
}

export const dynamicParams = true

export async function generateStaticParams({params: {tripSlug}}: any) {
    const fetcher = () => fetch(`${API}/collections/trips/records?` + new URLSearchParams({
        filter: `slug='${tripSlug}'`,
        expand: 'photos',
    }), {
        method: 'get',
    }).then((res) => res.json())

    const data = await fetcher()

    const paramsArr = data.items[0].expand.photos.map((item: any, index: number) => {
        return (
            {
                tripPhotoSlug: item.slug,
            }
        )
    })
    return paramsArr
}
