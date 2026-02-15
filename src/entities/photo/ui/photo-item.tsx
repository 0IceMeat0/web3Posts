"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PhotoItemProps } from "./types";
import s from "./photo-item.module.scss";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYzFjMmUiLz48L3N2Zz4=";

export function PhotoItem({ photo, priority = false }: PhotoItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={`/photos/${photo.id}`} className={s.item}>
      <div className={s.thumb}>
        {!loaded && <div className={s.skeletonThumb} />}
        <Image
          src={`https://picsum.photos/seed/${photo.id}/300/225`}
          alt={photo.title}
          fill
          className={loaded ? s.imageVisible : s.imageHidden}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          priority={priority}
          onLoad={() => setLoaded(true)}
        />
        <div className={s.overlay} />
      </div>
      <div className={s.titleBar}>
        <p className={s.title}>{photo.title}</p>
      </div>
    </Link>
  );
}
