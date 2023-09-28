import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import SideBar from '../../widgets/sidebar/SideBar'
import TopBar from '../../widgets/topbar/TopBar'
import Card from './Card'
import './style.css'
import AddEmployee from './AddEmployee'
import axios from 'axios'

const Employees = () => {
    
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

            jQuery(".selling .cancel button").on("click", () => {
                jQuery(".selling_box").fadeOut({
                    duration: 500,
                    easing: 'linear',
                    done: function () {
                        console.log("UPDATE CANCELED!");
                    }
                })
            });
            jQuery(".selling_open").on("click", () => {
                jQuery(".selling_box").addClass("animate__animated animate_fadeInUp");
                jQuery(".selling_box").fadeIn({
                    duration: 500,
                    easing: 'linear',
                    done: function () {
                        console.log("SELL CANCELED!");
                    }
                });
            });
    }
    const [contents, setContents] = useState();
    useEffect(() => {
        const getall = async() => {
            const response = await axios.get("http://localhost/tailor_backend/employee.php");
            const employee = response.data;
            // contents = employee.employees !== undefined? employee.employees.map((people,i) => <Card key={i}/>):"loading";
            setContents(response.data.employees);
        }
        getall();
        jqueryCodes();
    },[]);
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
                    <TopBar />
                    <div className=" container " style={{


                    }}>
                        <div className="common-grid " style={{ "--grid-template": "auto auto auto auto auto auto auto", boxShadow: "10px 0px 10px 0px rgba(0, 0, 0, 0.1)",borderBottomLeftRadius:0,borderBottomRightRadius:0 }}
                            data-aos="fade-right" data-aos-duration="1000" data-aos-delay="3000">
                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title ">
                                    <h5><span>First Name</span></h5>
                                </div>
                            </div>
                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title " style={{textAlign:'start'}}>
                                    <h5><span>Last Name</span></h5>
                                </div>
                            </div>
                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title " style={{textAlign:'start'}}>
                                    <h5><span>Email/Username</span></h5>
                                </div>
                            </div>
                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title " style={{textAlign:'start'}}>
                                    <h5><span>Telephone</span></h5>
                                </div>
                            </div>
                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title " style={{textAlign:'start'}}>
                                    <h5><span>Role</span></h5>
                                </div>
                            </div>

                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title ">
                                    <h5><span>Date Added</span></h5>
                                </div>
                            </div>
                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title ">
                                    <h5><span>Actions</span></h5>
                                </div>
                            </div>
                        </div>
                        {/* Employees */}
                        <div className="card_holder" style={{
                            boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px" }}
                            data-aos="fade-right" data-aos-duration="1000" data-aos-delay="3000">
                            {contents !== undefined? contents.map((people, i) => <Card key={i} employee={people} />):'ue'}
                        </div>
                    </div>
                </div>
            </div>
            {/* ADDING */}
            <AddEmployee />
            <div className="addnew">
                <button className='bi bi-person-plus-fill add_open'>
                </button>
            </div>
        </div >
    )
}

export default Employees;