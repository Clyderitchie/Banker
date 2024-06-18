import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TELLER } from '../../utils/queries';

import Auth from '../../utils/auth';
import Nav from '../../components/nav/nav';

function Home() {
    const tellerId = Auth.getProfile().data._id;
    console.log("Home data: ", tellerId);

    return (
        <>
        <Nav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                Homepage
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;