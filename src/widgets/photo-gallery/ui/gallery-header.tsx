import s from "./photo-gallery.module.scss";

export const GalleryHeader = () => {
  return (
    <div className={s.heading}>
      <h1 className={s.title}>Photos</h1>
      <p className={s.subtitle}>
        5,000 items with client-side pagination and search
      </p>
    </div>
  );
};
