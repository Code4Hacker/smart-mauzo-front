import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import SideBar from '../../widgets/sidebar/SideBar'
import TopBar from '../../widgets/topbar/TopBar'
import axios from 'axios'
import Update from './Update'
import './style.css';
import { useParams } from 'react-router-dom'
import Mini from '../../widgets/sidebar/Mini'
import { baseURL } from '../../../baseURL'
import AllDeal from './AllDeal'
import Search from '../../widgets/Search/Search'

const AllDeals = () => {
    const jqueryCodes = () => {
        // jQuery.noConflict();
        setTimeout(() => {
            jQuery(".pre_loader ").fadeOut({
                duration: 500,
                easing: 'linear'
            });
        }, 2000);
        jQuery(".update .cancel button").on("click", () => {
            jQuery(".add_box").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("ADD CANCELED!");
                }
            })
        });
        jQuery(".add_open").on("click", () => {
            jQuery(".add_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".add_box").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("ADD CANCELED!");
                }
            });
        });

        jQuery(".rename .cancel button").on("click", () => {
            jQuery(".rename_box").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                    console.log("UPDATE CANCELED!");
                }
            })
        });
        jQuery(".updateMe").on("click", () => {
            jQuery(".rename_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".rename_box").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            });
        });
    }
    const params = useParams();
    const [contents, setContents] = useState();
    const [works, setWorks] = useState();
    const [count, setCount] = useState();
    useEffect(() => {
        const getall = async () => {
            const deals = await axios.get(`${baseURL}deals.php`);
            // setContents(response.data.deals);
            setWorks(deals.data.deals);
            setCount(deals.data.counter);
        }
        
        getall();
        jqueryCodes();
    }, []);
    return (
        <div>
            {/* <div className="pre_loader">
                <div className="loading">
                    <div className="loader"></div>
                </div>
            </div> */}
            <Mini />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar location={"ALL DEALS"} />
                    <div className=" container " style={{

                    }}>
                        <div className="row customer">
                            <div className="col-xl-8" style={{
                                marginTop: '50px'
                            }} data-aos="fade-right" data-aos-duration="1000" data-aos-delay="1000">
                                {/* <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '0px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>CUSTOMERS DEAL</span></h3></div> */}
                                <div className="deals" style={{marginTop:'40px'}}>
                                    {
                                        works !== undefined && works?.length > -1 ? works.map((work, id) => <AllDeal deals={work} num={id} setDeals={setWorks} setCount={setCount} key={id} />):"Loading ..."
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 process">
                                <div className="contents">
                                    <div className="processor">
                                        <div className="processor2">
                                            <div className="center">
                                                <h1><span>{count}</span></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADDING
            <AddEmployee setEmployee={setContents} /> */}
            <Update setEmployee={setContents} />
            {/* <div className="addnew">
                <button className='bi bi-person-plus-fill add_open'>
                </button>
            </div> */}
            <Search setDeals={setWorks} setCount={setCount} uri={"searchdeals.php"} id={"NO"}/>
        </div >
    )
}
export default AllDeals;