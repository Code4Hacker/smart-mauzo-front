import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import axios from 'axios'
import './style.css';
import { useParams } from 'react-router-dom'
import { baseURL, baseURL2 } from '../../../baseURL'
import SideBar2 from '../../widgets/sidebar/SideBar2';
import TopBar2 from '../../widgets/topbar/TopBar2';
import EC_Deals from './EC_Deals';
import NewDeal from './NewDeal';
import Mini2 from '../../widgets/sidebar/Mini2';
import Loading from '../../Loader/Loading';

const OneCustomer = () => {
    const jqueryCodes = () => {
        // jQuery.noConflict();
        setTimeout(() => {
            jQuery(".pre_loader ").fadeOut({
                duration: 500,
                easing: 'linear'
            });
        }, 2000);
        jQuery(".add_deal .update .cancel button").on("click", () => {
            jQuery(".add_box.add_deal").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("ADD CANCELED!");
                }
            })
        });
        jQuery(".add_open.dealnew").on("click", () => {
            jQuery(".add_box.add_deal").addClass("animate__animated animate_fadeInUp");
            jQuery(".add_box.add_deal").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("ADD CANCELED!");
                }
            });
        });

        jQuery(".rename .cancel button").on("click", () => {
            jQuery(".rename_box").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("UPDATE CANCELED!");
                }
            })
        });
        jQuery(".updateMe").on("click", () => {
            jQuery(".rename_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".rename_box").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("SELL CANCELED!");
                }
            });
        });
    }
    const params = useParams();
    const [contents, setContents] = useState();
    const [works, setWorks] = useState();
    const [count, setCount] = useState();
    const [onecount, setOnecount] = useState();
    useEffect(() => {
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
        jqueryCodes();
    }, []);
    const printing = () => {
        jQuery(".prt_on").hide();
        jQuery(".prt_on").css({
            "display": "none"
        });
        jQuery(".pdeal").css({
            "position": "absolute",
            "width": "90%",
            "left": "50%",
            "transform": "translateX(-50%)"
        });
        window.print();
        window.onafterprint = function(){
            jQuery(".prt_on").show();
            jQuery(".prt_on").css({
                "display": "block !important"
            });
            jQuery(".pdeal").css({
                "position": "auto",
                "width": "auto",
                "left": "auto",
                "transform": "none"
            });
        }
    }
    return (
        <div>
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar prt_on">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar2 />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar2 location={"CUSTOMER INFO"} />
                    <div className=" container " style={{

                    }}>
                        <div className="row customer">
                            <div className="col-md-6 prt_on">
                                <div className="contents">
                                    <div className="title"><h3><span style={{
                                        fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                    }}>CUSTOMER PROFILE</span></h3></div>
                                    <div className="grid2 prt_on" style={{ "--template": "150px auto" }}>
                                        <div className="photo">
                                            <img src={contents !== undefined ? baseURL2 + contents.customerProfile : ""} alt="" />
                                        </div>
                                        <div className="content">
                                            <div className="container">
                                                <h4>Full Name</h4>
                                                <p>{contents !== undefined ? contents.customerFirst + " " + contents.customerLast : "Wait ..."}</p>
                                                <h4>Customer Email</h4>
                                                <p>{contents !== undefined ? contents.customerEmail : "Wait ..."}</p>
                                                <h4>Unique ID</h4>
                                                <p>{contents !== undefined ? contents.customerUnique : "Wait ..."}</p>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="grid_mini">
                                        <div className="">
                                            <h5>Contact</h5>
                                            <p>{contents !== undefined ? contents.customerContact : "Wait ..."}</p>
                                        </div>
                                        <div className="">
                                            <h5>Address</h5>
                                            <p>{contents !== undefined ? contents.customerAddress : "Wait ..."}</p>
                                        </div>
                                        {/* <div className="">
                                            <h5>Registered By</h5>
                                            <p>{contents !== undefined ? contents.customerUnique : "Wait ..."}</p>
                                        </div> */}
                                        <div className="">
                                            <h5>Total Price</h5>
                                            {
                                                onecount !== 0 ? <p>{onecount} <span className="small">Tsh</span></p>:"Cash is Empty"
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 process prt_on">
                                <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>ACTIVITIES</span></h3></div>
                                <div className="contents">
                                    <div className="processor">
                                        <div className="processor2">
                                            <div className="center">
                                                <h1><span>{count}</span></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-10 pdeal" style={{
                                marginTop: '50px', position: 'relative'
                            }}>
                                <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>CUSTOMER DEALS</span></h3></div>
                                <button className="print_deal bi bi-printer-fill prt_on" onClick={printing}> Print</button>
                                <div className="deals" style={{
                                    marginTop: '40px', position: 'relative'
                                }}>
                                    {
                                        works !== undefined && works?.length > -1 ? works.map((work, id) => <EC_Deals  setContents={setContents} setOnecount={setOnecount} setWorks={setWorks} deals={work} num={id}  setCount={setCount} key={id} />) : <Loading/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADDING
            <AddEmployee setEmployee={setContents} /> */}
            <NewDeal setContents={setContents} setOnecount={setOnecount} setWorks={setWorks} setCount={setCount} unique={contents !== undefined ? contents.customerUnique : "Wait ..."} />
            <div className="addnew prt_on">
                <button className='bi bi-plus add_open dealnew'>
                    <span>New Deal</span>
                </button>
            </div>
        </div >
    )
}
export default OneCustomer;