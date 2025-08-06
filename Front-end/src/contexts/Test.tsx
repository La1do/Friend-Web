import { createContext, useState, useContext } from "react";

const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: (term: string) => {},
});

export const SearchProvider = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
