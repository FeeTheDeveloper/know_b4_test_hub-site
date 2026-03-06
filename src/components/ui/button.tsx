import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const styles = {
  primary:
    "bg-brandGold text-brandBlue font-semibold hover:bg-brandGoldLight transition-colors",
  secondary:
    "bg-white text-gray-900 font-semibold border border-gray-200 hover:bg-gray-50 transition-colors",
  outline:
    "border border-brandGold text-brandGold font-semibold hover:bg-brandGold/10 transition-colors",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
