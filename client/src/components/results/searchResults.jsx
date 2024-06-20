import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_CLIENT } from '../../utils/queries';


// TODO:
// Refactor the layout of the search return using Bootstrap

function SearchResults({ searchQuery, clients }) {

    const filteredClients = clients.filter(client => {
        return client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.tin.includes(searchQuery);
    });

    return (
        <>

            <div className="container border border-primary">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <h4>Name</h4>
                        <h4>Address</h4>
                    </div>
                    <div className="col-10 mt-3">
                        {filteredClients.map((client) => (
                            <Link className="d-inline-flex justify-content-between" to={`/customers/${client._id}`} key={client._id}>
                                <li>
                                    <h5>{client.firstName} {client.lastName}</h5>
                                </li>
                                <li>
                                    <h5>{client.address}</h5>
                                </li>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchResults;