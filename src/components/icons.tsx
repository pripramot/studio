import type { SVGProps } from "react";

export function TempleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 8.5l10 6.5L22 8.5Z" />
      <path d="M12 22V15" />
      <path d="M2 8.5V17l10 5 10-5V8.5" />
      <path d="M22 8.5l-10 6.5" />
      <path d="M2 8.5l10 6.5" />
    </svg>
  );
}
