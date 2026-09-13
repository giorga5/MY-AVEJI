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
      <path d="M6 3v8" />
      <path d="M6 7h9" />
      <rect x="6" y="11" width="12" height="3" rx="1" />
      <path d="M7.5 14v6M16.5 14v6" />
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
