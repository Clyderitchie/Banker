import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

import './customerPage.css';

import Nav from '../../components/nav/nav';
import Aside from '../../components/aside/aside';

// TODO:
//  Refactor the layout of the page using Bootstrap (Make it dynamic)
//  Restyle the customer info section that is at top of the page.
//  Refactor props passed to Aside and nav to render the Tellers Name on top of the Aside like the home page
//  Factor in date open for accounts
//  Factor data for when client began banking at bank
//  Security questions

function CustomerInfo() {
    const { clientId } = useParams();
    const [clients, setClients] = useState([]);

    const [getClient, { loading, data, error }] = useLazyQuery(QUERY_CLIENT, {
        variables: { clientId },
        onCompleted: (data) => {
            setClients(data.getClient);
        },
    });

    useEffect(() => {
        getClient();
    }, [clientId])

    return (
        <>
            <Nav />
            <Aside clientId={clientId}/>

            <div id='clientInfoContainer' className="container w-50">
                <div className="row w-100 d-flex justify-content-center align-items-center">
                    <div className="col-12 mb-4">
                        {clients.map(client => (
                            <div className="mt-2" key={client.id}>
                                <div className="d-flex justify-content-center border-bottom border-dark mb-3">
                                    <h4 className="mt-3 mb-3 fs-1">{client.firstName} {client.lastName}</h4>
                                </div>
                                <div className="col-12 d-flex justify-content-center mt-4">
                                    <div className="col-6">
                                        <h3 className="ms-3">Address: {client.address}</h3>
                                        <h3 className="ms-3 mt-3">SSN/TIN: {client.tin}</h3>
                                    </div>
                                    <div className="col-6">
                                        <h3 className="ms-3 mt-3">Birthday: {client.birthday}</h3>
                                        <h3 className="ms-3 mt-3">Phone: {client.phoneNumber}</h3>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

            {/*
                        <div id='loanInfo'>
                            <p>Loans:</p>
                            {client.loans.map(loan => (
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown button
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li key={loan._id}>
                                            Loan Type:
                                        </li>
                                    </ul>
                                </div>
                                <ul id='loanAccount'>
                                    <li key={loan._id}>
                                        Loan Type:
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div id='serviceInfo' >
                            <p>Services</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </>
    )
};

export default CustomerInfo;