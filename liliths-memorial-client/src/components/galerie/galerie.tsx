import Image from 'next/image'
import styles from './ImageGallery.module.css' // Assuming you have CSS modules set up
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key } from 'react';
import { GaleryImage } from '@/lib/definitions';



export default function ImageGallery({ images }: { images: GaleryImage[] }) {


  return (
    <div className={styles.gallery}>
      {images.map((img: GaleryImage) => (
        <div key={img.id} className={styles.galleryItem}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            layout="responsive"
          />
        </div>
      ))}
    </div>
  );
}