import { useEffect } from "react";
import type { ReactNode } from "react";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomPanelProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSave?: () => void;
  children: ReactNode;
  saveLabel?: string;
  cancelLabel?: string;
  width?: string;
  isLoading?: boolean;
  showFooter?: boolean;
  footer?: ReactNode;
  footerExtra?: ReactNode;
  className?: string;
}

export const CustomPanel = ({
  isOpen,
  title,
  onClose,
  onSave,
  children,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  width = "420px",
  isLoading = false,
  showFooter = true,
  footer,
  footerExtra,
  className,
}: CustomPanelProps) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel Content */}
      <div
        className={cn(
          "relative z-10 bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-gray-200 transform transition-transform duration-300 ease-in-out",
          className
        )}
        style={{ width, maxWidth: "100vw" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 shrink-0 bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 text-gray-700">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (footer ? (
          <div className="p-4 border-t border-gray-200 shrink-0 bg-gray-50/80">
            {footer}
          </div>
        ) : (onSave || cancelLabel) ? (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between shrink-0 bg-gray-50/80">
            <div>{footerExtra}</div>
            <div className="flex items-center gap-3">
              {cancelLabel && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {cancelLabel}
                </button>
              )}
              {onSave && (
                <button
                  type="button"
                  onClick={onSave}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer font-medium"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saveLabel}
                </button>
              )}
            </div>
          </div>
        ) : null)}
      </div>
    </div>
  );
};

export default CustomPanel;