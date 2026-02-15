import type { Photo } from "../types";

export interface PhotoItemProps {
  photo: Photo;
  /** Mark first visible items as priority for eager loading */
  priority?: boolean;
}
