import { API } from "@/public/variables"
import Exif from "./Exif"
import styles from "./PhotoDetail.module.scss"
import Image from 'next/image'

export default function PhotoDetail({ photo }: any) {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                <Image src={`${API}/files/${photo.collectionName}/${photo.id}/${photo.photo}`} alt={photo.title}
                    className={styles.image}
                    width={1500}
                    height={1500}
                    quality={100}
                />
                {/* @ts-expect-error Server Component */}
                <Exif url={`${API}/files/${photo.collectionName}/${photo.id}/${photo.photo}`} />
            </div>
        </div>
    )
}