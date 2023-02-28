import SImage from "@/components/SImage";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";

const api = process.env.API!

const fetchPhoto = (slug: string) => fetch(`${api}/collections/photos/records?` + new URLSearchParams({
    filter: `slug='${slug}'`,
}), {
    method: 'get',
    cache: 'force-cache',
    next: {
        revalidate: 60,
    }
}).then((res) => res.json())

export default async function Photo({params}: { params: { photo: string } }) {
    const photoSlug = params.photo

    const data = await fetchPhoto(photoSlug)
    const photo = data.items[0]

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            <SImage src={`${api}/files/photos/${photo.id}/${photo.photo}`} alt={photo.title}
                    transition={{transitionDuration: 800}}/>
        </div>
    )
}

export const dynamicParams = true

export async function generateStaticParams({params: {trip}}: { params: { trip: string } }) {
    const fetcher = () => fetch(`${api}/collections/trips/records?` + new URLSearchParams({
        filter: `slug='${trip}'`,
        expand: 'photos',
    }), {
        method: 'get',
    }).then((res) => res.json())

    const data = await fetcher()

    const paramsArr = data.items[0].expand.photos.map((item: any, index: number) => {
        return (
            {
                photo: item.slug,
            }
        )
    })
    return paramsArr
}