import React, { useEffect } from 'react'
import './sidebar.css'
import Aos from 'aos'
import { Link, useNavigate } from 'react-router-dom';
import jQuery from 'jquery';
import imagelogo from "../../../assets/money.png";

const SideBar2 = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const queries = () => {
        jQuery(".min_board").on("click", function () {
            jQuery(".sidebar").addClass("minimized");
            jQuery(".dashboard_grid_container").addClass("minimized");
            jQuery(".mini-sidebar>*").addClass("minimized");
        });
    }
    const navigate = useNavigate();
    useEffect(() => { queries() }, []);
    const handleLog = () => {
        window.localStorage.clear();
        navigate('/e_login');
    }
    return (
        <div className='prt_on'>
            <div className="col-xl-12 flex navtab">
                <div className="row">
                    <div className="col-10">
                    <div className="title">
                            <h5>Rubiq<span>Premier</span></h5>
                        </div>
                        {/* <div className="logoB" style={{ overflow: 'hidden', paddingLeft: '20px', position: 'relative', borderRadius: '10px' }}>
                            <img src={imagelogo} alt="Logo" style={{ width: '100%', objectFit: 'cover', position: 'relative' }} />
                        </div> */}
                    </div>
                    <div className="col-2">
                        <i className="bi bi-arrow-left min_board" style={{ cursor: 'pointer' }}></i>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <ul className="menu">
                    <li>
                        <Link to={"/employee"} className="dropdown">
                            <i className="bi bi-buildings-fill"></i>
                            <span> Dashboard</span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/e_customers"} className="dropdown">
                            <i className="bi bi-collection"></i>
                            <span> All Customers
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/userEmp"} className="dropdown">
                            <i className="bi bi-people"></i>
                            <span> Your Customers
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/search_customer"} className="dropdown">
                            <i className="bi bi-search"></i>
                            <span> Customer
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/stuff_members"} className="dropdown">
                            <i className="bi bi-person-workspace"></i>
                            <span> Stuff and/or Workers
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/products"} className="dropdown">
                            <i className="bi bi-cart"></i>
                            <span> Products
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/repo"} className="dropdown">
                            <i className="bi bi-building"></i>
                            <span> Stocks and Report
                            </span>
                        </Link>
                    </li>
                    <li>
                        <span className="dropdown" onClick={handleLog} style={{
                            color: 'white',
                            padding: '10px',
                            borderRadius: '10px',
                            backgroundColor: 'royalblue'
                        }}>
                            <i className="bi bi-shield-fill"></i>
                            <span> Log Out</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar2