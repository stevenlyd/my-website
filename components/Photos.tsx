import Link from 'next/link'
import { API } from '@/public/variables'
import MyImage from './MyImage'
import styles from './Photos.module.scss'

export default function Photos({
  photos,
  layout,
}: {
  photos: any[]
  layout: 'list' | 'grid'
}) {
  switch (layout) {
    case 'list':
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {photos &&
            photos.map((photo: any, index: number) => {
              const delay = index * 100
              return (
                <div
                  key={photo.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    margin: '24px 0px 24px 0px',
                  }}
                >
                  <Link
                    href={`/gallery/${photo.expand.trip.slug}/${photo.slug}`}
                  >
                    <MyImage
                      src={`${API}/files/photos/${photo.id}/${photo.photo}`}
                      alt={photo.id}
                      transition={{
                        duration: 800,
                        delay: delay,
                      }}
                      style={{
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '50vh',
                        margin: 'auto',
                        justifySelf: 'center',
                        objectPosition: '50% 50%',
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
        </div>
      )
    case 'grid':
      return (
        <div
        className={styles.Grid}
        >
          {photos &&
            photos.map((photo: any, index: number) => {
              const delay = Math.floor(index / 3) * 100
              const mobileDelay = Math.floor(index / 2) * 100
              return (
                <div
                className={styles.Divider}
                >
                  <div
                    key={photo.id}
                    className={styles.ImageContainer}
                  >
                    <Link href={`/gallery/iphone/${photo.slug}`}>
                      <MyImage
                        src={`${API}/files/iphone/${photo.id}/${photo.photo}`}
                        alt={photo.id}
                        transition={{
                          duration: 800,
                          delay: delay,
                          mobileDelay: mobileDelay,
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
            })}
        </div>
      )
  }
}
