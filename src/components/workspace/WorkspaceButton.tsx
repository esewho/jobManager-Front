import type { ButtonHTMLAttributes, ReactNode } from "react";

interface WorkspaceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function WorkspaceButton({
  children,
  variant = "primary",
  size = "lg",
  isLoading = false,
  disabled,
  className = "",
  ...props
}: WorkspaceButtonProps) {
  const baseStyles =
    "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg font-bold leading-normal transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants = {
    primary:
      "bg-[#137fec] text-white hover:bg-[#137fec]/90 shadow-lg shadow-[#137fec]/20 tracking-[0.015em]",
    secondary:
      "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-base",
    lg: "h-14 px-6 text-lg w-full",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Creating...
        </span>
      ) : (
        <span className="truncate">{children}</span>
      )}
    </button>
  );
}
