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
                                            boxShadow: '0px 10px 20px -4px rgb(0 0 0 / 50%)',
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
                <div style={{
                    width:'100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'left',
                }}>
                    {
                        photos && photos.map((photo: any, index: number) => {
                            const delay = Math.floor(index/3) * 0.1
                            return (
                                <div style={{
                                    width: '33.33%',
                                }}>
                                <div key={photo.id} style={{
                                    position: 'relative',
                                    aspectRatio: '1 / 1',
                                    margin: '12px',
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
                                                objectFit: 'cover',
                                                objectPosition: '50% 50%',
                                                boxShadow: '0px 10px 20px -4px rgb(0 0 0 / 50%)',
                                            }}
                                            fill
                                            quality={60}
                                        />
                                    </Link> 
                                </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
    }
}