import type { InputHTMLAttributes } from "react";

interface WorkspaceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function WorkspaceInput({
  label,
  hint,
  ...props
}: WorkspaceInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col w-full">
        <p className="text-gray-900  text-sm font-semibold leading-normal pb-2 uppercase tracking-wider">
          {label}
        </p>
        <input
          className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-gray-900  border border-gray-300 bg-white  focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal transition-all"
          {...props}
        />
      </label>
      {hint && <p className="text-gray-400 text-xs">{hint}</p>}
    </div>
  );
}
