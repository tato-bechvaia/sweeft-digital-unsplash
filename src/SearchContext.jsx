/* eslint-disable react/prop-types */
// AuthContext.js
import { createContext, useState } from 'react';

// Create the context
export const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {

    const [searchedQueries, setSearchedQueries] = useState([]);

    return (
        <SearchContext.Provider value={{searchedQueries, setSearchedQueries}}>
            {children}
        </SearchContext.Provider>
    );
};
