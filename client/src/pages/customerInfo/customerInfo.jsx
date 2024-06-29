import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

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

    console.log(clientId)

    return (
        <>
            <Nav />
            <Aside clientId={clientId} />

            <div id='clientInfoContainer' className="container-lg">
                <div className="row">
                    {clients.map(client => (
                        <div className="col-md-12 offset-md-2 border border-primary" key={client.id}>
                            <h4 className="mt-3 mb-3 fs-1 text-center">{client.firstName} {client.lastName}</h4>
                            <div className="card mt-5">
                                <div className="card-body">
                                    <h3 className="ms-3">Address: {client.address}</h3>
                                    <h3 className="ms-3 mt-3">SSN/TIN: {client.tin}</h3>
                                    <h3 className="ms-3 mt-3">Birthday: {client.birthday}</h3>
                                    <h3 className="ms-3 mt-3">Phone: {client.phoneNumber}</h3>
                                </div>
                            </div>

                            <div className="card mt-4 mb-4">
                                <h5 className="fs-2 mt-2 text-center">Deposit Accounts</h5>
                                {client.accounts.map(account => (
                                    <div className="card-body" key={account._id}>
                                        <h6 className="fs-3">Account Type: {account.accountType}</h6>
                                        <p className="fs-3">Balance: {account.balance}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="card mt-4 mb-4">
                            <h5 className="fs-2 mt-2 text-center">Loan Accounts</h5>
                                {client.loans.map(loan => (
                                    <div className="card-body" key={loan._id}>
                                       <h6 className="fs-3">Loan Type: </h6>
                                    </div>
                            ))}
                            </div>

                            <div className="card mt-4 mb-4">
                            <h5 className="fs-2 mt-2 text-center">Account Services</h5>
                            {client.services.map(service => (
                                <div className="card-body" key={service._id}>
                                    <h6 className="fs-3">Service Type:</h6>
                                </div>
                            ))}
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
};

export default CustomerInfo;