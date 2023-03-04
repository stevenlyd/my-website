'use client'
import {ImageList, ImageListItem, Stack} from "@mui/material";
import SImage from "@/components/SImage";
import Link from "next/link";
import {API} from "@/public/variables";

export default function Photos({photos, layout}: { photos: any[], layout: 'list' | 'grid' }) {
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
                                        width={1500}
                                        height={1500}
                                        quality={100}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </Stack>
            )
        case 'grid':
            return (
                <ImageList cols={3} gap={24} sx={{
                    margin: '0px',
                }}>
                    {
                        photos && photos.map((photo: any, index: number) => {
                            const delay = Math.floor(index/3) * 0.1
                            return (
                                <ImageListItem key={photo.id} style={{
                                    overflow: 'hidden',
                                    aspectRatio: '1 / 1',
                                    boxShadow: '0 10px 20px -4px rg(0 0 0 / 50%)', 
                                }}>
                                    <Link href={`/gallery/iphone/${photo.slug}`}>
                                        <SImage
                                            src={`${API}/files/iphone/${photo.id}/${photo.photo}`}
                                            alt={photo.id}
                                            transition={{
                                                transitionDuration: 800,
                                                transitionDelay: delay,
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '0px',
                                                left: '0px',
                                                justifySelf: 'center',
                                                objectFit: 'cover',
                                                objectPosition: 'center center',
                                                boxShadow: '0 10px 20px -4px rg(0 0 0 / 50%)',
                                            }}
                                            fill
                                            sizes='(max-width: 768px) 33.33vw,
                                            (max-width: 1200px) 33.33vw,
                                            33.33vw'
                                            quality={60}
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