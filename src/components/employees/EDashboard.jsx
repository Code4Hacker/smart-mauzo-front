import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import Chart from 'react-google-charts'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { baseURL } from '../../baseURL'
import './../../primary/style2.css'
import SideBar2 from '../widgets/sidebar/SideBar2'
import TopBar2 from '../widgets/topbar/TopBar2'
import Mini2 from '../widgets/sidebar/Mini2'
import Loading from '../Loader/Loading'

const EDashboard = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const data = [
        ["Categories", "Hours per Day"],
        ["All Customers", 131],
        ["Your Customers", 111],
        ["Total Sales", 299],
    ];

    const options = {
        pieHole: 0.4,
        is3D: false,
    };
    const [contents, setContents] = useState();
    useEffect(() => {
        const getall = async() => {
            const response = await axios.get(`${baseURL}employeeid.php?id=${localStorage.emMail != undefined ? localStorage.emMail :0}`);
            setContents(response.data.customers.splice(0,3));
        }
        getall();
    },[]);
    return (
        <div>
            <Loader/>
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000"
                        >
                        <SideBar2 />
                        
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar2 location={"DASHBOARD"} />
                    <div className="grid_template_for_two customer">
                        <div className="box_full_template_grid" style={{
                            "--width": "100%",
                            "--h": "250px"
                        }}
                            data-aos="fade-right" data-aos-duration="1000"
                            >
                            <div className="number">
                                <div className="title text-center" style={{ marginTop: "10px" }}>
                                    {/* <div className="loader"></div> */}
                                    <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>YOUR CUSTOMERS</span></h3></div>


                                    <div className="row"
                                        style={{
                                            margin: "10px", marginTop:'25px',
                                            justifyContent: "center"
                                        }}>

                                        {contents !== undefined && contents?.length > -1 ? contents.map((employee, i) => <div className="col-sm-4 flex"
                                            style={{
                                                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                                                margin: "4px",
                                                padding: "8px",
                                                minWidth:"200px",
                                                borderRadius: "10px"
                                            }}
                                             key={i}>
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
                                                <Link to={`/one_customer/${employee.customerID}`} className="" style={{
                                                    fontSize: "small",
                                                    fontWeight: 100,
                                                    textTransform: "uppercase"
                                                }}>{ employee.customerLast}</Link>
                                                <div style={{ marginTop: " -7px" }}>
                                                    <span style={{ color: "rgb(102, 102, 102)" }}
                                                        className="gray small">{(employee.customerEmail).substring(0,12)}...</span>
                                                </div>
                                            </div>
                                        </div>):<Loading/>}

                                        

                                    </div>
                                    <div className="more text-center"
                                        style={{
                                            margin: "10px",
                                            marginTop: "-10px"
                                        }}>
                                        <Link to={"/userEmp"} className="small" style={{ color: "var(--orange)" }}>View
                                            All</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EDashboard;


