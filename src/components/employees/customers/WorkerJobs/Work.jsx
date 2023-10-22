import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { baseURL } from '../../../../baseURL';
import Loading from '../../../Loader/Loading';

const Work = ({ works }) => {
    const [splitted_deal, setSplittled_deal] = useState();
    const [money, setMoney] = useState(0);
    const { dealID, tracking, registedDate,dealStatus } = works;
    let date = ((new Date(`${registedDate.split("-")[1]}/${registedDate.split("-")[2]}/${registedDate.split("-")[0]}`))).getDay();
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
    // console.log("THIS", (mydate))
    const deal_picks = async () => {
        const getdata_for = await axios.get(`${baseURL}contentfor1d.php?id=${dealID}`);
        setSplittled_deal(getdata_for.data.deals);
        let fdt = new FormData();
        fdt.append("id", dealID);
        let bodydat = fdt;
        const deal = await axios.request({
            method: 'POST',
            url: `${baseURL}dealtotal.php`,
            data: bodydat
        });

        // if (deal.data.status === "200") {
        setMoney(Number(deal.data.ONE_TOTAL).toLocaleString())
        // console.log(getdata_for);
        // }
    }
    useEffect(() => { 
        deal_picks();
     }, []);
    return (
        <div className='grid works'>
            <div className="day">
                <div className="center">
                    {mydate}
                </div>
            </div>
            <div className="line">
            </div>
            <div className="content">
                {
                    splitted_deal !== undefined && splitted_deal?.length > 0 ? splitted_deal.map((d, k) =>
                        <div className="week_jb_gemini" key={k}>
                            <div className="row">
                                <div className="col-8">
                                    <span>{d.categories}</span><br />
                                    <span className='x-small' style={{
                                        color:'gray'
                                    }}>{dealStatus}</span>
                                </div>
                                <div className="col-4 text-end">
                                    {d.price * d.quantity} Tshs. 
                                     <span className="x-small">
                                       [ Price {d.price}
                                        @({d.quantity}) Items ]
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : <Loading />
                }
            </div>
        </div>
    )
}

export default Work