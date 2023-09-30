import axios from 'axios';
import React from 'react'

const CustomerDeals = ({ deals, num, setDeals, setCount }) => {
    const {dealID, dealTitle, dealDescription, dealSummary, dealPicture, registeredBy, CustomerUnique, customerId, price, registedDate} = deals;
    const handledel = async () => {
        const del = await axios.delete("http://localhost/tailor_backend/deals.php", { data: JSON.stringify({ "id": dealID }) });
        // const status = del.data;
        const getall = async () => {
            const response = await axios.get(`http://localhost/tailor_backend/dealforone.php?customer=${CustomerUnique}&employee=${registeredBy}`);
            setDeals(response.data.deals);
            setCount(response.data.counter);
        }
        getall();
    }
    return (
        <div className="row">
            <div className="col-2 card_black">
                <div className="center">
                    <h1>{num + 1}</h1>
                </div>
            </div>
            <div className="col-7">
                <h4>{dealTitle}</h4>
                <p>{(dealDescription).substring(0, 150)}...</p>
                <span><i className="bi bi-coin"></i> {price} Tshs.</span>
            </div>
            <div className="col-2">
                <div className="title" style={{ display: "grid" }}>
                    {/* <Link to={`/customers/${customerID}`} className="bi bi-folder-fill" style={{ color: "var(--black)", textDecoration: 'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer' }}> view</Link> */}
                    <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} ></i>
                    <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} onClick={handledel} ></i>
                </div>
            </div>
        </div>
    )
}

export default CustomerDeals