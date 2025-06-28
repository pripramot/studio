import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M 95,50 A 45,45 0 1 1 95,49.9"
        className="stroke-primary"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="38" className="fill-foreground" />
      <text
        x="50"
        y="57"
        fontFamily="cursive"
        fontSize="50"
        textAnchor="middle"
        className="fill-primary font-bold"
      >
        R
      </text>
    </svg>
  );
}
