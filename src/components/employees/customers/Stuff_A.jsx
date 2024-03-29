import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import Card from './Card4'
import axios from 'axios'
import Update from './Update'
import { baseURL } from '../../../baseURL'
import AddCustomers from './AddCustomer'
import Loading from '../../Loader/Loading'
import Mini from '../../widgets/sidebar/Mini'
import SideBar from '../../widgets/sidebar/SideBar'
import TopBar from '../../widgets/topbar/TopBar'

const Stuff_A = () => {
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
                }
            })
        });
        jQuery(".add_open").on("click", () => {
            jQuery(".add_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".add_box").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            });
        });

        jQuery(".rename .cancel button").on("click", () => {
            jQuery(".rename_box").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            })
        });
        jQuery(".updateMe").on("click", () => {
            jQuery(".rename_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".rename_box").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            });
        });
    }
    const [contents, setContents] = useState();
    useEffect(() => {
        const getall = async () => {
            const response = await axios.get(`${baseURL}worker.php`);
            setContents(response.data.workers);
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
            <Mini />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar location={"ADMIN"} />
                    <div className=" container " style={{


                    }}>
                        {/* Employees */}
                        <div className="card_holder2" style={{
                            boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"
                        }}
                            data-aos="fade-right" data-aos-duration="1000" >
                            <div className="common-grid-2 for_worker" style={{ "--grid-template": "auto 100px", boxShadow: "10px 0px 10px 0px rgba(0, 0, 0, 0.1)", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                                data-aos="fade-right" data-aos-duration="1000" >
                                <div className="grid-item "
                                    style={{ backgroundColor: "var(--sh-2)", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <div className="title " style={{textAlign:'start'}}>
                                        <h5><span>Full Name</span></h5>
                                    </div>
                                </div>
                                <div className="grid-item "
                                    style={{ backgroundColor: "var(--sh-2)", paddingLeft: "10px", paddingRight: "10px" }}>
                                    <div className="title ">
                                        <h5><span>Actions</span></h5>
                                    </div>
                                </div>
                            </div>
                            {contents !== undefined ? contents.map((people, i) => <Card key={i} workers={people} setworkers={setContents} />) : <Loading/>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Stuff_A;