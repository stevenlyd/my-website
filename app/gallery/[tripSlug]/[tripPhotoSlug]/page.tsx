import SImage from "@/components/SImage";
import {API} from "@/public/variables";
import Exif from "@/components/Exif";

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
        <div style={{
            display: 'flex',
            flexDirection:'column',
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
                        maxHeight: '65vh',
                        marginTop: '2vh',
                        marginBottom: '2vh',
                        marginLeft:'auto',
                        marginRight:'auto',
                        justifySelf: 'center',
                        boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                    }}
                    width={1500}
                    height={1500}
                    quality={100}
            />
                {/* @ts-expect-error Server Component */}
                <Exif url={`${API}/files/photos/${photo.id}/${photo.photo}`}/>
        </div>
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
