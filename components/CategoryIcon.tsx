import type { CategoryIconKey } from "@/lib/types";

const paths: Record<CategoryIconKey, React.ReactNode> = {
  sofa: (
    <>
      <path d="M4 12V9a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 9v3" />
      <rect x="2.5" y="12" width="19" height="5.5" rx="1.5" />
      <path d="M4 17.5v2M20 17.5v2" />
      <path d="M2.5 14.5h19" />
    </>
  ),
  table: (
    <>
      <rect x="2.5" y="6" width="19" height="3" rx="1" />
      <path d="M5 9v9M19 9v9" />
      <path d="M3.5 18h3M17.5 18h3" />
    </>
  ),
  chair: (
    <>
      <path d="M7.5 12V8a4.5 4.5 0 0 1 9 0v4" />
      <path d="M10 8v4M14 8v4" />
      <rect x="6.5" y="12" width="11" height="3" rx="1.2" />
      <path d="M8 15v5.5M16 15v5.5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" />
      <path d="M3 15h18" />
      <rect x="4.5" y="8.5" width="6" height="4" rx="1" />
      <path d="M3 18v2M21 18v2" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 3v18" />
      <path d="M9.5 11.5v1M14.5 11.5v1" />
    </>
  ),
  lamp: (
    <>
      <path d="M8 4h8l2 6H6l2-6Z" />
      <path d="M12 10v8" />
      <path d="M8 21h8" />
    </>
  ),
  dresser: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M4 9h16M4 15h16" />
      <path d="M8 6h2M8 12h2M8 18h2" />
    </>
  ),
  "tv-stand": (
    <>
      <rect x="2.5" y="14" width="19" height="5" rx="1" />
      <path d="M4 19v2M20 19v2" />
      <rect x="7" y="4" width="10" height="7" rx="1" />
      <path d="M9 11v1.5M15 11v1.5" />
    </>
  ),
  "entry-cabinet": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 6.5v1.3" />
      <path d="M8 11.5c0-2.2 1.8-3.7 4-3.7s4 1.5 4 3.7" />
      <path d="M6.5 11.5h11" />
    </>
  ),
  vanity: (
    <>
      <rect x="4" y="13" width="16" height="3" rx="1" />
      <path d="M6.5 16v5M17.5 16v5" />
      <path d="M9 13V6a3 3 0 0 1 6 0v7" />
    </>
  ),
  bedroom: (
    <>
      <path d="M2.5 17v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
      <path d="M2.5 14.5h10" />
      <rect x="3.5" y="8.5" width="4" height="3" rx="0.8" />
      <path d="M2.5 17v2" />
      <rect x="15.5" y="12" width="4" height="5" rx="0.8" />
      <path d="M17.5 12V9.5" />
      <path d="M16 9.5h3" />
    </>
  ),
  outdoor: (
    <>
      <path d="M12 3c4.7 0 8.5 3.2 8.5 6.8H3.5C3.5 6.2 7.3 3 12 3Z" />
      <path d="M6.7 9.8c0 .9-.7 1.6-1.6 1.6M12.8 9.8c0 .9.6 1.6 1.6 1.6M18.8 9.8c0 .9-.7 1.6-1.6 1.6" />
      <path d="M12 6.6V20" />
      <path d="M12 20c0 1-.9 1.7-1.8 1.4" />
    </>
  ),
  "office-storage": (
    <>
      <rect x="4" y="3" width="16" height="9" rx="1" />
      <path d="M4 7.5h16" />
      <rect x="4" y="12" width="16" height="9" rx="1" />
      <path d="M11.3 15v6" />
    </>
  ),
  "office-chair": (
    <>
      <rect x="8" y="3" width="8" height="8" rx="2.5" />
      <rect x="7" y="12" width="10" height="2.6" rx="1" />
      <path d="M12 14.6v3" />
      <path d="M8 21l2.2-2.7h3.6L16 21" />
    </>
  ),
  shelf: (
    <>
      <path d="M4 3v18M20 3v18" />
      <path d="M4 8h16M4 14h16M4 20h16" />
    </>
  ),
  "shoe-cabinet": (
    <>
      <rect x="3" y="11" width="18" height="8" rx="1.2" />
      <path d="M3 15h18" />
      <path d="M8 6.5c0-.9.9-1.5 2-1.3l4.5 1c1 .2 1.5.8 1.5 1.6 0 .9-.8 1.4-1.8 1.4H8.5c-.3 0-.5-.2-.5-.5Z" />
    </>
  ),
  kitchen: (
    <>
      <rect x="3" y="10" width="18" height="10" rx="1" />
      <path d="M3 15h18" />
      <path d="M7 10V6a1.5 1.5 0 0 1 1.5-1.5H10" />
      <circle cx="16" cy="6.5" r="1.3" />
    </>
  ),
  "tv-wall-unit": (
    <>
      <rect x="2.5" y="3" width="19" height="18" rx="1.2" />
      <path d="M9 3v18M15 3v18" />
      <rect x="9.8" y="9.3" width="4.4" height="4" rx="0.5" />
    </>
  ),
  "wall-shelf": (
    <>
      <rect x="4" y="3" width="6" height="15" rx="0.6" />
      <rect x="8" y="10" width="12" height="7" rx="0.6" />
    </>
  ),
  default: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </>
  ),
};

export const CATEGORY_ICON_OPTIONS: { value: CategoryIconKey; label: string }[] = [
  { value: "sofa", label: "დივანი" },
  { value: "table", label: "მაგიდა" },
  { value: "chair", label: "სკამი" },
  { value: "bed", label: "საწოლი" },
  { value: "wardrobe", label: "კარადა" },
  { value: "lamp", label: "ნათურა" },
  { value: "dresser", label: "კომოდი" },
  { value: "tv-stand", label: "ტვ სადგამი" },
  { value: "entry-cabinet", label: "შემოსასვლელის კარადა" },
  { value: "vanity", label: "ტუალეტის მაგიდა" },
  { value: "bedroom", label: "საძინებელი" },
  { value: "outdoor", label: "ეზოს ავეჯი" },
  { value: "office-storage", label: "საოფისე კარადა" },
  { value: "office-chair", label: "საოფისე სავარძელი" },
  { value: "shelf", label: "თარო" },
  { value: "shoe-cabinet", label: "ფეხსაცმლის კარადა" },
  { value: "kitchen", label: "სამზარეულო" },
  { value: "tv-wall-unit", label: "ტვ-ს კედლის კარადა" },
  { value: "wall-shelf", label: "კედლის თარო" },
  { value: "default", label: "ზოგადი" },
];

export default function CategoryIcon({ iconKey }: { iconKey: CategoryIconKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[iconKey] ?? paths.default}
    </svg>
  );
}
