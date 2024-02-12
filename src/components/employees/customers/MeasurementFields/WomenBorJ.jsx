import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../../../../baseURL';
import jQuery from 'jquery';

const WomenBorJ = ({ setTask, fname, lname, mail, phone, requirements, unique, dstatus, tracks, setWorks, setOnecount, setContents, setCount }) => {

    const [measures, setMeasures] = useState("");
    const [len, setLen] = useState("");
    const [b, setB] = useState("");
    const [uw, setUw] = useState("");
    const [mw, setMw] = useState("");
    const [hps, setHps] = useState("");
    const [back, setBack] = useState("");
    const [shoulder, setShoulder] = useState("");
    const [ampty, setAmpty] = useState("");
    const [ls, setLs] = useState("");
    const [ss, setSs] = useState("");
    const [chu, setChu] = useState("");
    const [uchu, setUchu] = useState("");
    const [half, setHalf] = useState("");
    const [cty, setCty] = useState("");
    const [bywho, setBywho] = useState("");
    const nav = useNavigate();
    const params = useParams();

    const handlepost = async () => {
        const response = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);

        if (response.data.status === "200") {
            // console.log(response.data.employee[0].employeeID);

            let mrs_connector = `L - ${len}, CHU - ${chu}, U CHU - ${uchu}, HALF - ${half}, B - ${b}, UW - ${uw}, MW - ${mw}, HPS - ${hps}, SHOULDER-  ${shoulder}, BACK - ${back}, AMPITY - ${ampty}, L SLVS - ${ls}, S SLVS - ${ss}`;

            setBywho(response.data.employee[0].employeeID);
            setMeasures(mrs_connector);
            setCty("WomenBorJ");

            let formdata = new FormData();
            formdata.append("title", fname);
            formdata.append("description", lname);
            formdata.append("requires", requirements);
            formdata.append("price", phone);
            formdata.append("quantity", mail);
            formdata.append("cId", unique);
            formdata.append("bywho", bywho);
            formdata.append("measures", measures);
            formdata.append("category", cty);
            formdata.append("status", dstatus);
            formdata.append("track", tracks);

            let bodyContent = formdata;

            let reqOptions = {
                url: `${baseURL}dealforone.php`,
                method: "POST",
                data: bodyContent,
            }

            let response2 = await axios.request(reqOptions);
            if (response2.data.status === "200") {
                const response = await axios.get(`${baseURL}onecustomer.php?id=${params.id}`);
                setContents(response.data.customer[0]);
                const deals = await axios.get(`${baseURL}dealforone.php?customer=${response.data.customer[0].customerUnique}&employee=${response.data.customer[0].registeredBy}`);
                setWorks(deals.data.deals);
                for (let index = 0; index < deals.data.deals.length; index++) {
                    if (index < deals.data.deals.length - 1) {
                        setOnecount(Number(deals.data.deals[index].price) + Number(deals.data.deals[index + 1].price));
                    } else if (deals.data.deals.length === 1) {
                        setOnecount(Number(deals.data.deals[index].price));
                    }

                }
                setCount(deals.data.counter);
                jQuery(".add_box.add_deal").fadeOut({duration:500});
                // setTimeout(() => {
                //     nav(`/pro_forma/${unique}`);
                // }, 3000);
            } else {
                // handlepost();
                alert("please click again to confirm !");
            }
            // const response2 = await axios.get(`${baseURL}onecustomer.php?id=${params.id}`);


        } else {
            alert("ID for Employee is Invalid!");
        }
    }
    return (

        <div className="container">
            <div className="title">
                <h3><span>Women Blouse/Jacket</span></h3>
            </div>



            <div className="flex">
                <input type="text" placeholder="L" name="l" value={len}
                    onChange={(e) => setLen(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{len?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="CHU" name="chu" value={chu}
                    onChange={(e) => setChu(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                <div className="small text-center">{chu?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="U CHU" name="uchu" value={uchu}
                    onChange={(e) => setUchu(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                <div className="small text-center">{uchu?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="HALF" name="half" value={half}
                    onChange={(e) => setHalf(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{half?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="B" name="b" value={b}
                    onChange={(e) => setB(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{b?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="UW" name="uw" value={uw}
                    onChange={(e) => setUw(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                <div className="small text-center">{uw?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="MW" name="mw" value={mw}
                    onChange={(e) => setMw(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                <div className="small text-center">{mw?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="HPS" name="hps" value={hps}
                    onChange={(e) => setHps(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{hps?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="SHOULDER" name="shoulder" value={shoulder}
                    onChange={(e) => setShoulder(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{shoulder?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="BACK" name="back" value={back}
                    onChange={(e) => setBack(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                <div className="small text-center">{back?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="AMPITY" name="ampity" value={ampty}
                    onChange={(e) => setAmpty(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                <div className="small text-center">{ampty?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="LONG SLEEVES" name="ls" value={ls}
                    onChange={(e) => setLs(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{ls?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <input type="text" placeholder="SHORT SLEEVES" name="ss" value={ss}
                onChange={(e) => setSs(e.target.value)}
                style={{ marginTop: "5px", marginBottom: "5px" }} />
            <div className="small text-center">{ss?.length < 1 ? "Fill this field" : ""}</div>




            <div className="button">
                <button id="bottonGet" onClick={() => setTask(1)}><i className="bi bi-chevron-double-left"></i> Back</button>
                <button id="bottonGet" onClick={handlepost}><i className="bi bi-chevron-double-up"></i> Complete</button>
            </div>
        </div>
    )
}

export default WomenBorJ;