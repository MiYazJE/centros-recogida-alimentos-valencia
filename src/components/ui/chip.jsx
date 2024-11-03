import { cn } from "@/lib/utils";
import * as Toggle from "@radix-ui/react-toggle";


export function Chip({ label, selected, className, ...props }) {
  return (
    <Toggle.Root
      pressed={selected}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        "border border-gray-300",
        "hover:bg-gray-100",
        "data-[state=on]:bg-blue-500 data-[state=on]:text-white",
        className
      )}
      {...props}
    >
      {label}
    </Toggle.Root>
  );
}
