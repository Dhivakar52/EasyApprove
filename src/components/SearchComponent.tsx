import { TableSearch } from "@/common/TableSearch";

interface SearchComponentProps {
  search: string;
  setSearch: (value: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
}

const SearchComponent = ({
  search,
  setSearch,
  placeholder = "Search",
  delay = 300,
  className,
}: SearchComponentProps) => {
  return (
    <TableSearch
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
      delay={delay}
      className={className}
      inputClassName="py-1 border rounded-md"
    />
  );
};

export default SearchComponent;
