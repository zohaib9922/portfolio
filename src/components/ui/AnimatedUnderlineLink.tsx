import type { AnchorHTMLAttributes, ReactNode } from "react";

interface AnimatedUnderlineLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export default function AnimatedUnderlineLink({
  children,
  className = "",
  ...rest
}: AnimatedUnderlineLinkProps) {
  return (
    <a {...rest} className={`group relative inline-block ${className}`}>
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-smooth group-hover:scale-x-100" />
    </a>
  );
}
