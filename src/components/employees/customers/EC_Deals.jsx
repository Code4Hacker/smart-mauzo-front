import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../baseURL';
import { Link, useNavigate, useParams } from 'react-router-dom';
import raws from './../raws.json';
import jQuery from 'jquery';
import Loading from '../../Loader/Loading';

const EC_Deals = ({ deals }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [payed, setPayed] = useState();
    const [count3, setCount3] = useState(0);
    const { dealID, dealTitle, dealDescription, dealSummary, dealPicture, registeredBy, CustomerUnique, customerId, price, registedDate, dealRequirements, measurements, dealStatus, tracking, quantity } = deals;
    const [trackin, setTrackin] = useState(tracking);
    const handledel = async () => {
        const del = await axios.get(`${baseURL}dealdel.php?id=${dealID}`);
        // const status = del.data;
        const getall = async () => {
            const response = await axios.get(`${baseURL}onecustomer.php?id=${params.id}`);
            setContents(response.data.customer[0]);
            const deals = await axios.get(`${baseURL}dealforone.php?customer=${response.data.customer[0].customerUnique}&employee=${response.data.customer[0].registeredBy}`);
            setWorks(deals.data.deals);

        }
        getall();
    }
    const handleStatus = async () => {
        let formDATA = new FormData();
        formDATA.append("dealnum", dealID);
        if (payed === "PENDING") {
            setPayed("PAID");
            formDATA.append("status", "PAID");
            let bodydata = formDATA;
            const update = await axios.request({
                url: `${baseURL}updatedeal.php`,
                method: 'POST',
                data: bodydata
            });
            if (update.data.status !== "200") {
                alert("Error");
            } else {
                alert("Updated Successiful");
            }
        } else {
            setPayed("PENDING");
            formDATA.append("status", "PENDING");
            let bodydata = formDATA;
            const update = await axios.request({
                url: `${baseURL}updatedeal.php`,
                method: 'POST',
                data: bodydata
            });
            if (update.data.status !== "200") {
                alert("Error");
            } else {
                alert("Updated Successiful");
            }
        }
    }
    const query = () => {
        jQuery(".options .bi-x").on("click", function () {
            jQuery(".options").fadeOut({ duration: 500 });
        });
        jQuery(".print-opt").on("click", function () {
            jQuery(".options").fadeIn({ duration: 1000 });
        });
        jQuery(`.filte.f-${dealID} > *:nth-child(2) > *`).on("click", function () {
            jQuery(`.filte.f-${dealID} > *:nth-child(2) > *`).removeClass("hover");
            jQuery(this).addClass("hover");
        });
    }
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
        setCount3(Number(deal.data.ONE_TOTAL).toLocaleString())
        // console.log(deal);
        // }
    }
    const [splitted_deal, setSplittled_deal] = useState();
    useEffect(() => {
        setPayed(dealStatus);
        // contentfor1d.php?id=2

        deal_picks();

        query();
    }, []);
    const invoice = () => {
        navigate(`/invoice/${window.localStorage.dealC !== undefined ? window.localStorage.dealC : dealID}`);
    }
    const delivery = () => {
        navigate(`/delivery/${window.localStorage.dealC !== undefined ? window.localStorage.dealC : dealID}`);
    }
    const receipt = () => {
        navigate(`/receipt/${window.localStorage.dealC !== undefined ? window.localStorage.dealC : dealID}`);
    }
    const pro_forma = () => {
        navigate(`/pro_forma2/${window.localStorage.dealC !== undefined ? window.localStorage.dealC : dealID}`);
    }
    const handleTracking = async (evt) => {
        setTrackin(evt.target.value);
        const update = await axios.get(`${baseURL}updatedeal.php?dealnum=${dealID}&tracks=${evt.target.value}`);
        if (update.data.status !== "200") {
            alert("Error");
        } else {
            alert("Updated Successiful");
        }
    }
    const deal_pick = async (PATH) => {
        const getdata_for = await axios.get(`${baseURL}filterAll.php?id=${dealID}&ctg=${PATH}`);
        setSplittled_deal(getdata_for.data.deals);
    }

    // const all = () => deal_picks();
    // const menj = () => deal_pick('MEN JACKET');
    // const ment = () => deal_pick('MEN TROUSER');
    // const wej = () => deal_pick('WOMEN JACKET');
    // const wet = () => deal_pick('WOMEN TROUSER');
    // const wed = () => deal_pick('WOMEN DRESS');
    // const shoes = () => deal_pick('SHOES');

    return (
        <div className="deal product_list" onClick={() => window.localStorage.setItem("dealC", dealID)}>

            <div className="product">
                <div className="left">
                    {/* <button className="bi bi-pen"></button> */}
                    <button className="bi bi-printer" onClick={""}></button>
                </div>
                <div className="right">
                    <div className="p_head">
                        {console.log(deals)}
                        <h2>{deals.productN}</h2>
                        <span className="small">Total {Number(Number(deals.price)*Number(deals.quantity)).toLocaleString()}</span>
                    </div>
                    <div className='border-top sales'>
                        <span>{Number(deals.price).toLocaleString()}Tsh</span>
                        <span><i className="bi bi-cart-fill"></i> {Number(deals.quantity)}</span>
                    </div>
                    <div className="date">
                        {deals.registedDate}
                    </div>
                </div>
            </div>







            <div className="options" style={{ display: 'none' }}>
                <div className="dialog">
                    <i className="bi bi-x"></i>
                    <h3 className='text-center '>What need to Print ?</h3>
                    <div className="preview" onClick={invoice}>
                        <div className="title">
                            <h4><span>Invoice</span></h4>
                            <span className="small comment desc">
                                Invoice Card
                            </span>
                        </div>
                    </div>
                    <div className="preview" onClick={receipt}>
                        <div className="title">
                            <h4><span>Receipt</span></h4>
                            <span className="small comment desc">
                                Receipt Card
                            </span>
                        </div>
                    </div>
                    <div className="preview" onClick={delivery}>
                        <div className="title">
                            <h4><span>Delivery</span></h4>
                            <span className="small comment desc">
                                Delivery Form
                            </span>
                        </div>
                    </div>
                    <div className="preview" onClick={pro_forma}>
                        <div className="title">
                            <h4><span>Pro-forma</span></h4>
                            <span className="small comment desc">
                                Primary Form Card
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default EC_Deals