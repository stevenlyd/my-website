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
            marginTop: '50px',
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
                    maxHeight: '75vh',
                    margin: 'auto',
                    justifySelf: 'center',
                    boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                }}
            />
        </div>
    )
}