import { FaSearch } from "react-icons/fa";
interface SearchBarProps{
  searchTerm : string,
  setSearchTerm : React.Dispatch<React.SetStateAction<string>>
}
function SearchBar({searchTerm,setSearchTerm}:SearchBarProps) {
  return (
    <div className="relative flex justify-center items-center">
      <input
        type="text"
        placeholder="Search tasks"
        className="px-4 py-2 w-full font-semibold border-2 rounded-2xl placeholder-gray-500 text-xs sm:text-sm md:text-base"
        maxLength={20}
        value={searchTerm}
        onChange={(event)=>setSearchTerm(event.target.value)}
      />
      <FaSearch
        color="6b7280"
        className="absolute right-4 pointer-events-none"
      />
    </div>
  );
}
export default SearchBar;
