interface TechBadgeProps {
  label: string;
  className?: string;
}

export default function TechBadge({ label, className = "" }: TechBadgeProps) {
  return (
    <span className={`rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold text-text-2 ${className}`}>
      {label}
    </span>
  );
}
