import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../../../../baseURL';
import jQuery from 'jquery';

const WomenSorT = ({ setTask, fname, lname, mail, phone, requirements, unique, dstatus, tracks, setWorks, setOnecount, setContents, setCount }) => {

    const [measures, setMeasures] = useState("");
    const [len, setLen] = useState("");
    const [w, setW] = useState("");
    const [hps, setHps] = useState("");
    const [knee, setKnee] = useState("");
    const [ankle, setAnkle] = useState("");
    const [thigh, setThigh] = useState("");
    const [flys, setFlys] = useState("");
    const [cty, setCty] = useState("");
    const [bywho, setBywho] = useState("");
    const nav = useNavigate();
    const params = useParams();

    const handlepost = async () => {
        const response = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);

        if (response.data.status === "200") {
            // console.log(response.data.employee[0].employeeID);

            let mrs_connector = `L - ${len}, W - ${w}, HPS - ${hps}, THIGH - ${thigh}, KNEE - ${knee}, ANKLE - ${ankle}, FLYS - ${flys}`;

            setBywho(response.data.employee[0].employeeID);
            setMeasures(mrs_connector);
            setCty("Women SorT");

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
                // console.log(response2.data);
            }
            // const response2 = await axios.get(`${baseURL}onecustomer.php?id=${params.id}`);


        } else {
            alert("ID for Employee is Invalid!");
        }
    }
    return (

        <div className="container">
            <div className="title">
                <h3><span>Women Skirt/Trouser</span></h3>
            </div>
            <div className="flex">
                <input type="text" placeholder="L" name="l" value={len}
                    onChange={(e) => setLen(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                <div className="small text-center">{len?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="W" name="w" value={w}
                    onChange={(e) => setW(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{w?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="HPS" name="hps" value={hps}
                    onChange={(e) => setHps(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{hps?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="THIGH" name="thigh" value={thigh}
                    onChange={(e) => setThigh(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                <div className="small text-center">{thigh?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="KNEE" name="knee" value={knee}
                    onChange={(e) => setKnee(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                <div className="small text-center">{knee?.length < 1 ? "Fill this field" : ""}</div>
                <input type="text" placeholder="ANKLE" name="ankle" value={ankle}
                    onChange={(e) => setAnkle(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{ankle?.length < 1 ? "Fill this field" : ""}</div>
            </div>
            <input type="text" placeholder="FLYS" name="flys" value={flys}
                onChange={(e) => setFlys(e.target.value)}
                style={{ marginTop: "5px", marginBottom: "5px"}} />
            <div className="small text-center">{flys?.length < 1 ? "Fill this field" : ""}</div>


            <div className="button">
                <button id="bottonGet" onClick={() => setTask(1)}><i className="bi bi-chevron-double-left"></i> Back</button>
                <button onClick={handlepost}><i className="bi bi-chevron-double-up"></i> Complete</button>
            </div>
        </div>
    )
}

export default WomenSorT;