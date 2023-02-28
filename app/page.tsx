import SImage from "@/components/SImage";

const fetchHomePagePhoto = () => fetch(`https://steven-pocketbase.fly.dev/api/collections/photos/records?` + new URLSearchParams({
    page: '1',
    perPage: '1',
    sort: '-created',
}), {
    method: 'get',
    cache: 'force-cache',
    next: {
        revalidate: 60,
    }
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