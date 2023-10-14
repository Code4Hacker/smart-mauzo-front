import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import { baseURL } from '../../../baseURL'
import Mini from '../../widgets/sidebar/Mini'
import SideBar2 from '../../widgets/sidebar/SideBar2'
import moneybg from '../../../assets/money.jpg';
import Stock_card from './Stock_card'
import NewStock from './NewStock'
import jQuery from 'jquery'
import Loading from '../../Loader/Loading'
import Mini2 from '../../widgets/sidebar/Mini2'

const Stocks = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const [employee, setEmployee] = useState();
    const [count, setCount] = useState();
    const [count2, setCount2] = useState();
    const [stocksdt, setStocksdt] = useState();
    const navigate = useNavigate();
    const query = () => {
        jQuery(".addstockBtn").on("click", function () {
            jQuery(".add_box.newstock").fadeIn({
                duration: 1000
            });
        });
        jQuery(".newstock .cancel").on("click", function () {
            jQuery(".add_box.newstock").fadeOut({
                duration: 1000
            });
        });
    }
    useEffect(() => {
        query();
        const getall = async () => {
            const response = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);


            if (response.data.status === "200") {
                setEmployee(response.data.employee);
            }
            const stock = await axios.get(`${baseURL}stocks.php`);
            if (stock.data.status === "200") {
                setStocksdt(stock.data.stocks.splice(0, 3));
                jQuery(".showall").on("click", function () {
                    const as_new = async () => {
                        const sto = await axios.get(`${baseURL}stocks.php`);
                        if (sto.data.status === "200") {
                            setStocksdt(sto.data.stocks);
                        }
                    }
                    as_new();
                });
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
        <div>
            <Loader />
            <Mini2 />
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
                        <div className="shadows">
                            <div className="center">
                                <h1 className='white'>CARENITHO COMPANY</h1>
                            </div>
                        </div>
                    </div>
                    {/* <TopBar2 location={"DASHBOARD"} /> */}
                    <div className="grid_template showcas">
                        <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="fade-up" data-aos-duration="1000"
                            data-aos-delay="3000">
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
                        <div className="box_full_template_grid " style={{ "--width": "100%" }} data-aos="fade-up" data-aos-duration="1000"
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

                    </div>
                    <div className="top_banner" style={{
                        background: 'none'
                    }}>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>Arrival Stocks</h5>
                                    </div>
                                    <div className="col-2">
                                        <div className="button">
                                            <button className="bi bi-pen addstockBtn"> Add New</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="flex bx">
                                {
                                    stocksdt !== undefined && stocksdt?.length > 0 ? stocksdt.map((stock, i) => <Stock_card card={stock} key={i} />) : <Loading />
                                }
                            </div>
                            <div className="button">
                                <span className="small showall">
                                    Show All
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NewStock setStocksdt={setStocksdt} />
        </div>
    )
}

export default Stocks;