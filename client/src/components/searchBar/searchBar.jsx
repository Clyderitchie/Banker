import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_FIRSTNAME, QUERY_LASTNAME, QUERY_TIN } from '../../utils/queries';

import './search.css';

import SearchResults from "../results/searchResults";
import { set } from "date-fns";

function SearchBar({ tellerId }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [clients, setClients] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const [getClientByFirstName, { error: firstNameError, loading: firstNameLoading, data: firstNameData }] = useLazyQuery(QUERY_FIRSTNAME);
    const [getClientByLastName, { error: lastNameError, loading: lastNameLoading, data: lastNameData }] = useLazyQuery(QUERY_LASTNAME);
    const [getClientByTin, { error: tinError, loading: tinLoading, data: tinData }] = useLazyQuery(QUERY_TIN);

    useEffect(() => {
        if (firstNameData) {
            setClients(firstNameData.getClientByFirstName || []);
        }
    }, [firstNameData]);

    useEffect(() => {
        if (lastNameData) {
            setClients(clients => [...clients, ...(lastNameData.getClientByLastName || [])]);
        }
    }, [lastNameData]);

    useEffect(() => {
        if (tinData) {
            setClients(clients => [...clients, ...(tinData.getClientByTin || [])]);
        }
    }, [tinData]);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            setHasSearched(true)
            getClientByFirstName({ variables: { firstName: searchQuery.trim() } });
            getClientByLastName({ variables: { lastName: searchQuery.trim() } });
            getClientByTin({ variables: { tin: searchQuery.trim() } });
        } else {
            setClients([]);
            setHasSearched(false)
        }
    };

    return (
        <>

            <div id='searchContainer' className="container">
                <div className="row mt-5">
                    <div className="col-12 mt-5">
                        <div id='search' className="input-group mb-3 mt-5">
                            <button id='searchBtn' className="btn btn-dark me-2 rounded-pill" type="submit" onClick={handleSearch}>Search</button>
                            <input type="text" className="form-control rounded-pill w-25" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1"
                                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
                        </div>
                    </div>
                </div>
            </div>

            {hasSearched && (
                <div id='searchReturns' className="d-flex justify-content-center align-items-center mt-5">
                    <SearchResults searchQuery={searchQuery} clients={clients} />
                </div>
            )}
        </>
    )
};

export default SearchBar;