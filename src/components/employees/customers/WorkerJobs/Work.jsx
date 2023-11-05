import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { baseURL } from '../../../../baseURL';
import Loading from '../../../Loader/Loading';
import { useParams } from 'react-router-dom';
import MINI from './MINI';

const Work = ({ works }) => {
    const [splitted_deal, setSplittled_deal] = useState();
    const [money, setMoney] = useState(0);
    const { dealID, tracking, registedDate, dealStatus } = works;
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
    const params = useParams();
    let [total, setTotal] = useState(0);
    const deal_picks = async () => {
        const getdata_for = await axios.get(`${baseURL}contentfor.php?id=${dealID}&mini_employee=${params.id}`);
        // console.log(getdata_all);
        setSplittled_deal(getdata_for.data);
        // let m = 0;
        // if(getdata_for.data.deals !== undefined){
        //     for (let index = 0; index < getdata_for.data.deals.length; index++) {
        //         setTotal(total += (getdata_for.data.deals[index].price*getdata_for.data.deals[index].quantity));
        //         console.log(total);
        //     }
        // }

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
    let array = 0;
    return (
        <>
            {splitted_deal !== undefined && splitted_deal.deals?.length > 0 ?
                <div className='grid works'>
                    <div className="day">
                        <div className="center">
                            {mydate}
                        </div>
                    </div>
                    <div className="line">
                    </div>
                    <div className="content">
                        {splitted_deal.deals.map((d, k) =>
                            <div className="" key={k}>
                                <MINI d={d} splitted_deal={splitted_deal} dealID={dealID} dealStatus={dealStatus} key={k} />

                                {/* {array += d.price} */}
                            </div>
                        )}
                    </div>
                </div>
                : ""}
            {/* {array} */}
        </>
    )
}

export default Work