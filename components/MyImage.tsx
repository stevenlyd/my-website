import Image from 'next/image'
import { CSSProperties } from 'react'
import styles from './MyImage.module.scss'

interface TransitionProps {
  duration: number
  delay?: number
  mobileDelay?: number
}

interface MyImageProps {
  src: string
  alt: string
  key?: string
  transition?: TransitionProps
  style?: CSSProperties

  [x: string]: any
}

export default function MyImage(props: MyImageProps) {
  const { src, alt, key, transition, style = {}, ...rest } = props

  if (transition) {
    const { duration, delay = 0, mobileDelay = 0 } = transition
    return (
      <Image
        className={styles.Image}
        src={src}
        alt={alt}
        style={{
          ...style,
          animationDuration: `${duration}ms`,
          ['--delay' as any]: `${delay}ms`,
          ['--mobileDelay' as any]: `${mobileDelay}ms`,
        }}
        {...rest}
      />
    )
  } else {
    return (
      <Image
        key={key}
        src={src}
        alt={alt}
        style={{
          ...style,
        }}
        {...rest}
      />
    )
  }
}
