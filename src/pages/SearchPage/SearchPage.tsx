import React, {FC} from 'react';
import Home, {HomeProps} from "../../components/HomeComponent/Home";

const SearchPage: FC<HomeProps> = ({query, setSidebarOpen}) => {
    return (
        <Home setSidebarOpen={setSidebarOpen} query={query}/>
    );
};

export default SearchPage;