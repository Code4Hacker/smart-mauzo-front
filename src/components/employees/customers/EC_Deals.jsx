import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../baseURL';
import { Link, useNavigate, useParams } from 'react-router-dom';
import raws from './../raws.json';
import jQuery from 'jquery';
import Loading from '../../Loader/Loading';

const EC_Deals = ({deals, num, setWorks, setOnecount, setContents, setCount }) => {
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
            for (let index = 0; index < deals.data.deals.length; index++) {
                if (index < deals.data.deals.length - 1) {
                    setOnecount(Number(deals.data.deals[index].price) + Number(deals.data.deals[index + 1].price));
                } else if (deals.data.deals.length === 1) {
                    setOnecount(Number(deals.data.deals[index].price));
                }

            }
            setCount(deals.data.counter);
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

    const all = () => deal_picks();
    const menj = () => deal_pick('MEN JACKET');
    const ment = () => deal_pick('MEN TROUSER');
    const wej = () => deal_pick('WOMEN JACKET');
    const wet = () => deal_pick('WOMEN TROUSER');
    const wed = () => deal_pick('WOMEN DRESS');
    const shoes = () => deal_pick('SHOES');

    return (
        <div className="row deal" onClick={() => window.localStorage.setItem("dealC", dealID)}>
            <div className="noted">
                <div className="note">

                </div>
                <div className="note_tip">
                    <div className="row deal">
                        <div className="col-2 card_black">
                            <div className="center">
                                <h1>{num + 1}</h1>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="flex tracking">
                                <div className="">
                                    <h4>{dealTitle}</h4>
                                </div>
                                <div className="">
                                    <select name="" id="" value={trackin} onChange={handleTracking}>
                                        <option value={raws.deal_track.FIRST_CHOICE}>{raws.deal_track.FIRST_CHOICE}</option>
                                        <option value={raws.deal_track.SECOND_CHOICE}>{raws.deal_track.SECOND_CHOICE}</option>
                                        <option value={raws.deal_track.THIRD_CHOICE}>{raws.deal_track.THIRD_CHOICE}</option>
                                        <option value={raws.deal_track.FORTH_CHOICE}>{raws.deal_track.FORTH_CHOICE}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>{dealDescription}</p>
                                <div className="noted">
                                    <div className="note"></div>
                                    <div className="req">

                                        <span className="small desc comment">{dealRequirements.split('\n')?.length > 0 ? dealRequirements.split('\n').map((note, i) => <li key={i}>{note}</li>) : "Wait is Splitting ..."}</span>
                                    </div>
                                </div>
                                {/* <p style={{ color: 'var(--green)', marginTop: '10px' }} className="flex"> */}
                                {/* <span className="flex" style={{ marginRight: '10px' }}> */}
                                {/* <input type="checkbox" style={{ background: 'red', width: '14px' }} onClick={handleStatus} /> */}
                                {/* </span> {Number(price*quantity).toLocaleString()} Tshs. <i style={{color:'red !important', fontSize:'x-small', fontWeight:900,padding:'3px'}}className='small'>({quantity}) </i>  <span className="comment gray">[{payed === "PENDING" ? payed + "..." : payed}]</span></p> */}
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="title" style={{ display: "grid" }}>


                                {/* <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} ></i> */}
                                <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} onClick={handledel} ></i>

                                <i className="bi bi-printer-fill print-opt" style={{ color: "var(--black)", textDecoration: 'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer' }}></i>
                            </div>
                        </div>
                        <div className='for_single'>
                        <div className={`filte f-${dealID} flex`}>
                                    <span>Filter By </span>
                                    <div className="filters flex">
                                        <div className="" onClick={all}>{raws.filters.ALL}</div>
                                        <div className="" onClick={menj}>{raws.filters.MEN_JACKET}</div>
                                        <div className="" onClick={ment}>{raws.filters.MEN_TROUSER}</div>
                                        <div className="" onClick={wej}>{raws.filters.WOMEN_JACKET}</div>
                                        <div className="" onClick={wet}>{raws.filters.WOMEN_TROUSER}</div>
                                        <div className="" onClick={wed}>{raws.filters.WOMEN_DRESS}</div>
                                        <div className="" onClick={shoes}>{raws.filters.SHOES}</div>
                                    </div>
                                </div>
                            <div className="mrs relative">
                                
                                {
                                    splitted_deal !== undefined ? splitted_deal.map((d, i) =>
                                        <div className="sna_container" key={i}>
                                            <div className="text-center" >
                                                <div className="titl">
                                                    {/* {console.log(d, "DDDD")} */}
                                                    <h4><span>{d.categories}</span></h4>
                                                    <p style={{ color: 'var(--green)', marginTop: '10px' }} className="flex">
                                                        <span className="flex" style={{ marginRight: '10px' }}>
                                                        </span> {Number(d.price * d.quantity).toLocaleString()} Tshs. <i style={{ color: 'red !important', fontSize: 'x-small', fontWeight: 900, padding: '3px' }} className='small'>({d.quantity} per {d.price}/=) </i>  </p>
                                                    <div className="measures">

                                                        {
                                                            d.measurements.split(",")?.length > 0 ? d.measurements.split(",").map((m, i) => <div className='measure' key={i}>{m}</div>) : <Loading />
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <Loading />
                                }

                            </div>
                        </div>
                        <p style={{ color: 'var(--green)', marginTop: '10px' }} className="flex">
                            <span className="flex" style={{ marginRight: '10px' }}>
                                <input type="checkbox" style={{ background: 'red', width: '14px' }} onClick={handleStatus} />
                            </span> <span className="comment gray">TOTAL: {count3} Tshs. | STATUS: [{payed === "PENDING" ? payed + "..." : payed}]</span></p>
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