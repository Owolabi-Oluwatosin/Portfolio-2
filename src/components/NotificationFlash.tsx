export type FlashVariant = "info" | "warning" | "success" | "danger";

interface NotificationFlashProps {
  variant?: FlashVariant;
  message: string;
  onDismiss?: () => void;
}

const VARIANT_STYLES: Record<FlashVariant, { border: string; bg: string; text: string }> = {
  info: { border: "border-b-accent", bg: "bg-accent/10", text: "text-accent" },
  warning: { border: "border-b-amber-500", bg: "bg-amber-500/10", text: "text-amber-400" },
  success: { border: "border-b-accent-2", bg: "bg-accent-2/10", text: "text-accent-2" },
  danger: { border: "border-b-red-500", bg: "bg-red-500/10", text: "text-red-400" },
};

const VARIANT_ICON_PATH: Record<FlashVariant, string> = {
  info: "M8 0a8 8 0 100 16A8 8 0 008 0zM6.75 12V6.75h1.5V12h-1.5zM8 5.5a.875.875 0 110-1.75.875.875 0 010 1.75z",
  warning:
    "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM8 5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 5zm0 6a1 1 0 100 2 1 1 0 000-2z",
  success:
    "M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z",
  danger:
    "M8 0a8 8 0 100 16A8 8 0 008 0zM6.75 4.5h2.5v6h-2.5v-6zM8 12.75a1 1 0 100-2 1 1 0 000 2z",
};

export default function NotificationFlash({
  variant = "info",
  message,
  onDismiss,
}: NotificationFlashProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="alert"
      className={`w-full border-b ${styles.border} ${styles.bg} backdrop-blur`}
    >
      <div className="mx-auto flex max-w-content items-center gap-2 px-5 py-2.5 text-sm">
        <svg
          viewBox="0 0 16 16"
          className={`h-4 w-4 shrink-0 fill-current ${styles.text}`}
        >
          <path d={VARIANT_ICON_PATH[variant]} />
        </svg>
        <p className="flex-1 text-fg/90">{message}</p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 text-muted transition-colors hover:text-fg"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
