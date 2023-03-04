import { API } from "@/public/variables"
import { useState } from "react"
import SImage from "./SImage"
import Exif from "./Exif"

export default function PhotoDetail({ photo }: any) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            <SImage src={`${API}/files/iphone/${photo.id}/${photo.photo}`} alt={photo.title}
                transition={{ transitionDuration: 800 }}
                style={{
                    height: 'auto',
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: '65vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    justifySelf: 'center',
                    boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                }}
                width={1500}
                height={1500}
                quality={100}
            />
            {/* @ts-expect-error Server Component */}
            <Exif url={`${API}/files/iphone/${photo.id}/${photo.photo}`} />
        </div>
    )
}