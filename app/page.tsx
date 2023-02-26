import SImage from "@/components/SImage";

const fetchHomePagePhoto = () => fetch(`https://steven-pocketbase.fly.dev/api/collections/photos/records?` + new URLSearchParams({
    page: '1',
    perPage: '1',
    sort: '-created',
}), {
    method: 'get',
    cache: 'force-cache',
}).then((res) => res.json())

export default async function Home() {
    const data = await fetchHomePagePhoto()
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
        }}>
            <SImage alt={data.items[0].id}
                    src={`https://steven-pocketbase.fly.dev/api/files/photos/${data.items[0].id}/${data.items[0].photo}`}
                    transition={{
                        transitionDuration: 800,
                    }}
            />
        </div>
    )
}