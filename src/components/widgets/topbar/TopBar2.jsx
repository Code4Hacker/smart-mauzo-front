import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../baseURL';
const TopBar2 = ({ location }) => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const [employee, setEmployee] = useState();
    const [count, setCount] = useState();
    const [count2, setCount2] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getall = async () => {
            const response = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);

            if (response.data.status === "200") {
                setEmployee(response.data.employee);
            }
        }
        getall();
        const counterGet = async () => {
            const response = await axios.get(`${baseURL}e_counter.php?employee_id=${window.localStorage.emMail}`);
            const deals = await axios.get(`${baseURL}deals.php`);
            for (let index = 0; index < deals.data.deals.length; index++) {
                if (index < deals.data.deals.length - 1) {
                    setCount2(Number(deals.data.deals[index].price) + Number(deals.data.deals[index + 1].price));
                }

            }
            if (response.data.status === "200") {
                setCount(response.data.counts);
            }
        }
        counterGet();

        if (window.localStorage.emMail !== undefined) {

        } else {
            navigate('/e_login');
        }
        
    }, []);
    return (
        <div className=' prt_on'>
            <div className="box_full" style={{ "--width": "100%" }}>
                <div className="container">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="3000">
                        <div className="col-9 flex">
                            <div className="Input Search">
                                {/* <input type="text" placeholder="Search Package Name"/> */}
                                <h2 style={{
                                    marginTop: "50px",
                                    marginLeft: "20px"
                                }} className='gradient-text'>EMPLOYEE - {location}</h2>
                            </div>
                        </div>
                        <div className="col-3 flex mt-20">
                            <div className="profile cc">
                                <img src="https://th.bing.com/th/id/OIP.X0Bqsl6JQsvg2mSFr9JrcQHaHa?pid=ImgDet&rs=1" alt="" />
                            </div>
                            <div className="grid mt-20 cc">
                                <span className="white">
                                    {employee ? employee[0].employeeFirst + " " + employee[0].employeeLast : "John Doe"}
                                </span>
                                <div className="up">
                                    <span className="gray small italic">{employee ? employee[0].employeeEmail : "fakemail@gmail.com"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid_templated showcase">
                <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>All Customers</span></h5>
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
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>Your Customers</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span>
                                {count !== undefined ? count.your_customers : "0"}
                            </span></h1>
                        </div>
                    </div>
                </div>
                {/* <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>TOTAL SALES</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span> {count2} </span></h1>
                            <span className="small">Tshs.</span>
                        </div>
                    </div>
                </div> */}
                {/* <div className="box_full_template_grid " style={{"--width":"100%","--h":"150px"}} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
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

export default TopBar2