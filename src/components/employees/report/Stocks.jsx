import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import axios from 'axios'
import Loader from '../../Loader/Loader'
import { baseURL } from '../../../baseURL'
import SideBar2 from '../../widgets/sidebar/SideBar2'
import Mini2 from '../../widgets/sidebar/Mini2'
import './style.css';
import Card_Top from './Card_Top'

import Chart from "react-apexcharts";
import StockCard from './Stock_card'
import StockCards from './StockCard'

const Stocks = () => {

    const [customers, setCustomers] = useState();
    const [details, setDetails] = useState();
    const getRequests = async (end_point) => {
        const response = axios.request({
            method: "GET",
            url: `${baseURL}${end_point}`,
        });
        return (await response).data;
    }

    const options = {


        series: [69]
    };


    useEffect(() => {
        getRequests(`e_counter.php?employee_id=${window.localStorage.emMail != undefined ? window.localStorage.emMail : ""}`).then((responseStatus) => { setCustomers(responseStatus.counts); }).catch((error) => { console.error("Error fetching data:", error); });
        getRequests("stocks_calculations.php").then((responseStatus) => { setDetails(responseStatus.counts); }).catch((error) => { console.error("Error fetching data:", error); });
    }, []);
    return (
        <div className='dashboardBg'>
            <Loader />
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000"
                        data-aos-delay="3000">
                        <SideBar2 />
                    </div>
                </div>
                <div className="dash_grid_items p-5">
                    {/* <TopBar2 location={"DASHBOARD"} /> */}
                    <div className="grid_cards">
                        <div className="left">
                            <Card_Top
                                detail="your customers"
                                value={customers != undefined ? customers.your_customers : "0"}
                                icon="bi bi-person-fill"
                            />
                            <Card_Top
                                detail="All  Customers"
                                value={customers != undefined ? customers.customers : "0"}
                                icon="bi bi-people-fill"
                            />
                        </div>
                        <div className="right">
                            <div className="card_show new_card" style={{ padding: '20px' }}>
                                <div className="small_flex">
                                    <div className="simple_crd">
                                        <span>Sold</span><span>{details != undefined ? details.sold: "0"}</span>
                                    </div>
                                    <div className="simple_crd">
                                        <span>In Stock</span><span>{details != undefined ? details.total_in_stock: "0"}</span>
                                    </div>
                                </div>
                                <div className="big_name">
                                    Total Sales: {details != undefined ? Number(details.total_income).toLocaleString(): "0"} Tsh
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className="dont">
                        <Chart
                            options={{
                                plotOptions: {
                                    radialBar: {
                                        track: {
                                            background: "#f2f2f2",
                                            strokeWidth: "7%"
                                        },
                                        dataLabels: {
                                            show: true,
                                            value: {
                                                show: true,
                                                fontSize: "16px"
                                            },
                                            total: {
                                                show: true,
                                                label: "all customers",
                                                color: "#00ff88"
                                            }
                                        }
                                    }
                                }
                            }}
                            series={[customers != undefined ? Math.round(((customers.customers > 1 ? customers.customers - .3 : customers.customers) / customers.customers) * 100) : "0"]}
                            type="radialBar"
                            width="350"
                        />
                        <Chart
                            options={{
                                plotOptions: {
                                    radialBar: {
                                        track: {
                                            background: "#f2f2f2",
                                            strokeWidth: "7%"
                                        },
                                        dataLabels: {
                                            show: true,
                                            value: {
                                                show: true,
                                                fontSize: "12px"
                                            },
                                            total: {
                                                show: true,
                                                label: "My customers",
                                                color: "#00ff88"
                                            }
                                        }
                                    }
                                }
                            }}
                            series={[customers != undefined ? Math.round((customers.your_customers / customers.customers) * 100) : "0"]}
                            type="radialBar"
                            width="350"
                        />
                        <Chart
                            options={{
                                plotOptions: {
                                    radialBar: {
                                        track: {
                                            background: "#f2f2f2",
                                            strokeWidth: "7%"
                                        },
                                        dataLabels: {
                                            show: true,
                                            value: {
                                                show: true,
                                                fontSize: "16px"
                                            },
                                            total: {
                                                show: true,
                                                label: "Sold products",
                                                color: "#00ff88"
                                            }
                                        }
                                    }
                                }
                            }}
                            series={[details != undefined ? Math.round(((details.sold) / details.total_in_stock) * 100) : "0"]}
                            type="radialBar"
                            width="350"
                        />
                        <Chart
                            options={{
                                plotOptions: {
                                    radialBar: {
                                        track: {
                                            background: "#f2f2f2",
                                            strokeWidth: "7%"
                                        },
                                        dataLabels: {
                                            show: true,
                                            value: {
                                                show: true,
                                                fontSize: "16px"
                                            },
                                            total: {
                                                show: true,
                                                label: "In stocks",
                                                color: "#00ff88"
                                            }
                                        }
                                    }
                                }
                            }}
                            series={[details != undefined ? Math.round(((details.total_in_stock - details.sold) / details.total_in_stock) * 100) : "0"]}
                            type="radialBar"
                            width="350"
                        />
                    </div>
                    <div className="full_card">
                        <div className="title">
                            <p>Products  Sold</p>
                        </div>

                        <div className="the_list">
                            <div className="icon_num b">
                                SN
                            </div>
                            <div className="b">
                                Product Name
                            </div>
                            <div className="b">Price</div>
                            <div className="b" style={{ textAlign: 'center' }}>Quantity</div>
                            <div className="b">Total</div>
                            <div className="b">Date</div>

                            {
                                details != undefined && details.sold_items?.length > 0 ? details.sold_items.map((data, key) => <StockCards data={data} key={key} key2={key + 1} />) : ""
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stocks;
