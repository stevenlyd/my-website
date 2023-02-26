'use client'
import {Stack} from "@mui/material";
import SImage from "@/components/SImage";

export default function Photos({photos}: { photos: any[] }) {
    return (
        <Stack spacing={10}>
            {photos && photos.map((photo: any, index: number) => {
                return (
                    <div key={photo.id} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}>
                        <SImage src={`https://steven-pocketbase.fly.dev/api/files/photos/${photo.id}/${photo.photo}`} alt={photo.id} transition={{
                            transitionDuration: 800,
                            transitionDelay: index*0.1,
                        }}
                        />
                    </div>
            )})}
        </Stack>
    )
}