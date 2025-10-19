type PaletteSwatchProps = {
  colors: string[];
  className?: string;
};

export default function PaletteSwatch({
  colors,
  className,
}: PaletteSwatchProps) {
  return (
    <div className={["flex items-center gap-1", className].filter(Boolean).join(" ")}>
      {colors.map((color) => (
        <span
          key={color}
          aria-hidden="true"
          className="h-6 w-6 rounded-full border border-white/60 shadow-sm"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
