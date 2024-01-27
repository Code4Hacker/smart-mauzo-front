import React from 'react'

export const Product_log = () => {
    return (
        <div className="product">
            <div className="left">
                <button className="bi bi-pen"></button>
                <button className="bi bi-trash3"></button>
            </div>
            <div className="right">
                <div className="p_head">
                    <h2>New Jersey</h2>
                    <span className="small">90  Items remain</span>
                </div>
                <div className='border-top sales'>
                    <span><div className="bi bi-wave"></div> Selling: 9000 Tsh</span>
                    <span>Buyed at: 4000 Tsh</span>
                </div>
                <div className="date">
                    13th June, 2023
                </div>
            </div>
        </div>
    )
}
