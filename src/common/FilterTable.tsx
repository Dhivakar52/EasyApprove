import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterTableProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  buttonLabel?: string;
}

export const FilterTable: React.FC<FilterTableProps> = ({
  options,
  selected,
  onChange,
  className,
  buttonLabel = "Filter",
}) => {
  const toggleFilter = (filterId: string) => {
    if (selected.includes(filterId)) {
      onChange(selected.filter((id) => id !== filterId));
    } else {
      onChange([...selected, filterId]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm bg-white text-gray-700 cursor-pointer shadow-2xs"
          >
            <Filter className="h-4 w-4" />
            <span>{buttonLabel}</span>
            {selected.length > 0 && (
              <span className="ml-1 bg-blue-100 text-blue-700 text-xs px-1.5 py-0.2 rounded-full font-semibold">
                {selected.length}
              </span>
            )}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={5}
            className="w-56 p-3 bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-sm animate-in fade-in-50"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Filters
                </span>
                {selected.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-1 max-h-48 overflow-y-auto">
                {options.map((option) => {
                  const isSelected = selected.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleFilter(option.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors cursor-pointer text-left",
                        isSelected
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                      {isSelected && <span className="text-blue-600">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* Selected Filter Badges */}
      {selected.map((id) => {
        const option = options.find((o) => o.id === id);
        if (!option) return null;
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
          >
            {option.icon}
            {option.label}
            <button
              type="button"
              onClick={() => toggleFilter(id)}
              className="ml-1 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default FilterTable;