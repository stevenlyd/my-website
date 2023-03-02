'use client'
import { ImageList, ImageListItem, Stack } from "@mui/material";
import SImage from "@/components/SImage";
import Link from "next/link";
import { API } from "@/public/variables";

export default function Photos({ photos, layout }: { photos: any[], layout: 'list' | 'grid' }) {
    switch (layout) {
        case 'list':
            return (
                <Stack spacing={10}>
                    {photos && photos.map((photo: any, index: number) => {
                        return (
                            <div id={photo.id} key={photo.id} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                            }}>
                                <Link href={`/gallery/${photo.expand.trip.slug}/${photo.slug}`}>
                                    <SImage
                                        src={`${API}/files/photos/${photo.id}/${photo.photo}`}
                                        alt={photo.id}
                                        transition={{
                                            transitionDuration: 800,
                                            transitionDelay: index * 0.1,
                                        }}
                                        style={{
                                            height: 'auto',
                                            width: 'auto',
                                            maxWidth: '100%',
                                            maxHeight: '50vh',
                                            margin: 'auto',
                                            justifySelf: 'center',
                                            boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                                        }}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </Stack>
            )
        case 'grid':
            return (
                <ImageList cols={3}>
                    {
                        photos && photos.map((photo: any, index: number) => {
                            return (
                                <ImageListItem key={photo.id}>
                                    <Link href={`/gallery/iphone/${photo.slug}`}>
                                        <SImage
                                            src={`${API}/files/iphone/${photo.id}/${photo.photo}`}
                                            alt={photo.id}
                                            transition={{
                                                transitionDuration: 800,
                                                transitionDelay: index * 0.1,
                                            }}
                                            style={{
                                                height: 'auto',
                                                width: 'auto',
                                                maxWidth: '100%',
                                                maxHeight: '50vh',
                                                margin: 'auto',
                                                justifySelf: 'center',
                                                boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                                            }}
                                        />
                                    </Link>
                                </ImageListItem>
                            )
                        })
                    }
                </ImageList>
            )
    }

}