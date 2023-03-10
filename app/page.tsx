import SImage from "@/components/SImage";
import {API} from "@/public/variables";

// This will fetch the latest photo as homepage photo.
// const fetchHomePagePhoto = () => fetch(`https://steven-pocketbase.fly.dev/api/collections/photos/records?` + new URLSearchParams({
//     page: '1',
//     perPage: '1',
//     sort: '-created',
// }), {
//     method: 'get',
//     cache: 'force-cache',
//     next: {
//         revalidate: 60,
//     }
// }).then((res) => res.json())

export default async function Home() {
    // const data = await fetchHomePagePhoto()
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <SImage
                // This will fetch the latest photo as homepage photo.
                // alt={data.items[0].id}
                // src={`https://steven-pocketbase.fly.dev/api/files/photos/${data.items[0].id}/${data.items[0].photo}`}
                alt='Boston'
                src={`${API}/files/tgyzgtr4jl9bqdf/4so2jjjkeff73r8/museum_jg54VZ3NDy.jpg`}
                transition={{
                    transitionDuration: 800,
                }}
                style={{
                    height: 'auto',
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: 'calc(100vh - 180px - 75px)',
                    margin: 'auto',
                    justifySelf: 'center',
                    alignSelf: 'top',
                    boxShadow: '0px 10px 20px -4px rgb(0 0 0 / 50%)',
                }}
                width={1500}
                height={1500}
                quality={100}
            />
        </div>
    )
}