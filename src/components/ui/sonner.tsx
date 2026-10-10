import React from "react";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:px-4 group-[.toaster]:py-3",
          description: "group-[.toast]:text-slate-500 text-xs",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500",
          success:
            "!bg-emerald-50 !text-emerald-900 !border-emerald-300 font-medium",
          error:
            "!bg-red-50 !text-red-900 !border-red-300 font-medium",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
