import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "comic";
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-dark-hover border border-dark-border mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-surface-200 mb-1">{title}</h3>
      <p className="text-sm text-surface-400 max-w-md mb-6">{description}</p>
      {action && (
        <Button
          variant={action.variant || "primary"}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
