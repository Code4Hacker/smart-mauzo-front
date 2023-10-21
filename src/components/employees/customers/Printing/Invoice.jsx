import React, { useEffect, useState } from 'react';
import './style.css';
// import imagelogo from './../../../../assets/20231009_145646.jpg';
import axios from 'axios';
import { baseURL } from '../../../../baseURL';
import { useParams } from 'react-router-dom';
import jQuery from 'jquery';
import Loading from '../../../Loader/Loading';

const Invoice = () => {
    const date = (new Date()).toDateString();
    const [printingdt, setPrintingdt] = useState();
    const [pcounter, setPcounter] = useState();
    const params = useParams();
    const getdata = async () => {
        const responses = await axios.post(`${baseURL}recentone.php?dealnum=${params.id}`);
        let fdt = new FormData();
        fdt.append("id", params.id);
        let bodydat = fdt;
        const deal = await axios.request({
            method: 'POST',
            url: `${baseURL}dealtotal.php`,
            data: bodydat
        });

        // if (deal.data.status === "200") {
        setPcounter(deal.data);
        // console.log(deal);
        // }
        setPrintingdt(responses.data);

    }
    useEffect(() => {
        getdata();
        jQuery(".log_see").fadeIn({ duration: 100 });
        setTimeout(() => {
            jQuery(".log_see").fadeOut({ duration: 100 });
            setTimeout(() => {
                window.print();
            }, 2000);
        }, 6000);
    }, []);
    return (
        <div className='form_printing'>
            <div className="log_see" style={{ display: 'none' }}><span>Please Wait ...</span></div>
            <div className="container">
                <div className="row">
                    <div className="col-10 pr-f">
                        <h3>INVOICE </h3>
                    </div>
                    <div className="col-2">
                        {/* <div className="logoB" style={{overflow:'hidden',position:'relative',borderRadius:'10px'}}>
                            <img src={imagelogo} alt="Logo" style={{width:'100%',objectFit:'cover',position:'relative'}} />
                        </div> */}
                        <div className="title">
                            <h3>CARENITHO</h3>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row pr-f">
                            <div className="col-3">

                                <span><i className="bi bi-telephone-fill"></i> +255 717 998 545</span><br />
                                <span><i className="bi bi-telephone-fill"></i> +255 766 596 763</span>
                            </div>
                            <div className="col-3">

                                <span><i className="bi bi-google"></i> carenibrahim@gmail.com</span><br />
                                <span><i className="bi bi-google"></i> carenithocadia@gmail.com</span>
                            </div>
                            <div className="col-3">

                                <span><i className="bi bi-envelope-fill"></i> P.O.Bo 2764, Dodoma</span><br />
                                <span><i className="bi bi-house-fill"></i> Makole National Housing</span>
                            </div>
                            <div className="col-3">
                                TIN NO: 142186608
                            </div>

                        </div>
                        <div className="container">
                            <div className="row" style={{
                                marginTop: '40px'
                            }}>
                                <div className="col-12">
                                    <span>No: </span><span> {printingdt !== undefined ? printingdt.user.customerUnique.split("/")[0] : "Wait ..."}</span>
                                </div>
                                <div className="col-12">
                                    <span>Date: </span><span> {printingdt !== undefined ? date : "Wait ..."}</span>
                                </div>
                                <div className="col-12">
                                    <span>Client: </span><span> {printingdt !== undefined ? <span>{printingdt.user.customerFirst + " " + printingdt.user.customerLast} </span> : "Wait ..."}</span>
                                </div>
                                <div className="col-12">
                                    <span>Address: </span>  <span style={{ fontWeight: 300 }}>{printingdt !== undefined ? printingdt.user.customerAddress : "Wait ..."}</span>
                                </div>

                            </div>
                        </div>
                        <div className="container">
                            <div className="row tb" style={{
                                marginTop: '20px'
                            }}>
                                <div className="col-1 bg-black text-center">
                                    <span className='white'>S/N</span>
                                </div>
                                <div className="col-6 text-center">
                                    <span>Item Description</span>
                                </div>
                                <div className="col-1 text-center">
                                    <span>Qty</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>Unit Price</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>Amount</span>
                                </div>


                                {/* <div className="col-1 text-center">
                                    <span className=''>1</span>
                                </div>
                                <div className="col-6">
                                    <span>{printingdt !== undefined ? printingdt.deal.dealDescription : "Wait ..."}</span>
                                </div>
                                <div className="col-1 text-center">
                                    <span>{printingdt !== undefined ? printingdt.deal.quantity : "Wait ..."}</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>{pcounter !== undefined ? pcounter.deal.price + " Tshs." : "Wait ..."}</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>{pcounter !== undefined ? pcounter.deal.price * pcounter.deal.quantity + " Tshs." : "Wait ..."}</span>
                                </div> */}

                            </div>
                            {pcounter !== undefined && pcounter.deal?.length > 0 ?
                                pcounter.deal.map((d, i) =>
                                    <div className='row tb' key={i}>
                                        <div className="col-1 bg-black text-center">
                                            <span className='white'>{i + 1}</span>
                                        </div>
                                        <div className="col-6">
                                            <span>{d.categories}</span>
                                        </div>
                                        <div className="col-1 text-center">
                                            <span>{d.quantity}</span>
                                        </div>
                                        <div className="col-2 text-center">
                                            <span>{Number(d.price).toLocaleString()}</span>
                                        </div>
                                        <div className="col-2 text-center">
                                            <span>{Number(d.price * d.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ) : <Loading />}
                            <div className="row tb">
                                <div className="col-1 text-center">
                                    <span className=''>MAIN</span>
                                </div>
                                <div className="col-6">
                                    <span>{printingdt !== undefined ? printingdt.deal.dealDescription : "Wait ..."}</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>{pcounter !== undefined ? pcounter.QTY : "Wait ..."}<b> QUANTITIES</b></span>
                                </div>
                                <div className="col-3 text-center">
                                    <span><b>TOTAL PRICE: </b>{pcounter !== undefined ? pcounter.ONE_TOTAL + " Tshs." : "Wait ..."}</span>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row" style={{
                                marginTop: '40px'
                            }}>
                                <div className="col-6">
                                    <span>NMB BANK</span><br />
                                    <span>Ac NAME: CARENITHO CADIA CO. LTD</span><br />
                                    <span>Ac NO: 51710032937</span><br />
                                </div>
                                <div className="col-6">
                                    <span>TOTAL AMOUNT  <span style={{ fontWeight: 900 }}>{pcounter !== undefined ? pcounter.ONE_TOTAL + " Tshs." : "Wait ..."}</span></span><br />
                                    {/* <span>VAT AMOUNT   <span style={{ fontWeight: 900 }}>{2.1}</span> </span><br />
                                    <span>GRAND TOTAL AMOUNT   <span style={{ fontWeight: 900 }}>{printingdt !== undefined ? printingdt.deal.price * printingdt.deal.quantity * 2.1 + " Tshs." : "Wait ..."}</span></span><br /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice;