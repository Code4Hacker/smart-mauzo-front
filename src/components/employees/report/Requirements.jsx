import axios from 'axios';
import moneybg from '../../../assets/money.jpg';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseURL, baseURL2 } from '../../../baseURL';

const Requirements = ({card}) => {
    const { DATE_ADDED, THE_DATA } = card;
    let date = ((new Date(`${DATE_ADDED.split("-")[1]}/${DATE_ADDED.split("-")[2]}/${DATE_ADDED.split("-")[0]}`))).getDay();
    let date2 = `${(((new Date(`${DATE_ADDED.split("-")[1]}/${DATE_ADDED.split("-")[2]}/${DATE_ADDED.split("-")[0]}`))).toDateString()).split(" ")[2]}  ${(((new Date(`${DATE_ADDED.split("-")[1]}/${DATE_ADDED.split("-")[2]}/${DATE_ADDED.split("-")[0]}`))).toDateString()).split(" ")[1]}, ${(((new Date(`${DATE_ADDED.split("-")[1]}/${DATE_ADDED.split("-")[2]}/${DATE_ADDED.split("-")[0]}`))).toDateString()).split(" ")[3]}`;
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
    return (
        <div className='grid works'>
            <div className="day">
                <div className="center">
                    {mydate}
                    {/* {", stockImage, DATE_ADDED"} */}
                </div>
            </div>
            <div className="line">
            </div>
            <div className="content">
                <div className="week_jb_gemini">
                    <div className="row">
                        <div className="col-12">
                            {/* <span>{stockTitle}</span><br /> */}
                            <span>{THE_DATA}</span><br />

                            <span className='x-small' style={{
                                color: 'whitesmoke'
                            }}>PostedAt: {date2}</span>
                        </div>
                        {/* <div className="col-4 text-end">
                            {Number(stockCost*quantity).toLocaleString()} Tshs.
                             <span className="x-small num-2" style={{ fontFamily: 'cursive' }}> 
                                [ {Number(stockCost).toLocaleString()} per {quantity} ]
                            </span> 
                            
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Requirements