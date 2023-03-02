import {API} from "@/public/variables";

export default async function IphonePhoto ({params: {iphonePhotoSlug}} :{params: {iphonePhotoSlug: string}}) {
    return (
        <>
            <h1>TEST</h1>
        </>
    )
}

export const dynamicParams = true

export async function generateStaticParams() {
    const fetcher = () => fetch(`${API}/collections/iphone/records?` + new URLSearchParams({
    }), {
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