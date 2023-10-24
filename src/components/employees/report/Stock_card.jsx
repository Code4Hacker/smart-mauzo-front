import axios from 'axios';
import moneybg from '../../../assets/money.jpg';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseURL, baseURL2 } from '../../../baseURL';
import { Link } from 'react-router-dom';

const Stock_card = ({card, setStocksdt, setTotal, setSrequirements, cty}) => {
    const { stockID,stockTitle, stockDes, stockCost, registeredBy, stockImage, quantity, dateIn } = card;
    const thedate = new Date();
    const [datefrom1, setDatefrom1] = useState(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate() - 7)}`);
    const [dateto1, setDateto1] = useState(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate())}`);
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
    const handledel = async() => {
        const delet = await axios.get(`${baseURL}stkdel.php?id=${stockID}`);
        if(delet.data.status === "200"){
            const getall = async () => {
                const requirements = await axios.get(`${baseURL}Requirements.php?start=${datefrom1}&to_end=${dateto1}`);
                setSrequirements(requirements.data);
                const stock = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=CLOTHES`);
                if (stock.data.status === "200") {
                    setStocksdt(stock.data.stocks);
                    setTotal(stock.data.TOTAL);
                }
            }
            getall();
        }else{
            alert("FAILED, TRY AGAIN");
            console.log(delet.data.status, stockID);
        }
    }
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
                            <div className="img"><img src={`${baseURL2}${stockImage}`} alt="" loading='lazy' /></div>
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
                            <div className="_stocks">
                                <Link to={`/edit_stock/${stockID}`} className="bi bi-pen"></Link>
                                <i className="bi bi-trash3" onClick={handledel}></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Stock_card