import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
  inputClassName?: string;
  allowClear?: boolean;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  delay = 300,
  className,
  inputClassName,
  allowClear = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, onChange]);

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "pl-8 pr-8 py-1.5 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          inputClassName
        )}
      />
      {allowClear && inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default TableSearch;