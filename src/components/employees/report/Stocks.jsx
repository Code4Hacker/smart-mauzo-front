import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import Chart from 'react-google-charts'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import { baseURL } from '../../../baseURL'
import Mini from '../../widgets/sidebar/Mini'
import SideBar2 from '../../widgets/sidebar/SideBar2'
import moneybg from '../../../assets/money.jpg';

const Stocks = () => {
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
        const getall = async () => {
            const response = await axios.get(`${baseURL}employee.php`);
            setContents(response.data.employees.splice(0, 3));
        }
        getall();
    }, []);
    return (
        <div>
            <Loader />
            <Mini />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000"
                        data-aos-delay="3000">
                        <SideBar2 />

                    </div>
                </div>
                <div className="dash_grid_items">
                    <div className="top_banner" style={{
                        backgroundImage: `url(${moneybg})`
                    }}>
                        <div className="shadows"></div>
                    </div>
                    {/* <TopBar2 location={"DASHBOARD"} /> */}
                    <div className="grid_template showcas">
                        <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="fade-up" data-aos-duration="1000"
                            data-aos-delay="3000">
                            <div className="title text-center mt-2">
                                <h5><span>Your Customers</span></h5>
                            </div>
                            <div className="number">
                                <div className="title text-center mt-2">
                                    <h1><span>
                                        {"0"}
                                    </span></h1>
                                </div>
                            </div>
                        </div>
                        <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="fade-up" data-aos-duration="1000"
                            data-aos-delay="3000">
                            <div className="title text-center mt-2">
                                <h5><span>Your Customers</span></h5>
                            </div>
                            <div className="number">
                                <div className="title text-center mt-2">
                                    <h1><span>
                                        {"0"}
                                    </span></h1>
                                </div>
                            </div>
                        </div>
                        <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="fade-up" data-aos-duration="1000"
                            data-aos-delay="3000">
                            <div className="title text-center mt-2">
                                <h5><span>Your Customers</span></h5>
                            </div>
                            <div className="number">
                                <div className="title text-center mt-2">
                                    <h1><span>
                                        {"0"}
                                    </span></h1>
                                </div>
                            </div>
                        </div>
                        <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="fade-up" data-aos-duration="1000"
                            data-aos-delay="3000">
                            <div className="title text-center mt-2">
                                <h5><span>Your Customers</span></h5>
                            </div>
                            <div className="number">
                                <div className="title text-center mt-2">
                                    <h1><span>
                                        {"0"}
                                    </span></h1>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stocks;