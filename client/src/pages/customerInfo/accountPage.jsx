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

            <div id='accountInfoContainer' className="container">
                <div className="row w-100 d-flex justify-content-center align-items-center">
                    <div className="col-12 mb-4">
                        {clientAccount.map(account => (
                            <div className="col-12" key={clientAccount.id}>
                                <h2 className="text-center border-bottom border-dark mb-3 p-1">
                                    {account.firstName} {account.lastName}
                                </h2>
                                {account.accounts.map(clientAccount => (
                                    <div className="col-12 mt-5" key={clientAccount.id}>
                                        <h3 className="text-center">
                                            {clientAccount.accountType}
                                        </h3>
                                        <h3 className="d-flex justify-content-start align-items-center">
                                            Available Balance: {clientAccount.balance}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Accounts;