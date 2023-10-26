import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import Card from './Card3'
import axios from 'axios'
import Update from './Update'
import { baseURL } from '../../../baseURL'
import TopBar2 from '../../widgets/topbar/TopBar2'
import SideBar2 from '../../widgets/sidebar/SideBar2'
import AddCustomers from './AddCustomer'
import Mini2 from '../../widgets/sidebar/Mini2'
import Loading from '../../Loader/Loading'
import AddWorker from './AddWorker'

const Stuffs = () => {
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
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar2 />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar2 location={"CUSTOMERS"} />
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
            
            <AddWorker setContents={setContents} />
            <div className="addnew">
                <button className='bi bi-person-plus-fill add_open'>
                </button>
            </div>
        </div >
    )
}
export default Stuffs;

