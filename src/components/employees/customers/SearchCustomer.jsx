import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import axios from 'axios'
import Update from './Update'
import { baseURL } from '../../../baseURL'
import TopBar2 from '../../widgets/topbar/TopBar2'
import SideBar2 from '../../widgets/sidebar/SideBar2'
import AddCustomers from './AddCustomer'
import Card2 from './Card2'
import Mini2 from '../../widgets/sidebar/Mini2'
import Loading from '../../Loader/Loading'
import { Link } from 'react-router-dom'

const SCustomer = () => {
    const [title, setTitle] = useState("Last Name");
    const [unique, setUnique] = useState("");
    const [usearch, setUsearch] = useState();
    const searchHandle = async () => {
        try {
            const search_user = await axios.get(`${baseURL}search_customer.php?title=${title}&unique=${unique}`);
            // console.log(search_user.data);
            setUsearch(search_user.data.customers);
        } catch (error) {
            console.log("Error, ", error.message);
        }
    }
    useEffect(() => {
        jQuery(".sel span:nth-child(1)").addClass("choosed");
        jQuery(".sel span:nth-child(1)").on("click", function () {
            jQuery(".sel span:nth-child(2)").removeClass("choosed");
            jQuery(".sel span:nth-child(1)").addClass("choosed");
        });
        jQuery(".sel span:nth-child(2)").on("click", function () {
            jQuery(".sel span:nth-child(1)").removeClass("choosed");
            jQuery(".sel span:nth-child(2)").addClass("choosed");
        });
    }, []);
    return (
        <div>
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar2 />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar2 location={"CUSTOMERS"} />

                    <div className="search_tool">
                        <div className="input_">
                            <div className="flex">
                                <input type="text" placeholder={`Search by Customer ${title}`} value={unique} onChange={(evt) => setUnique(evt.target.value)} />
                                <button className='bi bi-search' onClick={searchHandle}></button>
                            </div>
                            <div className="sel">
                                <span onClick={() => setTitle("Last Name")}>Customer Name </span><span onClick={() => setTitle("Unique ID")}> Customer ID</span>
                            </div>
                        </div>
                    </div>
                    {
                        usearch !== undefined ?
                            <div className="search_tool2 mt-4">
                                <h4 className='title text-center'><span> Customers/ Customer</span></h4>
                                {usearch.map((e, k) =>
                                    <div className="input_2 list flex small" key={k}>
                                        <div className="">
                                        <div className="">
                                            <span>FullName: {`${e.customerFirst} ${e.customerLast}`}</span>
                                        </div>
                                        <div className="">
                                            <span>Customer ID: {`${e.customerUnique}`}</span>
                                        </div>
                                        </div>
                                        <Link to={`/one_customer/${e.customerID}`} className="bi bi-folder-fill" style={{ color: "var(--black)", textDecoration: 'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer', marginLeft:'10px' }}> Profile</Link>
                                    </div>
                                )}
                            </div>
                            : ""
                    }
                </div>
            </div >
        </div >
    )
}
export default SCustomer;

