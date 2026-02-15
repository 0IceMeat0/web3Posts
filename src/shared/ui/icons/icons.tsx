import { useId, type SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
  size?: number;
}

const BrandGradient = ({ id }: { id: string }) => (
  <defs>
    <linearGradient
      id={id}
      x1="0"
      y1="0"
      x2="24"
      y2="24"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#9557E8" />
      <stop offset="40%" stopColor="#4657E5" />
      <stop offset="100%" stopColor="#13DBF5" />
    </linearGradient>
  </defs>
);

/** Document icon for Posts */
export function PostsIcon({ active = false, size = 20, ...props }: IconProps) {
  const uid = useId();
  const color = active ? `url(#${uid})` : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <BrandGradient id={uid} />
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
        stroke={color}
      />
      <polyline points="14 2 14 8 20 8" stroke={color} />
      <line x1="8" y1="13" x2="16" y2="13" stroke={color} />
      <line x1="8" y1="17" x2="13" y2="17" stroke={color} />
    </svg>
  );
}

/** Image/landscape icon for Photos */
export function PhotosIcon({ active = false, size = 20, ...props }: IconProps) {
  const uid = useId();
  const color = active ? `url(#${uid})` : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <BrandGradient id={uid} />
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} />
      <circle cx="8.5" cy="8.5" r="1.5" stroke={color} />
      <polyline points="21 15 16 10 5 21" stroke={color} />
    </svg>
  );
}

/** Search/magnifying glass icon */
export function SearchIcon({ active = false, size = 20, ...props }: IconProps) {
  const uid = useId();
  const color = active ? `url(#${uid})` : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <BrandGradient id={uid} />
      <circle cx="11" cy="11" r="8" stroke={color} />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} />
    </svg>
  );
}

/** Exit/logout icon */
export function LogoutIcon({ active = false, size = 20, ...props }: IconProps) {
  const uid = useId();
  const color = active ? `url(#${uid})` : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <BrandGradient id={uid} />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} />
      <polyline points="16 17 21 12 16 7" stroke={color} />
      <line x1="21" y1="12" x2="9" y2="12" stroke={color} />
    </svg>
  );
}
