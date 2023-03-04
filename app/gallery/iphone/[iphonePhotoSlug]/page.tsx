import { API } from "@/public/variables";
import PhotoDetail from "@/components/PhotoDetail";

const fetchPhoto = (slug: string) => fetch(`${API}/collections/iphone/records?` + new URLSearchParams({
    filter: `slug='${slug}'`,
}), {
    method: 'get',
    cache: 'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())

export default async function IphonePhoto({ params: { iphonePhotoSlug } }: { params: { iphonePhotoSlug: string } }) {
    const photoSlug = iphonePhotoSlug
    const data = await fetchPhoto(photoSlug)
    const photo = data.items[0]

    return (
        <PhotoDetail photo={photo}/>
    )
}

export const dynamicParams = true

export async function generateStaticParams() {
    const fetcher = () => fetch(`${API}/collections/iphone/records?` + new URLSearchParams({}), {
        method: 'get',
    }).then((res) => res.json())

    const data = await fetcher()

    const paramsArr = data.items.map((item: any, index: number) => {
        return (
            {
                iphonePhotoSlug: item.slug,
            }
        )
    })
    return paramsArr
}