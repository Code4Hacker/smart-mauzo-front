import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import { baseURL } from '../../../baseURL'
import Stock_card from './Stock_card'
import NewStock from './NewStock'
import jQuery from 'jquery'
import Loading from '../../Loader/Loading'
import './style.css';
import Requirements from './Requirements'
import Mini from '../../widgets/sidebar/Mini'
import SideBar from '../../widgets/sidebar/SideBar'

const AStocks = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const thedate = new Date();
    let throwback_days;
    let day = (thedate.getDate());
    let month = (thedate.getMonth() + 1);
    let year = (thedate.getFullYear());
    let sub = day - 6;
    throwback_days = `${year}-${month >= 10? month : "0" + month}-${sub >= 10 ? sub : "0" + sub}`;
    while(sub <= 0){
        month--;
        sub = 30 + sub;
        throwback_days = `${year}-${month >= 10? month : "0" + month}-${sub >= 10 ? sub : "0" + sub}`;
    }

    const [admin, setAdmin] = useState();
    const [count, setCount] = useState();
    const [cty, setCty] = useState("CLOTHES");
    const [count2, setCount2] = useState();
    const [total, setTotal] = useState(0);
    const [stocksdt, setStocksdt] = useState();
    const [srequirements, setSrequirements] = useState();
    const [hide, setHide] = useState(false);
    const [date_days, setDate_days] = useState(7);
    let increment = 2;

    const [datefrom1, setDatefrom1] = useState(throwback_days);
    const [dateto1, setDateto1] = useState(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate() >= 10 ? thedate.getDate() : "0" + thedate.getDate())}`);

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
    const getall = async () => {
        const response = await axios.get(`${baseURL}admin.php?admin_id=${window.localStorage.adminmail}`);
        const requirements = await axios.get(`${baseURL}Requirements.php?start=${datefrom1}&to_end=${dateto1}`);
        setSrequirements(requirements.data);
        // Requirements.php

        if (response.data.status === "200") {
            setAdmin(response.data.admin);
        }
        const stock = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=${cty}`);
        if (stock.data.status === "200") {
            setStocksdt(stock.data.stocks);
            setTotal(stock.data.TOTAL);
            jQuery(".showall").on("click", function () {
                const as_new = async () => {
                    const sto = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=${cty}`);
                    if (sto.data.status === "200") {
                        setStocksdt(sto.data.stocks);
                        // setStocksdt(sto.data.stocks.splice(0, increment));
                        increment += 2;
                    }
                }
                as_new();
            });
        }
    }
    const counterGet = async () => {
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
    useEffect(() => {
        query();

        getall();

        counterGet();

        if (window.localStorage.adminmail !== undefined) {

        } else {
            navigate('/');
        }

    }, []);
    const filter_history = () => {
        getall();
        counterGet();
    }
    const filter_history_1w = () => {
        setDatefrom1(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate() - 7)}`);
        setDateto1(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate())}`);
        getall();
        counterGet();
    }
    const filter_history_2w = () => {
        setDatefrom1(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate() - 14)}`);
        setDateto1(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate())}`);
        getall();
        counterGet();
    }
    const filter_history_1M = () => {
        setDatefrom1(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate() - 30)}`);
        setDateto1(`${(thedate.getFullYear())}-${(thedate.getMonth() + 1)}-${(thedate.getDate())}`);
        getall();
        counterGet();
    }
    const cty_clothes = async () => {
        setCty("CLOTHES");
        const as_new = async () => {
            const sto = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=CLOTHES`);
            if (sto.data.status === "200") {
                setStocksdt(sto.data.stocks);
                setHide(false);
            }
        }
        as_new();
        jQuery(".categ li").removeClass("ctg");
        jQuery(".categ li:nth-child(4)").addClass("ctg");
        counterGet();
    }
    const cty_shoes = async () => {
        setCty("SHOES");
        const as_new = async () => {
            const sto = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=SHOES`);
            if (sto.data.status === "200") {
                setStocksdt(sto.data.stocks);
                setHide(false);
            }
        }
        as_new();
        counterGet();
        jQuery(".categ li").removeClass("ctg");
        jQuery(".categ li:nth-child(3)").addClass("ctg");
    }
    const cty_fabric = async () => {
        setCty("FABRIC");
        const as_new = async () => {
            const sto = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=FABRIC`);
            if (sto.data.status === "200") {
                setStocksdt(sto.data.stocks);
                setHide(true);
            }
        }
        as_new();
        counterGet();
        jQuery(".categ li").removeClass("ctg");
        jQuery(".categ li:nth-child(2)").addClass("ctg");
    }
    const cty_bills = () => {
        setCty("BILLS");
        const as_new = async () => {
            const sto = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=BILLS`);
            if (sto.data.status === "200") {
                setStocksdt(sto.data.stocks);
                setHide(true);
            }
        }
        as_new();

        jQuery(".categ li").removeClass("ctg");
        jQuery(".categ li:nth-child(1)").addClass("ctg");
        counterGet();
    }
    // jQuery(".showall").on("click", async function () {
    //     const sto = await axios.get(`${baseURL}stocks.php?start=${datefrom1}&to_end=${dateto1}&category=${cty}`);
    //     if (sto.data.status === "200") {
    //         setStocksdt(sto.data.stocks.splice(0, increment));
    //     }
    //     increment += 2;
    // });
    useEffect(() => {
        jQuery(".categ li:nth-child(4)").addClass("ctg");
    });
    return (
        <div>
            <Loader />
            <Mini />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000"
                        data-aos-delay="3000">
                        <SideBar />

                    </div>
                </div>
                <div className="dash_grid_items">
                    {/* <TopBar2 location={"DASHBOARD"} /> */}
                    <div className="grid_template showcas stks">
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
                            <h3><span> {count2} </span></h3>
                            <span className="small">Tshs.</span>
                        </div>
                    </div>
                </div>

                    </div>
                    <div className="top_banner" style={{
                        background: 'none'
                    }}>
                        {/* <div className="row">
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-2">
                                        <div className="button">
                                            <button className="bi bi-plus addstockBtn"> CREATE</button>
                                        </div>
                                    </div>
                                    <div className="col-10 text-end">
                                        <h5>ADD REPORTS</h5>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>STOCK REPORTS</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="filter_tab">
                                        <div className="filter_dates">
                                            <div className="categorie">
                                                <span className="bi bi-search"> Filter</span>
                                            </div>
                                            <div className="repo_filter">
                                                <ul>
                                                    <li><button className="ses" onClick={filter_history}><i className="bi bi-search"></i></button></li>
                                                    <li className='li_input flex'><div className="mt-2 p-1 x-small">End: </div> <input type="date" name="" id="" value={dateto1} onChange={(evt) => setDateto1(evt.target.value)} /></li>
                                                    <li className='li_input flex'><div className="mt-2 p-1 x-small">Start: </div> <input type="date" name="" id="" value={datefrom1} onChange={(evt) => setDatefrom1(evt.target.value)} /></li>
                                                    {/* <li onClick={filter_history_1M}><i className="bi bi-calenda"></i><span> 1 Month</span></li>
                                                    <li onClick={filter_history_2w}><i className="bi bi-calenda"></i><span> 2 Weeks</span></li>
                                                    <li onClick={filter_history_1w}><i className="bi bi-calenda"></i><span> 1 Week</span></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="filter_dates">
                                            <div className="categories">
                                                <span>Categories</span>
                                            </div>
                                            <div className="categ">
                                                <ul>
                                                    <li onClick={cty_bills}><i className="bi bi-coin"></i><span> Bills</span></li>
                                                    <li onClick={cty_fabric}><i className="bi bi-stack"></i><span> Fabric</span></li>
                                                    <li onClick={cty_shoes}><i className="bi bi-person-walking"></i><span> Shoes</span></li>
                                                    <li onClick={cty_clothes}><i className="bi bi-collection"></i><span> CLOTHES</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="container glass">
                                                <div className="grid_repo">
                                                    <div className="">
                                                        <div className="title">
                                                            <h4>Resources</h4>
                                                        </div>
                                                        {
                                                            stocksdt !== undefined && stocksdt?.length > 0 ? stocksdt.map((stock, i) => <Stock_card card={stock} setSrequirements={setSrequirements} setStocksdt={setStocksdt} setTotal={setTotal} cty={cty} key={i} />) : <Loading />
                                                        }
                                                        {/* <div className="showall text-center">View All</div> */}
                                                        <div className="sum_line">
                                                            TOTAL CASH : {total ? Number(total).toLocaleString() : 0} Tsh.
                                                        </div>
                                                    </div>
                                                    <div className={`${hide ? 'hide': ''}`}>
                                                        <div className="title">
                                                            <h4>Requirements List</h4>
                                                        </div>
                                                        {
                                                            srequirements !== undefined && srequirements.RE_QUIREMENT?.length > 0 ? srequirements.RE_QUIREMENT.map((stock, i) => <Requirements card={stock} key={i} />) : <Loading />
                                                        }

                                                        <div className="sum_line">
                                                            TOTAL CASH : {srequirements !== undefined && srequirements.TOTAL ? Number(srequirements.TOTAL).toLocaleString() : 0} Tsh.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NewStock setStocksdt={setStocksdt} datefrom1={datefrom1} dateto1={dateto1} />
        </div>
    )
}

export default AStocks;