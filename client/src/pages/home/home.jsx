import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TELLER } from '../../utils/queries';

import Auth from '../../utils/auth';
import Nav from '../../components/nav/nav';
import Aside from '../../components/aside/aside';
import SearchBar from '../../components/searchBar/searchBar';

import '../../app.css';

function Home() {
    const tellerId = Auth.getProfile().data._id;
    console.log("Home data: ", tellerId);

    return (
        <>
            <Nav />
            <div id='homeContainer' className="container-md text-center">
                <div className="row">
                    <div id='searchBarContainer' className="col-md-6 offset-md-5">
                        <Aside tellerId={tellerId} />
                        <SearchBar />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;