import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

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

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {clientAccount.map(account => (
                            <div className="col-12" key={clientAccount.id}>
                                {account.firstName}
                            {account.accounts.map(clientAccount => (
                               <div className="col-12" key={clientAccount.id}>
                                 {clientAccount.accountType} 
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