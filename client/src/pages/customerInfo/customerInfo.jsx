import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

// import './customerPage.css';

import Nav from '../../components/nav/nav';
import Aside from '../../components/aside/aside';

// TODO:
//  Refactor the layout of the page using Bootstrap (Make it dynamic)
// Make sure all the Client's data can be rendered to the page. 

function CustomerInfo({ tellerId }) {
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

    console.log('CustomerInfo clientId: ', data);

    return (
        <>
            <Nav tellerId={tellerId} />
            <Aside />
            <div id='clientInfo'>
                <h1 id='customerInfo'>Customer Information</h1>
                {clients.map(client => (
                    <div id='clientPersonalInfo' key={client._id}>
                        <div id='clientInfoBox'>
                            <div id='clientBox'>
                                <div id='clientName'>
                                    <h4>Name:</h4>
                                    <p id='name' className="ms-3">{client.firstName} {client.lastName}</p>
                                </div>
                                <div id='clientBirthday'>
                                    <h4>Birthday:</h4>
                                    <p id='birthday' className="ms-3">{client.birthday}</p>
                                </div>
                                <div id='clientAddress'>
                                    <h4>Address:</h4>
                                    <p id='address' className="ms-3">{client.address}</p>
                                </div>
                            </div>
                            <div id='clientBox1'>
                                <div id='clientPhone'>
                                    <h4>Phone number:</h4>
                                    <p id='phone' className="ms-3">{client.phoneNumber} </p>
                                </div>
                                <div id='clientTin'>
                                    <h4>SSN/TIN:</h4>
                                    <p id='tin' className="ms-3">{client.tin}</p>
                                </div>
                            </div>
                        </div>

                        <div id='clientAccounts'>
                            {client.accounts.map(account => (
                                <div className="dropdown">
                                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Accounts:
                                    </button>
                                    <ul className="dropdown-menu w-50">
                                        <li key={account._id}>
                                            Account Type: {account.accountType}
                                        </li>
                                        <li key={account._id}>
                                            Account balance: {account.balance}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {/* <div id='loanInfo'>
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
                        </div> */}
                    </div>
                ))}
            </div>
        </>
    )
};

export default CustomerInfo;