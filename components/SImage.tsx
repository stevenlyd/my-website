'use client'
import {Fade} from "@mui/material";
import Image from 'next/image'

interface TransitionProps {
    transitionDuration: number,
    transitionDelay?: number,
}

interface SImageProps {
    src: string,
    alt: string
    key?: string,
    transition?: TransitionProps | false,

    [x: string]: any
}

export default function SImage(props: SImageProps) {
    const {src, alt, key, transition = false, ...rest} = props

    if (transition) {
        const {transitionDuration, transitionDelay = 0} = transition
        return (
                <Fade key={key} in timeout={transitionDuration} style={{
                    transitionDelay: `${transitionDelay}s`,
                    display: 'inherit',
                }}>
                    <Image
                        src={src} alt={alt}
                        width={1500}
                        height={1500}
                        style={{
                            height: 'auto',
                            width: 'auto',
                            maxWidth: '100%',
                            maxHeight: '75vh',
                            margin: 'auto',
                            justifySelf: 'center',
                            boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                        }}
                        {...rest}
                    />
                </Fade>
        )
    } else {
        return (
                <Image
                    key={key} src={src} alt={alt}
                    width={1500}
                    height={1500}
                    style={{
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '75vh',
                        margin: 'auto',
                        justifySelf: 'center',
                        boxShadow: '0 10px 20px -4px rgb(0 0 0 / 50%)',
                    }}
                    {...rest}
                />
        )
    }
}