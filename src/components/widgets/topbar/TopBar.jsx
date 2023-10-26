import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../baseURL';
import jQuery from 'jquery';
const TopBar = ({ location }) => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const [admin, setAdmin] = useState();
    const [count, setCount] = useState();
    const [count2, setCount2] = useState();
    const navigate = useNavigate();
    const query_2 = () => {
        jQuery("button").on("click", function () {
            jQuery("button *").removeClass("btn_cli");
            jQuery(this).find(".bn1").hide();
            jQuery(this).find(".bn2").addClass("btn_cli");
            jQuery(this).prop("disabled", true);
            setTimeout(() => {
                jQuery(this).prop("disabled", false);
                jQuery(this).find(".bn1").show({
                    done: function () {
                        jQuery("button *").removeClass("btn_cli");
                        jQuery(this).prop("disabled", false);
                    }
                });
            }, 3000);
        });
    }
    useEffect(() => {
        query_2();
        const getall = async () => {
            const response = await axios.get(`${baseURL}admin.php?admin_id=${window.localStorage.adminmail}`);

            if (response.data.status === "200") {
                setAdmin(response.data.admin);
            }
        }
        getall();
        const counterGe = async () => {
            const response = await axios.get(`${baseURL}counter.php?admin_id=${window.localStorage.adminmail}`);
            const deals = await axios.get(`${baseURL}dealtotal.php?admin_id=${window.localStorage.adminmail}`);

            if (deals.data.status === "200") {
                setCount2(Number(deals.data.TOTAL).toLocaleString())
            }
            
            if (response.data.status === "200") {
                setCount(response.data.counts);
            }
        }
        if (window.localStorage.adminmail !== undefined) {

        } else {
            navigate('/');
        }
        counterGe();

    }, []);
    return (
        <div>
            <div className="box_full" style={{ "--width": "100%" }}>
                <div className="container">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <div className="col-9 flex">
                            <div className="Input Search">
                                {/* <input type="text" placeholder="Search Package Name"/> */}
                                <h2 style={{
                                    marginTop: "50px",
                                    marginLeft: "20px"
                                }} className='gradient-text'>ADMIN - {location}</h2>
                            </div>
                        </div>
                        <div className="col-3 flex mt-20">
                            <div className="profile cc">
                                <img src="https://th.bing.com/th/id/OIP.X0Bqsl6JQsvg2mSFr9JrcQHaHa?pid=ImgDet&rs=1" alt="" />
                            </div>
                            <div className="grid mt-20 cc">
                                <span className="white">
                                    {admin ? admin[0].adminFirst + " " + admin[0].adminLast : "John Doe"}
                                </span>
                                <div className="up">
                                    <span className="gray small italic">{admin ? admin[0].adminEmail : "fakemail@gmail.com"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid_templated showcase">
                <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="flip-up" data-aos-duration="1000"
                >
                    <div className="title text-center mt-2">
                        <h5><span>Employees</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span>
                                {count !== undefined ? count.employees : "0"}
                            </span></h1>
                        </div>
                    </div>
                </div>
                <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="flip-up" data-aos-duration="1000"
                >
                    <div className="title text-center mt-2">
                        <h5><span>Customers</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span>
                                {count !== undefined ? count.customers : "0"}
                            </span></h1>
                        </div>
                    </div>
                </div>
                <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="flip-up" data-aos-duration="1000"
                >
                    <div className="title text-center mt-2">
                        <h5><span>TOTAL SALES</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h4><span> {count2} </span></h4>
                            <span className="small">Tshs.</span>
                        </div>
                    </div>
                </div>
                {/* <div className="box_full_template_grid " style={{"--width":"100%","--h":"150px"}} data-aos="flip-up" data-aos-duration="1000"
                    >
                    <div className="title text-center mt-2">
                        <h5><span>ITEMS SOLD</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span> 1000 </span></h1>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default TopBar