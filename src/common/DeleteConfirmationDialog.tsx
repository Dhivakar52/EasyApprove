import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this record?",
  itemName,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isDeleting = false,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50 border border-gray-200 animate-in zoom-in-95">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <Dialog.Title className="text-base font-semibold text-gray-900">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mt-1">
                {description} {itemName ? `"${itemName}"` : ""}
              </Dialog.Description>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={onConfirm}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 cursor-pointer"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DeleteConfirmationDialog;