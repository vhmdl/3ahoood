interface Props {
  active: boolean;
  color?: string;
}

/** Point of light that expands and swallows the screen. */
export function WarpTransition({ active, color = "#cfe1ff" }: Props) {
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 animate-[warp-dark_1.6s_ease-in_forwards] bg-black opacity-0" />
      <div
        className="h-2 w-2 rounded-full animate-[warp-point_1.6s_cubic-bezier(0.7,0,0.3,1)_forwards]"
        style={{ backgroundColor: color, boxShadow: `0 0 60px 12px ${color}` }}
      />
    </div>
  );
}
