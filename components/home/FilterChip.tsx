type FilterChipProps = {
  label: string;
};

export default function FilterChip({ label }: FilterChipProps) {
  return (
    <button
      type="button"
      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm active:scale-[0.99]"
    >
      {label}
    </button>
  );
}
