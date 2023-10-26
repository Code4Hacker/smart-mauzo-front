import React from 'react';
import "./style.css";
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Search = ({ setDeals, setCount, uri, id }) => {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [dude, setDude] = useState("");

    const uniqueID = async () => {
        const unique_get = await axios.get(`${baseURL}customerID.php?id=${params.id}`);
        setDude(unique_get.data.UNIQUE_ID);
    }
    useEffect(() => {
        uniqueID();
    }, []);

    let path = "";
    switch (id) {
        case "YES":
            path = `${baseURL}${uri}?title=${title}&unique=${dude}`;
            break;
        case "NO":
            path = `${baseURL}${uri}?title=${title}`;
            break;
    }
    const the_title = async () => {
        const search = await axios.get(path);
        setTitle("");
        setDeals(search.data.deals);
        setCount(search.data.deals.length);
    }

    return (
        <div className='search'>
            <input type="text" placeholder='filter Deal by Title...' value={title} onChange={(s) => setTitle(s.target.value)} />
            <button className="" onClick={the_title}>
                <div className="bn2"></div>
                <div className="bn1">
                    <span className="bi bi-search"></span>
                </div>
            </button>
        </div>
    )
}

export default Search;