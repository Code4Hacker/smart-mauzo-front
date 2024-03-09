import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../baseURL';
import toast from 'react-hot-toast';

export const Expenses_log = ({ product, setProduct }) => {

    const delet = async() => {
        const res = await axios.request({
            url: `${baseURL}remove-product.php?id=${product.productId}`, method:'GET'
        });

        res.data.status === "200"? toast.success("Product Deleted"): toast.error("Something Went Wrong");

        setProduct((await axios.request({method:'GET', url:`${baseURL}add-product.php` })).data.products);
    }
    
    return (
        <div className="product">
            <div className="left text-center">
                {/* <button className="bi bi-pen"></button> */}
                {/* <button className="bi bi-trash3" onClick={delet}></button> */}
                <div className="small">Quantity: {Number(product.ex_qty*product.ext_cost).toLocaleString()} Tshs.</div>
                <span style={{
                    color:'green'
                }}><i className="bi bi-graph-stack-fill"></i> Category:  {product.ext_category}</span>
            </div>
            <div className="right">
                <div className="p_head">
                    <h2 style={{
                        marginBottom:'5px'
                    }}>{product.ex_title}</h2>
                    <span className="small" style={{fontSize:'15px', marginTop:'-20px'}}>{product.ex_desc}</span>
                    <div className="small">Total: {product.ex_qty}</div>
                </div>
                <div className='border-top sales'>
                    <span><i className="bi bi-graph-down-arrow"></i> Cost: {(Number(product.ext_cost).toLocaleString())}Tsh</span>
                    
                </div>
                <div className="date">
                    {product.generate_at}
                </div>
            </div>
            
        </div>
    )
}
export default Expenses_log;