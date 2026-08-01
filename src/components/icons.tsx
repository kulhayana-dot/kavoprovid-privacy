type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconMachineOff({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="4" width="12" height="16" rx="2" />
      <path d="M8 9h6M8 13h3" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

export function IconCupEmpty({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 8h10l-1 9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
      <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M9 4c0 1-1 1-1 2M13 4c0 1-1 1-1 2" strokeDasharray="1 2.5" />
    </svg>
  );
}

export function IconClockWait({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconQuestionCall({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 4h3l1.5 3.5L9.5 9a9 9 0 0 0 5.5 5.5l1.5-2L20 14v3a2 2 0 0 1-2 2C11.5 19 5 12.5 5 6a2 2 0 0 1 2-2Z" />
      <circle cx="18" cy="6" r="3.5" />
      <path d="M18 5v1.2M18 7.6v.1" strokeWidth="1.3" />
    </svg>
  );
}

export function IconCoinLoss({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7v6c0 1.66 3.13 3 7 3s7-1.34 7-3V7" />
      <path d="M5 13v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4" />
      <path d="M9 9.5l6 5M15 9.5l-6 5" strokeWidth="1.3" />
    </svg>
  );
}

export function IconBolt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" />
    </svg>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20s-7-4.35-9.5-8.5C.9 8.2 2.4 5 5.8 5c2 0 3.3 1.1 4.2 2.4C10.9 6.1 12.2 5 14.2 5c3.4 0 4.9 3.2 3.3 6.5C15 15.65 12 20 12 20Z" />
    </svg>
  );
}

export function IconSmile({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 14c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />
      <path d="M9 10h.01M15 10h.01" strokeWidth="2.4" />
    </svg>
  );
}

export function IconGauge({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15l4-5" />
      <path d="M12 15h.01" strokeWidth="2.4" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconMachine({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="4" width="12" height="16" rx="2" />
      <path d="M8 9h6M8 13h3" />
      <circle cx="15.5" cy="16" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCupFull({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 8h10l-1 9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
      <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8.5 5.5c0-1 1-1 1-2M12 5.5c0-1 1-1 1-2" />
      <path d="M8 11.5h8" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function IconWrench({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L4 16.2V20h3.8l5.3-5.3a4 4 0 0 0 4.6-5.4l-2.8 2.8-2-2 2.8-2.8Z" />
    </svg>
  );
}

export function IconTruck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="7" width="11" height="9" rx="1" />
      <path d="M13.5 10h3.5l3 3v3h-6.5v-6Z" />
      <circle cx="6.5" cy="17.5" r="1.6" />
      <circle cx="16" cy="17.5" r="1.6" />
    </svg>
  );
}

export function IconRefresh({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  );
}

export function IconHeadset({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      <path d="M10 21v-4h4v4" />
    </svg>
  );
}
