import React, { useEffect, useState } from 'react';
import './style.css';
import imagelogo from './../../../../assets/money.png';
import axios from 'axios';
import { baseURL } from '../../../../baseURL';
import { useParams } from 'react-router-dom';
import jQuery from 'jquery';
import Loading from '../../../Loader/Loading';

const Receipt = () => {
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
                    <div className="col-9 pr-f">
                        <h3>RECEIPT </h3>
                    </div>
                    <div className="col-3">
                        <div className="logoB" style={{overflow:'hidden',position:'relative',borderRadius:'10px'}}>
                            <img src={imagelogo} alt="Logo" style={{width:'100%',objectFit:'cover',position:'relative'}} />
                        </div>
                        {/* <div className="title">
                            <h3>CARENITHO</h3>
                        </div> */}
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
                            <div className="row receipt" style={{
                                marginTop: '40px'
                            }}>
                                <div className="col-6">
                                    <div className="col-12">
                                        <span style={{ fontWeight: 900 }}>CLIENT NAME: </span><span style={{ fontWeight: 900 }}> {printingdt !== undefined ? <span>{printingdt.user.customerFirst + " " + printingdt.user.customerLast} </span> : "Wait ..."}</span>
                                    </div>
                                    <div className="col-12">
                                        <span style={{ fontWeight: 900 }}>TELEPHONE: </span><span style={{ fontWeight: 900 }}> {printingdt !== undefined ? printingdt.user.customerContact : "Wait ..."}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                <div className="col-12">
                                        <span style={{ fontWeight: 900 }}>DATE: </span><span style={{ fontWeight: 900 }}> {printingdt !== undefined ? date : "Wait ..."}</span>
                                    </div>
                                    <div className="col-12" style={{ fontWeight: 900 }}>
                                        <span>NO: </span>  <span style={{ fontWeight: 900 }}>{printingdt !== undefined ? printingdt.user.customerUnique.split("/")[0] : "Wait ..."}</span>
                                    </div>
                                    
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
                                            {/* <span>{d.categories}</span> */}
                                           <span>{printingdt !== undefined ? printingdt.deal.dealDescription.split(",")[i] : "Wait ..."}</span>

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
                                    {/* <span className=''>MAIN</span> */}
                                </div>
                                <div className="col-6">
                                    {/* <span>{printingdt !== undefined ? printingdt.deal.dealDescription : "Wait ..."}</span> */}
                                </div>
                                <div className="col-2 text-center">
                                    <span>{pcounter !== undefined ? pcounter.QTY : "Wait ..."}<b> QUANTITIES</b></span>
                                </div>
                                <div className="col-3 text-center">
                                    <span><b>TOTAL PRICE: </b>{pcounter !== undefined ? Number(pcounter.ONE_TOTAL).toLocaleString() + " Tshs." : "Wait ..."}</span>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-5">
                            <span>
                                ADVANCE.............................................BALANCE..................................................
                            </span>
                            <br />
                            <div className='mt-3'>
                                <span style={{ wordWrap: 'break-word' }} >
                                    More Details ..............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................</span>
                            </div>
                            <div className="mt-4">
                                <span>
                                    Date In <span style={{ borderBottom: '1px solid black', fontStyle: 'italic', fontWeight: '900' }}>{printingdt !== undefined ? printingdt.deal.registedDate : "Wait ..."}</span> Date Out <span style={{ borderBottom: '1px solid black', fontStyle: 'italic', fontWeight: '900' }}>{printingdt !== undefined ? date : "Wait ..."}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receipt;