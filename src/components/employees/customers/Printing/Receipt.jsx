import React, { useEffect, useState } from 'react';
import './style.css';
import imagelogo from './../../../../assets/20231009_145646.jpg';
import axios from 'axios';
import { baseURL } from '../../../../baseURL';
import { useParams } from 'react-router-dom';
import jQuery from 'jquery';

const Receipt = () => {
    // window.print()
    const date = (new Date()).toDateString();
    const [printingdt, setPrintingdt] = useState();
    const params = useParams();
    const getdata = async () => {
        const responses = await axios.get(`${baseURL}recentone.php?dealnum=${params.id}`);
        setPrintingdt(responses.data);

    }
    useEffect(() => {
        getdata();
        jQuery(".log_see").fadeIn({ duration: 100 });
        setTimeout(() => {
            jQuery(".log_see").fadeOut({ duration: 100 });
            setTimeout(() => {
                // window.print();
            }, 2000);
        }, 6000);
    }, []);
    return (
        <div className='form_printing'>
            <div className="log_see" style={{ display: 'none' }}><span>Please Wait ...</span></div>
            <div className="container">
                <div className="row">
                    <div className="col-10 pr-f">
                        <h3>RECEIPT </h3>
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
                            <div className="row receipt" style={{
                                marginTop: '40px'
                            }}>
                                <div className="col-6">
                                    <div className="col-12">
                                        <span style={{ fontWeight: 900 }}>Client: </span><span style={{ fontWeight: 900 }}> {printingdt !== undefined ? <span>{printingdt.user.customerFirst + " " + printingdt.user.customerLast} <i style={{ fontSize: '11px', fontWeight: 100 }}>[{printingdt.user.customerEmail}]</i></span> : "Wait ..."}</span>
                                    </div>
                                    <div className="col-12">
                                        <span style={{ fontWeight: 900 }}>Date: </span><span style={{ fontWeight: 900 }}> {printingdt !== undefined ? date : "Wait ..."}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="col-12" style={{ fontWeight: 900 }}>
                                        <span>Address: </span>  <span style={{ fontWeight: 900 }}>{printingdt !== undefined ? printingdt.user.customerAddress : "Wait ..."}</span>
                                    </div>
                                    <div className="col-12">
                                        <span style={{ fontWeight: 900 }}>No: </span><span style={{ fontWeight: 900 }}> {printingdt !== undefined ? printingdt.user.customerContact : "Wait ..."}</span>
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

                                <div className="col-1 text-center">
                                    <span className=''>1</span>
                                </div>
                                <div className="col-6">
                                    <span>{printingdt !== undefined ? printingdt.deal.dealDescription : "Wait ..."}</span>
                                </div>
                                <div className="col-1 text-center">
                                    <span>{printingdt !== undefined ? printingdt.deal.quantity : "Wait ..."}</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>{printingdt !== undefined ? printingdt.deal.price + " Tshs." : "Wait ..."}</span>
                                </div>
                                <div className="col-2 text-center">
                                    <span>{printingdt !== undefined ? printingdt.deal.price * printingdt.deal.quantity + " Tshs." : "Wait ..."}</span>
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
                                    Date In..........................................................................................Date Out...............................................................................................
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