import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../baseURL';
import toast from 'react-hot-toast';

export const Product_log = ({ product, setProduct }) => {

    const delet = async() => {
        const res = await axios.request({
            url: `${baseURL}remove-product.php?id=${product.productId}`, method:'GET'
        });

        res.data.status === "200"? toast.success("Product Deleted"): toast.error("Something Went Wrong");

        setProduct((await axios.request({method:'GET', url:`${baseURL}add-product.php` })).data.products);
    }
    
    return (
        <div className="product">
            <div className="left">
                {/* <button className="bi bi-pen"></button> */}
                <button className="bi bi-trash3" onClick={delet}></button>
            </div>
            <div className="right">
                <div className="p_head">
                    <h2>{product.productName}</h2>
                    <span className="small"></span>
                </div>
                <div className='border-top sales'>
                    <span><div className="bi bi-wave"></div> Selling: {product.sellingPrice}Tsh</span>
                    <span>Buyed at:  {product.buyingPrice}Tsh</span>
                </div>
                <div className="date">
                    {product.registedDate}
                </div>
            </div>
            
        </div>
    )
}
