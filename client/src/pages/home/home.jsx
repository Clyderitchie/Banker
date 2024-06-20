import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TELLER } from '../../utils/queries';

import Auth from '../../utils/auth';
import Nav from '../../components/nav/nav';
import Aside from '../../components/aside/aside';
import SearchBar from '../../components/searchBar/searchBar';

function Home() {
    const tellerId = Auth.getProfile().data._id;
    console.log("Home data: ", tellerId);

    return (
        <>
        <Nav/>
        <Aside tellerId={tellerId} />
        <SearchBar />
        {/* <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                Homepage
                </div>
            </div>
        </div> */}
        </>
    )
}

export default Home;