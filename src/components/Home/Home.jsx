import React from 'react';
import Tags from "../Tags/Tags"
import Announcement from "../Announcement/Announcement"
import Posts from '../Posts/Posts';

const Home = () => {
    return (
        <div>
            <Tags></Tags>
            <Posts></Posts>
            <Announcement></Announcement>
        </div>
    );
};

export default Home;