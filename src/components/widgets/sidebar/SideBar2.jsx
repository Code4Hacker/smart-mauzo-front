import React, { useEffect } from 'react'
import './sidebar.css'
import Aos from 'aos'
import { Link } from 'react-router-dom';
import jQuery from 'jquery';

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
    useEffect(() => { queries() }, []);
    return (
        <div className='prt_on'>
            <div className="col-xl-12 flex navtab">
                <div className="row">
                    <div className="col-10">
                        <div className="title">
                            <h5>Tailor<span>2023</span></h5>
                        </div>
                    </div>
                    <div className="col-2">
                        <i className="bi bi-arrow-left min_board" style={{ cursor: 'pointer' }}></i>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <ul className="menu">
                    <li>
                        <Link to={"/admin"} className="dropdown">
                            <i className="bi bi-buildings-fill"></i>
                            <span> Dashboard</span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/e_customers"} className="dropdown">
                            <i className="bi bi-collection"></i>
                            <span> All Customers
                                {/* <i className="bi bi-arrow-right-circle-fill drop"></i> */}
                            </span>
                        </Link>
                        {/* <ul className="list_dropdown">
                            <li><Link to={"/allemployees"}><i className="bi bi-chevron-double-right"></i> All Employees</Link></li>
                            <li><Link to={"newItem.jsp"}><i className="bi bi-chevron-double-right"></i> New Employee</Link></li>
                        </ul> */}
                    </li>
                    <li className="nested_list">
                        <Link to={"/customers"} className="dropdown">
                            <i className="bi bi-people"></i>
                            <span> Your Customers
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/customers"} className="dropdown">
                            <i className="bi bi-person-plus"></i>
                            <span> New Customers
                            </span>
                        </Link>
                    </li>
                    <li className="nested_list">
                        <Link to={"/deals"} className="dropdown">
                            <i className="bi bi-cart"></i>
                            <span> Your Works
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
                        <Link to={"/"} className="dropdown">
                            <i className="bi bi-shield-fill"></i>
                            <span> Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar2