"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SkeletonPhotoDetail, ErrorBlock } from "@/shared/ui";
import { useGetPhotoQuery } from "@/entities/photo";
import type { PhotoDetailPageProps } from "./types";
import s from "./page.module.scss";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYzFjMmUiLz48L3N2Zz4=";

export default function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { id: idStr } = use(params);
  const photoId = Number(idStr);
  const { data: photo, isLoading, isError } = useGetPhotoQuery(photoId);
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className={s.header}>
        <Link href="/photos" className={s.backLink}>
          ← Back to Photos
        </Link>

        {photo && (
          <h1 className={s.title}>
            <span className={s.titleId}>#{photo.id} </span>
            Photo
          </h1>
        )}
      </div>

      {isLoading && <SkeletonPhotoDetail />}

      {isError && (
        <ErrorBlock message="Failed to load photo" backHref="/photos" />
      )}

      {photo && (
        <div className={s.card}>
          <div className={s.imageWrap}>
            {!loaded && <div className={s.skeletonThumb} />}
            <Image
              src={`https://picsum.photos/seed/${photo.id}/800/600`}
              alt={photo.title}
              fill
              className={loaded ? s.imageVisible : s.imageHidden}
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className={s.info}>
            <p className={s.photoTitle}>{photo.title}</p>
            <div className={s.meta}>
              <span>Album #{photo.albumId}</span>
              <span>Photo #{photo.id}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
