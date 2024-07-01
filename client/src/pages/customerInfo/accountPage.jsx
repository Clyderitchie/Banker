import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

import './customerPage.css';

import Nav from "../../components/nav/nav";
import Aside from "../../components/aside/aside";

// TODO:
// Style the containers for client account data
// Use classnames in order to have a main css file (App.css or index.css) to use the same data on the container for uniform look across pages

function Accounts() {

    const { clientId } = useParams;
    const [clientAccount, setClientAccounts] = useState([]);

    const [getClient, { loading, data, error }] = useLazyQuery(QUERY_CLIENT, {
        variables: { clientId },
        onCompleted: (data) => {
            setClientAccounts(data.getClient);
        },
    });

    useEffect(() => {
        getClient();
    }, [clientId])

    console.log('Account page: ', data);

    return (
        <>
            <Nav />
            <Aside />

            <div id='accountInfoContainer' className="container-lg">
                <div className="row">
                    {clientAccount.map(account => (
                        <div className="col-md-12 offset-md-2 border border-primary" key={clientAccount.id}>
                            <h2 className="text-center mb-3 p-1 fs-1">
                                {account.firstName} {account.lastName}
                            </h2>
                            <div className="card mt-4 mb-4">
                                <h5 className="fs-2 mt-2 text-center">Deposit Accounts</h5>
                                {account.accounts.map(clientAccount => (
                                    <div className="card-body" key={clientAccount.id}>
                                        <h6 className="fs-3">Account Type: {clientAccount.accountType}</h6>
                                        <p className="fs-3">Balance: {clientAccount.balance}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Accounts;