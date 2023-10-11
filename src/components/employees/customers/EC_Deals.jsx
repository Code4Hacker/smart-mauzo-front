import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../baseURL';
import { Link, useParams } from 'react-router-dom';
import raws from './../raws.json';
import jQuery from 'jquery';

const EC_Deals = ({ deals, num, setWorks, setOnecount, setContents, setCount }) => {
    const params = useParams();
    const [payed, setPayed] = useState();
    const [trackin, setTrackin] = useState();
    const { dealID, dealTitle, dealDescription, dealSummary, dealPicture, registeredBy, CustomerUnique, customerId, price, registedDate, dealRequirements, measurements, dealStatus, tracking } = deals;
    const handledel = async () => {
        const del = await axios.delete(`${baseURL}deals.php`, { data: JSON.stringify({ "id": dealID }) });
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
    const handleStatus = () => {
        if (payed === "PENDING") {
            setPayed("PAYED");
        } else {
            setPayed("PENDING");
        }
    }
    const query = () => {
        jQuery(".options .bi-x").on("click", function(){
            jQuery(".options").fadeOut({duration:500});
        });
        jQuery(".print-opt").on("click", function(){
            jQuery(".options").fadeIn({duration:1000});
        });
    }
    useEffect(() => { 
        setPayed(dealStatus);
        
        query();
     }, []);
    return (
        <div className="row deal">
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
                                    <select name="" id="" onChange={(evt) => setTrackin(evt.target.value)}>
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


                                <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 5px", borderRadius: " 10px" }} ></i>
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
            <div className="options">
                <div className="dialog">
                    <i className="bi bi-x"></i>
                    <h3 className='text-center '>What need to Print ?</h3>
                    <div className="preview">
                        <div className="title">
                            <h4><span>Invoice</span></h4>
                            <span className="small comment desc">
                                Invoice Card
                            </span>
                        </div>
                    </div>
                    <div className="preview">
                        <div className="title">
                            <h4><span>Receipt</span></h4>
                            <span className="small comment desc">
                                Receipt Card
                            </span>
                        </div>
                    </div>
                    <div className="preview">
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