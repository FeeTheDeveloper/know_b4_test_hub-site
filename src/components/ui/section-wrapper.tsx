interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionWrapper({
  children,
  className = "",
  dark = false,
}: SectionWrapperProps) {
  return (
    <section
      className={`py-16 lg:py-20 ${dark ? "bg-primary-800 text-white" : "bg-white text-gray-900"} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
