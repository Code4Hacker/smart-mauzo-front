import axios from 'axios';
import moneybg from '../../../assets/money.jpg';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseURL, baseURL2 } from '../../../baseURL';

const Stock_card = ({card}) => {
    const { stockTitle, stockDes, stockCost, registeredBy, stockImage, quantity, dateIn } = card;
    const date = dateIn;
    const [empname, setEmpname] = useState();
    useEffect(() => {
        const emp = async () => {
            const response = await axios.get(`${baseURL}Ename.php?id=${registeredBy}`);
            setEmpname(response.data.fullname[0]);
        }
        emp();
    },[]);
    return (
        <div className="box_stock">
            <div className="image_holder">
                <img src={stockImage?.length > 1 ? baseURL2 + stockImage : moneybg} alt="" loading='lazy' />
            </div>
            <div className="">
                <p>{stockTitle}</p>
                <span className="small italic">
                    Date: {date}
                </span>
                <div className="">
                    <span className="small">
                        {stockDes}
                    </span>
                </div>
                <div className="price_holder">
                    <i className="bi bi-star-half"></i><i className="bi bi-coin"></i> <span className="small">{stockCost} Tshs. @({quantity} Items)</span><br />
                </div>
                    <span className="small italic" style={{fontSize:'x-small'}}>
                        PostedBy: {empname !== undefined ? empname.employeeFirst + " " + empname.employeeLast : registeredBy}
                    </span>
            </div>
        </div>
    )
}

export default Stock_card