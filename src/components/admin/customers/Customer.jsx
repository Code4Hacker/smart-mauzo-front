import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import SideBar from '../../widgets/sidebar/SideBar'
import TopBar from '../../widgets/topbar/TopBar'
import Card from './Card'
import axios from 'axios'
import Update from './Update'
import './style.css';
import { useParams } from 'react-router-dom'
import CustomerDeals from './CustomerDeals'

const Customer = () => {
    const jqueryCodes = () => {
        // jQuery.noConflict();
        setTimeout(() => {
            jQuery(".pre_loader ").fadeOut({
                duration: 500,
                easing: 'linear'
            });
        }, 2000);
        jQuery(".update .cancel button").on("click", () => {
            jQuery(".add_box").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("ADD CANCELED!");
                }
            })
        });
        jQuery(".add_open").on("click", () => {
            jQuery(".add_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".add_box").fadeIn({
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
    useEffect(() => {
        const getall = async () => {
            const response = await axios.get(`http://localhost/tailor_backend/onecustomer.php?id=${params.id}`);
            setContents(response.data.customer[0]);
            const deals = await axios.get(`http://localhost/tailor_backend/dealforone.php?customer=${response.data.customer[0].customerUnique}&employee=${response.data.customer[0].registeredBy}`);
            setWorks(deals.data.deals);
        }
        
        getall();
        jqueryCodes();
    }, []);
    return (
        <div>
            {/* <div className="pre_loader">
                <div className="loading">
                    <div className="loader"></div>
                </div>
            </div> */}
            <div className="dashboard_grid_container">
                <div className="dash_grid_items">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="3000">
                        <SideBar />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar location={"CUSTOMER LOG"} />
                    <div className=" container " style={{

                    }}>
                        <div className="row customer">
                            <div className="col-md-6">
                                <div className="contents">
                                    <div className="title"><h3><span style={{
                                        fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                    }}>CUSTOMER PROFILE</span></h3></div>
                                    <div className="grid2" style={{ "--template": "150px auto" }}>
                                        <div className="photo">
                                            <img src={contents !== undefined ? "http://localhost/tailor_backend"+contents.customerProfile : ""} alt="" />
                                        </div>
                                        <div className="content">
                                            <div className="container">
                                                <h4>Full Name</h4>
                                                <p>{contents !== undefined ? contents.customerFirst + " " + contents.customerLast : "Wait ..."}</p>
                                                <h4>Customer Email</h4>
                                                <p>{contents !== undefined ? contents.customerEmail : "Wait ..."}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 process">
                                <div className="contents">
                                    <div className="processor">
                                        <div className="processor2">
                                            <div className="center">
                                                <h1><span>89%</span></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-10" style={{
                                marginTop: '50px'
                            }}>
                                <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>CUSTOMER DEALS</span></h3></div>
                                <div className="deals">
                                    {
                                        works !== undefined && works?.length > -1 ? works.map((work, id) => <CustomerDeals deals={work} num={id} key={id} />):"Loading ..."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADDING
            <AddEmployee setEmployee={setContents} /> */}
            <Update setEmployee={setContents} />
            {/* <div className="addnew">
                <button className='bi bi-person-plus-fill add_open'>
                </button>
            </div> */}
        </div >
    )
}
export default Customer;