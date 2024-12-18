import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
function SearchBar({ setSearchTerm }: SearchBarProps) {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(term);
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [term]);
  return (
    <div className="relative flex justify-center items-center">
      <input
        type="text"
        placeholder="Search tasks"
        className="px-4 py-2 w-full font-semibold border-2 rounded-2xl placeholder-gray-500 text-xs sm:text-sm md:text-base"
        maxLength={20}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <FaSearch
        color="6b7280"
        className="absolute right-4 pointer-events-none"
      />
    </div>
  );
}
export default SearchBar;
