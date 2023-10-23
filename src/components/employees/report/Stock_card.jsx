import axios from 'axios';
import moneybg from '../../../assets/money.jpg';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseURL, baseURL2 } from '../../../baseURL';

const Stock_card = ({card}) => {
    const { stockTitle, stockDes, stockCost, registeredBy, stockImage, quantity, dateIn } = card;
    // const date = dateIn;
    let date = ((new Date(`${dateIn.split("-")[1]}/${dateIn.split("-")[2]}/${dateIn.split("-")[0]}`))).getDay();
    let date2 = `${(((new Date(`${dateIn.split("-")[1]}/${dateIn.split("-")[2]}/${dateIn.split("-")[0]}`))).toDateString()).split(" ")[2]}  ${(((new Date(`${dateIn.split("-")[1]}/${dateIn.split("-")[2]}/${dateIn.split("-")[0]}`))).toDateString()).split(" ")[1]}, ${(((new Date(`${dateIn.split("-")[1]}/${dateIn.split("-")[2]}/${dateIn.split("-")[0]}`))).toDateString()).split(" ")[3]}`;
    let mydate = date;
    switch (date) {
        case 1: mydate = "Monday"; break;
        case 2: mydate = "Tuesday"; break;
        case 3: mydate = "Wednesday"; break;
        case 4: mydate = "Thursday"; break;
        case 5: mydate = "Friday"; break;
        case 6: mydate = "Saturday"; break;
        case 0: mydate = "Sunday"; break;
        default: mydate = "What is this ?, " + date; break;
    }
    const [empname, setEmpname] = useState();
    useEffect(() => {
        const emp = async () => {
            const response = await axios.get(`${baseURL}Ename.php?id=${registeredBy}`);
            setEmpname(response.data.fullname[0]);
        }
        emp();
    },[]);
    return (
        <div className='grid works'>
            <div className="day">
                <div className="center">
                    {mydate}
                    {/* {", stockImage, dateIn"} */}
                </div>
            </div>
            <div className="line">
            </div>
            <div className="content">
                <div className="week_jb_gemini">
                    <div className="row">
                        <div className="col-8">
                            <span>{stockTitle}</span><br />
                            <span>{stockDes}</span><br />
                            <span className='x-small' style={{
                                color: 'whitesmoke'
                            }}>PostedBy: {empname !== undefined ? empname.employeeFirst + " " + empname.employeeLast : registeredBy}</span>
                        </div>
                        <div className="col-4 text-end">
                            {Number(stockCost*quantity).toLocaleString()} Tshs. <br />
                            <span className="x-small num-2" style={{ fontFamily: 'cursive' }}>
                                [ {Number(stockCost).toLocaleString()} per {quantity} ]
                            </span><br />
                            {date2}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        // <div className="box_stock">
        //     <div className="image_holder">
        //         <img src={stockImage?.length > 1 ? baseURL2 + stockImage : moneybg} alt="" loading='lazy' />
        //     </div>
        //     <div className="">
        //         <p>{stockTitle}</p>
        //         <span className="small italic">
        //             Date: {date}
        //         </span>
        //         <div className="">
        //             <span className="small">
        //                 {stockDes}
        //             </span>
        //         </div>
        //         <div className="price_holder">
        //             <i className="bi bi-star-half"></i><i className="bi bi-coin"></i> <span className="small">{stockCost} Tshs. @({quantity} Items)</span><br />
        //         </div>
        //             <span className="small italic" style={{fontSize:'x-small'}}>
        //                 PostedBy: {empname !== undefined ? empname.employeeFirst + " " + empname.employeeLast : registeredBy}
        //             </span>
        //     </div>
        // </div>
    )
}

export default Stock_card