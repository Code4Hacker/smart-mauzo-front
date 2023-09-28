import React from 'react'
import SideBar from '../widgets/sidebar/SideBar'
import TopBar from '../widgets/topbar/TopBar'
import Aos from 'aos'
import Chart from 'react-google-charts'

const Dashboard = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const data = [
        ["Categories", "Hours per Day"],
        ["Employeed", 131],
        ["Customers", 111],
        ["Total Sales", 299],
    ];

    const options = {
        pieHole: 0.4,
        is3D: false,
    };

    return (
        <div>
            {/* <div className="pre_loader">
                <div className="loading">
                    <div className="loader"></div>
                </div>
            </div> */}
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000"
                        data-aos-delay="3000">
                        <SideBar />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar />
                    <div className="grid_template_for_two">
                        <div className="box_full_template_grid " style={{
                            "--width": "100%",
                            "--h": "250px"
                        }}
                            data-aos="fade-right" data-aos-duration="1000"
                            data-aos-delay="3000">
                            <div className="number">
                                <div className="title text-center" style={{ marginTop: "10px" }}>
                                    {/* <div className="loader"></div> */}
                                    <div className="title">
                                        <h3><span className="slim">Employeed People</span></h3>
                                    </div>


                                    <div className="row"
                                        style={{
                                            margin: "10px",
                                            justifyContent: "center"
                                        }}>

                                        <div className="col-sm-4 flex"
                                            style={{
                                                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                                                margin: "4px",
                                                padding: "8px",
                                                borderRadius: "10px"
                                            }}
                                            data-aos="fade-up" data-aos-duration="1000"
                                            data-aos-delay="3000">
                                            <div className="profile">
                                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                                                    alt="" />
                                            </div>

                                            <div className="p-10"
                                                style={{
                                                    marginTop: "10px",
                                                    paddingBottom: "-10px !important",
                                                    position: "relative"
                                                }}>
                                                <span className="" style={{
                                                    fontSize: "small",
                                                    fontWeight: 100,
                                                    textTransform: "uppercase"
                                                }}>John Doe</span>
                                                <div style={{ marginTop: " -7px" }}>
                                                    <span style={{ color: "rgb(102, 102, 102)" }}
                                                        className="gray small">Employee</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-4 flex"
                                            style={{
                                                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                                                margin: "4px",
                                                padding: "8px",
                                                borderRadius: "10px"
                                            }}
                                            data-aos="fade-up" data-aos-duration="1000"
                                            data-aos-delay="3000">
                                            <div className="profile">
                                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                                                    alt="" />
                                            </div>

                                            <div className="p-10"
                                                style={{
                                                    marginTop: "10px",
                                                    paddingBottom: "-10px !important",
                                                    position: "relative"
                                                }}>
                                                <span className="" style={{
                                                    fontSize: "small",
                                                    fontWeight: 100,
                                                    textTransform: "uppercase"
                                                }}>John Doe</span>
                                                <div style={{ marginTop: " -7px" }}>
                                                    <span style={{ color: "rgb(102, 102, 102)" }}
                                                        className="gray small">Employee</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-4 flex"
                                            style={{
                                                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                                                margin: "4px",
                                                padding: "8px",
                                                borderRadius: "10px"
                                            }}
                                            data-aos="fade-up" data-aos-duration="1000"
                                            data-aos-delay="3000">
                                            <div className="profile">
                                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                                                    alt="" />
                                            </div>

                                            <div className="p-10"
                                                style={{
                                                    marginTop: "10px",
                                                    paddingBottom: "-10px !important",
                                                    position: "relative"
                                                }}>
                                                <span className="" style={{
                                                    fontSize: "small",
                                                    fontWeight: 100,
                                                    textTransform: "uppercase"
                                                }}>John Doe</span>
                                                <div style={{ marginTop: " -7px" }}>
                                                    <span style={{ color: "rgb(102, 102, 102)" }}
                                                        className="gray small">Employee</span>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                    <div className="more text-center"
                                        style={{
                                            margin: "10px",
                                            marginTop: "-10px"
                                        }}
                                        data-aos="fade-right" data-aos-duration="1000"
                                        data-aos-delay="3000">
                                        <a href="allEmployee.jsp" className="small" style={{ color: "var(--orange)" }}>View
                                            All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box_full_template_grid " style={{ "--width": "100%", "--h": "270px", position: 'relative' }}
                            id="donutchart" data-aos="fade-left" data-aos-duration="1000"
                            data-aos-delay="3000">
                            <div className="title"><h3><span style={{
                                fontWeight:100,marginTop:'20px !important',padding:'20px',background:'var(--milk)',color:'var(--black)',position:'relative',minHeight:'30px',marginLeft:'-50px',borderBottomLeftRadius:'30px',borderBottomRightRadius:'30px'
                            }}>SUMMARY</span></h3></div>
                            {data ?
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="250px"
                                    data={data}
                                    options={options}
                                    className='chart'
                                /> : <div className="loader"></div>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;


