import React from 'react'

const CustomerDeals = ({ deals, num }) => {
    const {dealID, dealTitle, dealDescription, dealSummary, dealPicture, registeredBy, customerId, price, registedDate} = deals;
    return (
        <div className="row">
            <div className="col-1 card_black">
                <div className="center">
                    <h1>{num + 1}</h1>
                </div>
            </div>
            <div className="col-9">
                <h4>{dealTitle}</h4>
                <p>{dealDescription}</p>
            </div>
            <div className="col-1">
                <div className="title" style={{ display: "grid" }}>
                    {/* <Link to={`/customers/${customerID}`} className="bi bi-folder-fill" style={{ color: "var(--black)", textDecoration: 'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer' }}> view</Link> */}
                    <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} ></i>
                    <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} ></i>
                </div>
            </div>
        </div>
    )
}

export default CustomerDeals