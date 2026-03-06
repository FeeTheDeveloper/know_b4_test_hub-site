interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
      {icon && (
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brandGold/10 flex items-center justify-center text-brandGold">
          {icon}
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
