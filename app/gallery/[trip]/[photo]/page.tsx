import SImage from "@/components/SImage";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {API} from "@/public/variables";


const fetchPhoto = (slug: string) => fetch(`${API}/collections/photos/records?` + new URLSearchParams({
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
            <SImage src={`${API}/files/photos/${photo.id}/${photo.photo}`} alt={photo.title}
                    transition={{transitionDuration: 800}}
                    style={{
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '75vh',
                        margin: 'auto',
                        justifySelf: 'center',
                        boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                    }}
            />
        </div>
    )
}

export const dynamicParams = true

export async function generateStaticParams({params: {trip}}: { params: { trip: string } }) {
    const fetcher = () => fetch(`${API}/collections/trips/records?` + new URLSearchParams({
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