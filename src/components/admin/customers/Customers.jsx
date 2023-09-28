import React from 'react'
import Card from './Card'
import SideBar from '../../widgets/sidebar/SideBar'
import TopBar from '../../widgets/topbar/TopBar'

const Customers = () => {
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
                                    <h5><span>Customer Id</span></h5>
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
                                    <h5><span>Deal</span></h5>
                                </div>
                            </div>

                            <div className="grid-item "
                                style={{ backgroundColor: "var(--shadow)", paddingLeft: "10px", paddingRight: "10px" }}>
                                <div className="title ">
                                    <h5><span>Date Issued</span></h5>
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
                            boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"
                        }}
                            data-aos="fade-right" data-aos-duration="1000" data-aos-delay="3000">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Customers;