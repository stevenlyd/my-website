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
                    overflow:'hidden',
                    
                }}>
                    <Image
                        src={src} alt={alt}
                        placeholder='empty'
                        {...rest}
                    />
                </Fade>
        )
    } else {
        return (
            <div style={{
                overflow: 'hidden',
            }}>
                <Image
                    key={key} src={src} alt={alt}
                    placeholder='empty'
                    {...rest}
                />
            </div>
        )
    }
}