import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import axios from 'axios'
import './style.css';
import { useParams } from 'react-router-dom'
import { baseURL } from '../../../baseURL'
import SideBar2 from '../../widgets/sidebar/SideBar2';
import TopBar2 from '../../widgets/topbar/TopBar2';
import Mini2 from '../../widgets/sidebar/Mini2';
import Loading from '../../Loader/Loading';
// import Search from '../../widgets/Search/Search';
import Work from './WorkerJobs/Work';

const StuffMember = () => {
    const thedate = new Date();
    const throwback_days = `${(thedate.getFullYear())}/${(thedate.getMonth()+1)}/${(thedate.getDate() - 7)}`;

    const [contents, setContents] = useState();
    const params  = useParams();
    const [date_days, setDate_days] = useState(7);
    const [money, setMoney] = useState(0);

    const [datefrom1, setDatefrom1] = useState(`${(thedate.getFullYear())}-${(thedate.getMonth()+1)}-${(thedate.getDate() - 7)}`);    
    const [dateto1, setDateto1] = useState(`${(thedate.getFullYear())}-${(thedate.getMonth()+1)}-${(thedate.getDate())}`);

    useEffect(() => {

        handleFilter();
        // jqueryCodes();
    }, []);
    const handleFilter = async() => {
        let gem_data = new FormData();
        gem_data.append("name_worker", params.id);
        gem_data.append("start", datefrom1);
        gem_data.append("to_end", dateto1);
        let newdata = gem_data;
        const getal = async () => {
            const money = await axios.get(`${baseURL}contents.php?id=${params.id}`);
            setMoney(money.data.TOTAL);
            const response = await axios.request({
                method:'POST',
                url:`${baseURL}worker.php`,
                data:newdata
            });
            setContents(response.data);
            // console.log(response.data);
        }
        const start = new Date(dateto1) - new Date(datefrom1);
        const deff = Math.floor(start/ (1000 * 60 * 60 * 24))
        setDate_days(deff);
        getal();
    }
    return (
        <div>
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar prt_on">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar2 />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar2 location={"WORKER INFO"} />
                    <div className=" container " style={{

                    }}>
                        <div className="row customer">
                            <div className="col-md-6 prt_on">
                                <div className="contents">
                                    <div className="title"><h3><span style={{
                                        fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                    }}>WORKER PROFILE</span></h3></div>
                                    <div className="grid2 prt_on" style={{ "--template": "auto" }}>
                                        <div className="content">
                                            <div className="container" style={{marginTop:'30px'}}>
                                                <h4>Full Name</h4>
                                                <p>{params.id}</p>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="grid_mini">
                                        <div className="">
                                            <h5>In Days</h5>
                                            <p>{date_days}</p>
                                        </div>
                                        <div className="">
                                            <h5>Total Price</h5>
                                            {Number(money).toLocaleString()} Tsh.
                                        </div>

                                    </div>
                                    {/* DATE ...... */}
                                    <div className="flex date_flex">
                                        <div className="">
                                            <label htmlFor="Start Date">Start Date</label>
                                            <input type="date" name="" id="" value={datefrom1} onChange={(evt) => setDatefrom1(evt.target.value)} />
                                        </div>
                                        <div className="">
                                            <label htmlFor="Start Date">End Date</label>
                                            <input type="date" name="" id="" value={dateto1} onChange={(evt) => setDateto1(evt.target.value)} />
                                        </div>
                                        <button className="bi bi-search" onClick={handleFilter}></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 process prt_on">
                                <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important',  padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>ACTIVITIES</span></h3></div>
                                <div className="contents">
                                    <div className="processor" style={{
                                marginTop: '30px'}}>
                                        <div className="processor2">
                                            <div className="center">
                                                <h1><span>{contents !== undefined ? contents.counter:"0"}</span></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-10 pdeal" style={{
                                marginTop: '50px', position: 'relative'
                            }}>
                                <div className="title"><h4><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>WORKS</span></h4></div>
                                {/* <button className="print_deal bi bi-printer-fill prt_on" onClick={printing}> Print</button> */}
                                <div className="deals" style={{
                                    marginTop: '40px', position: 'relative'
                                }}>
                                    {
                                        contents !== undefined && contents.deals?.length > 0 ? contents.deals.map((j,i) => <Work works={j} key={i}/>) : <Loading/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADDING
            <AddEmployee setEmployee={setContents} /> */}
            {/* <NewDeal setContents={setContents} setOnecount={setOnecount} setWorks={setWorks} setCount={setCount} /> */}
            {/* <Search setDeals={setWorks} setCount={setCount} uri={"searchbyInd.php"} id={"YES"} /> */}
            {/* <div className="addnew prt_on">
                <button className='bi bi-plus add_open dealnew'>
                    <span>New Deal</span>
                </button>
            </div> */}
        </div >
    )
}
export default StuffMember;