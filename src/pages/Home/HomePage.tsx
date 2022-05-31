import React, {FC} from 'react';
import Home, {HomeProps} from "../../components/HomeComponent/Home";


const HomePage: FC<HomeProps> = ({setSidebarOpen}) => {

    return (
        <div>
            <Home setSidebarOpen={setSidebarOpen} />
        </div>
    );
};

export default HomePage;