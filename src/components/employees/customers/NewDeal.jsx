import React, { useEffect, useState } from 'react';
import jQuery from 'jquery';
import MenJacket from './MeasurementFields/MenJacket';
import MenTrouser from './MeasurementFields/MenTrouser';
import WomenBorJ from './MeasurementFields/WomenBorJ';
import WomenSorT from './MeasurementFields/WomenSorT';
import WomenDress from './MeasurementFields/WomenDress';
import raws from '../raws.json';
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import { useParams } from 'react-router-dom';
import Multiple from './MeasurementFields/Multiple';
import Loading from '../../Loader/Loading';

const NewDeal = ({ setWorks, setOnecount, setContents, setCount, unique }) => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [codes, setCodes] = useState("");
    const [dstatus, setDstatus] = useState("");
    const [tracking, setTracking] = useState("");
    const [summary, setSummary] = useState("");
    const [sVummary, setSVummary] = useState("");
    const [fVname, setFVname] = useState("");
    const [lVname, setLVname] = useState("");
    const [pVhone, setPVhone] = useState("");
    const [mVail, setMVail] = useState("");
    const [cVodes, setCVodes] = useState();
    const [workers, setWorkers] = useState();
    const [worker, setWorker] = useState();

    const params = useParams();



    const [next_task, setNext_task] = useState(0);
    const [choice, setChoice] = useState("MenJacket");
    const previewSelect = () => {
        jQuery(".preview").on("click", function () {
            jQuery(".preview").removeClass("choose");
            jQuery(this).addClass("choose");
        });
    }
    const uniqueID = async () => {
        const unique_get = await axios.get(`${baseURL}customerID.php?id=${params.id}`);
        setCodes(unique_get.data.UNIQUE_ID);
    }
    const the_workers = async () => {
        const get__worker = await axios.get(`${baseURL}worker.php`);
        setWorkers(get__worker.data.workers);
    }
    useEffect(() => {
        uniqueID();
        the_workers();
    }, []);
    previewSelect();
    return (
        <div className="add_box add_deal" style={{ display: "none" }}>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel">
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                {
                    next_task === 0 ?
                        <div className="container">
                            <input type="text" placeholder="Deal Title" name="tt" value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} />
                            <div className="small text-center">{fVname}</div>
                            <textarea type="text" placeholder="Deal Description" name="dd" value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} ></textarea>
                            <div className="small text-center">{lVname}</div>

                            <textarea type="text" placeholder="Requirements" name="req" value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} ></textarea>
                            <div className="small text-center">{sVummary}</div>
                            <select name="worker" id="" onChange={(e) => setWorker(e.target.value)}>
                                <option value={"null"}>Select Worker</option>
                                {
                                    workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>): <Loading/>
                                }
                            </select>

                            <div className="flex">
                                <div className="" style={{ width: '100%' }}>
                                    <div className="small text-center">Payment Status</div>
                                    <select name="" id="" onChange={(evt) => setDstatus(evt.target.value)}>
                                        <option value={raws.deal_status.PENDING}>{raws.deal_status.PENDING}</option>
                                        <option value={raws.deal_status.PAID}>{raws.deal_status.PAID}</option>
                                    </select>
                                </div>
                                <div className="" style={{ width: '100%' }}>
                                    <div className="small text-center">Deal Attitude</div>
                                    <select name="" id="" onChange={(evt) => setTracking(evt.target.value)}>
                                        <option value={raws.deal_track.FIRST_CHOICE}>{raws.deal_track.FIRST_CHOICE}</option>
                                        <option value={raws.deal_track.SECOND_CHOICE}>{raws.deal_track.SECOND_CHOICE}</option>
                                        <option value={raws.deal_track.THIRD_CHOICE}>{raws.deal_track.THIRD_CHOICE}</option>
                                        <option value={raws.deal_track.FORTH_CHOICE}>{raws.deal_track.FORTH_CHOICE}</option>
                                    </select>
                                </div>
                            </div>



                            <div className="button">
                                <button id="bottonGet" onClick={() => setNext_task(2)}><i className="bi bi-chevron-double-right"></i> next</button>
                            </div>
                        </div>
                        : next_task === 2 ?
                            <div className="">
                                <Multiple setTask={setNext_task} fname={fname} lname={lname} mail={mail} phone={phone} requirements={summary} unique={codes} tracks={tracking} dstatus={dstatus} setContents={setContents} setOnecount={setOnecount} setWorks={setWorks} setCount={setCount} worker={worker} />
                            </div>
                            :
                            "Loading ..."
                }
            </div>
        </div>
    )
}

export default NewDeal;