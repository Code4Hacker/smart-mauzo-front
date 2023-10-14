import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../../../baseURL';
import raws from "../../employees/raws.json"
import jQuery from 'jquery';

const AllDeal = ({ deals, num, setDeals, setCount }) => {
    const { dealID, dealTitle, dealDescription, dealSummary, dealPicture, registeredBy, CustomerUnique, customerId, price, registedDate, dealRequirements, measurements, dealStatus, tracking } = deals;
    const [trackin, setTrackin] = useState(tracking);
    const params = useParams();
    const navigate = useNavigate();
    const [payed, setPayed] = useState();
    const handledel = async () => {
        const del = await axios.get(`${baseURL}dealdel.php?id=${dealID}`);
        // const status = del.data;
        const getall = async () => {
            const deals = await axios.get(`${baseURL}deals.php`);
            // setContents(response.data.deals);
            setDeals(deals.data.deals);
            setCount(deals.data.counter);
        }

        getall();
    }
    const handleStatus = async () => {
        let formDATA = new FormData();
        formDATA.append("dealnum", dealID);
        if (payed === "PENDING") {
            setPayed("PAYED");
            formDATA.append("status", "PAYED");
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
    }
    useEffect(() => {
        setPayed(dealStatus);

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
                                        <option value={raws.deal_track.ON_PROGRESS_DEAL}>{raws.deal_track.ON_PROGRESS_DEAL}</option>
                                        <option value={raws.deal_track.TRANSPORTED}>{raws.deal_track.TRANSPORTED}</option>
                                        <option value={raws.deal_track.DELIVERED}>{raws.deal_track.DELIVERED}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>{dealDescription}</p>
                                <div className="noted">
                                    <div className="note"></div>
                                    <div className="req">

                                        <span className="small desc comment">{dealRequirements}</span>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--green)', marginTop: '10px' }} className="flex">
                                    <span className="flex" style={{ marginRight: '10px' }}>
                                        <input type="checkbox" style={{ background: 'red', width: '14px' }} onClick={handleStatus} />
                                    </span><i className="bi bi-coin"></i> {price} Tshs. <span className="comment gray">[{payed === "PENDING" ? payed + "..." : payed}]</span></p>
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="title" style={{ display: "grid" }}>


                                {/* <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} ></i> */}
                                <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} onClick={handledel} ></i>

                                <i className="bi bi-printer-fill print-opt" style={{ color: "var(--black)", textDecoration: 'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer' }}></i>
                            </div>
                        </div>
                        <div className="col-xl-11 mrs">
                            <div className="text-center">
                                <div className="titl">
                                    <h4><span>Measurements</span></h4>
                                    <div className="measures">
                                        {
                                            measurements.split(",")?.length > 0 ? measurements.split(",").map((m, i) => <div className='measure' key={i}>{m}</div>) : "Loading ..."
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AllDeal