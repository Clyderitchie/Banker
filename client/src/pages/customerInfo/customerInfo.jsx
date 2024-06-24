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
            <Aside />

            <div id='clientInfo' className="container">
                <div className="row w-100 d-flex justify-content-center align-items-center">
                    <div className="col-12 mb-4">
                        {clients.map(client => (
                            <div className="mt-2" key={client.id}>
                                <div className="d-flex justify-content-center">
                                    <h4 className="mt-3 fs-1">{client.firstName} {client.lastName}</h4>
                                </div>
                                <div className="mt-3 d-flex flex-row align-items-center justify-content-between border-bottom border-dark">
                                    <h3 className="ms-3">Address:</h3>
                                    <p className="ms-3">{client.address}</p>

                                    <h3 className="ms-3">SSN/TIN:</h3>
                                    <p className="ms-3 ">{client.tin}</p>

                                    <h3 className="ms-3">Birthday</h3>
                                    <p className="ms-3">{client.birthday}</p>

                                    <h3 className="ms-3">Phone</h3>
                                    <p className="ms-3">{client.phoneNumber}</p>
                                </div>
                                <div id='clientAccounts' className="mt-5">
                                    <h2 className="mb-5">Deposit Accounts</h2>
                                    {client.accounts.map(account => (
                                        <div className="mt-2 d-flex justify-content-evenly align-items-center">
                                            <h3>Account Name: {account.accountType}</h3>
                                            <h4>Current Balance: {account.balance}</h4>
                                        </div>
                                    ))}
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