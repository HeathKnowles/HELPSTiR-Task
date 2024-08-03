import { FC, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="w-full p-2 border rounded text-black"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Search</button>
    </form>
  );
};

export default SearchBar;