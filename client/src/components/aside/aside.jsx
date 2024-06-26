import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TELLER } from '../../utils/queries';

import './aside.css';

// TODO:
//  Add a link for clients loans and another one for clients services pages. 

function Aside({ tellerId, clientId }) {

    const { data } = useQuery(QUERY_TELLER, {
        variables: { tellerId },
        fetchPolicy: "cache-and-network"
    });

    const teller = data?.getTeller || {};

    console.log('Aside query_teller: ', data);

    return (
        <>

            <div id="aside" className="container border-end border-black w-25">
                <div className="row">
                    <div className="col-4">
                        <h2 className='mb-5 p-1'>
                            {teller.username}
                        </h2>
                        <ul id='asideList' className='text-decoration-none mt-5'>
                            <li className="asideItem text-decoration-none">Customer Information</li>
                            <li className="asideItem text-decoration-none">
                                <Link className='text-decoration-none text-black' to={`/accounts/${clientId}`}>
                                    Accounts
                                </Link>

                            </li>
                            <li className="asideItem text-decoration-none">Loans</li>
                            <li className="asideItem text-decoration-none">Services</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

};

export default Aside;