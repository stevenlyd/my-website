import SImage from "@/components/SImage";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {API} from "@/public/variables";
import Exif from "@/components/Exif";

const fetchPhoto = (slug: string) => fetch(`${API}/collections/iphone/records?` + new URLSearchParams({
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
            flexDirection:'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            <SImage src={`${API}/files/iphone/${photo.id}/${photo.photo}`} alt={photo.title}
                    transition={{transitionDuration: 800}}
                    style={{
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '65vh',
                        marginTop: '2vh',
                        marginBottom: '2vh',
                        marginLeft:'auto',
                        marginRight:'auto',
                        justifySelf: 'center',
                        boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                    }}
            />
                {/* @ts-expect-error Server Component */}
                <Exif url={`${API}/files/iphone/${photo.id}/${photo.photo}`}/>
        </div>
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
                photo: item.slug,
            }
        )
    })
    return paramsArr
}