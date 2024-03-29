import React, { useEffect, useState } from 'react'
import SideBar from '../widgets/sidebar/SideBar'
import TopBar from '../widgets/topbar/TopBar'
import Aos from 'aos'
import Chart from 'react-google-charts'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Mini from '../widgets/sidebar/Mini'
import Loader from '../Loader/Loader'
import { baseURL } from '../../baseURL'
import Loading from '../Loader/Loading'

const Dashboard = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const [contents, setContents] = useState();
    const [admin, setAdmin] = useState();
    const [count, setCount] = useState();
    const [count2, setCount2] = useState();

    const data = [
        ["Categories", "Hours per Day"],
        ["Employeed", `${count !== undefined ? count.employees : "0"}`],
        ["Customers", `${count !== undefined ? count.customers : "0"}`]
    ];

    const options = {
        pieHole: 0.4,
        is3D: false,
    };

    useEffect(() => {
        const getal = async () => {
            const response = await axios.get(`${baseURL}admin.php?admin_id=${window.localStorage.adminmail}`);

            if (response.data.status === "200") {
                setAdmin(response.data.admin);
            }
        }
        getal();
        const counterGet = async () => {
            const response = await axios.get(`${baseURL}counter.php?admin_id=${window.localStorage.adminmail}`);
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
                        >
                        <SideBar />

                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar location={"DASHBOARD"} />
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
                                    }}>EMPLOYEES</span></h3></div>


                                    <div className="row"
                                        style={{
                                            margin: "10px", marginTop: '25px',
                                            justifyContent: "center"
                                        }}>

                                        {contents !== undefined && contents?.length > -1 ? contents.map((employee, i) => <div className="col-sm-4 flex"
                                            style={{
                                                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                                                margin: "4px",
                                                padding: "8px",
                                                minWidth: "200px",
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
                                                <span className="" style={{
                                                    fontSize: "small",
                                                    fontWeight: 100,
                                                    textTransform: "uppercase"
                                                }}>{employee.employeeFirst + " " + employee.employeeLast}</span>
                                                <div style={{ marginTop: " -7px" }}>
                                                    <span style={{ color: "rgb(102, 102, 102)" }}
                                                        className="gray small">{(employee.employeeEmail).substring(0, 12)}...</span>
                                                </div>
                                            </div>
                                        </div>) : <Loading/>}



                                    </div>
                                    <div className="more text-center"
                                        style={{
                                            margin: "10px",
                                            marginTop: "-10px"
                                        }}>
                                        <Link to={"/employees"} className="small" style={{ color: "var(--orange)" }}>View
                                            All</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="box_full_template_grid " style={{ "--width": "100%", "--h": "270px", position: 'relative' }}
                            id="donutchart" data-aos="fade-left" data-aos-duration="1000"
                            >
                            <div className="title"><h3><span style={{
                                fontWeight: 100, marginTop: '20px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
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

                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;


