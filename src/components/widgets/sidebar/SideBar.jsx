import React from 'react'
import './sidebar.css'
import Aos from 'aos'
import { Link } from 'react-router-dom';

const SideBar = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    return (
        <div>
            <div className="col-xl-12 flex navtab">
                <div className="title">
                    <h5>Tailor<span>2023</span></h5>
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
                        <Link to={"/employees"} className="dropdown">
                            <i className="bi bi-collection-fill"></i>
                            <span> Employees
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
                            <i className="bi bi-people-fill"></i>
                            <span> Customers
                                {/* <i className="bi bi-arrow-right-circle-fill drop"></i> */}
                            </span>
                        </Link>
                    </li>
                    {/* <li>
                        <a href="profile.jsp" className="dropdown">
                            <i className="bi bi-person-fill"></i>
                            <span> Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="sales.jsp" className="dropdown">
                            <i className="bi bi-box-seam-fill"></i>
                            <span> Sales</span>
                        </a>
                    </li>
                    <li>
                        <a href="reports.jsp" className="dropdown">
                            <i className="bi bi-body-text"></i>
                            <span> Reports</span>
                        </a>
                    </li> */}

                    <li>
                        <a href="logout.jsp" className="dropdown">
                            <i className="bi bi-shield-fill"></i>
                            <span> Log Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar