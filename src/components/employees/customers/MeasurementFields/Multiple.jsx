import React, { useEffect, useState } from 'react';
import jQuery from 'jquery';
import axios from 'axios';
import { baseURL } from '../../../../baseURL';
import { useParams } from 'react-router-dom';
import Loading from '../../../Loader/Loading';

const Multiple = ({ setTask, fname, lname, requirements, unique, dstatus, tracks, setWorks, setOnecount, setContents, setCount }) => {
    // const [worker, setWorker] = useState();
    const [workers, setWorkers] = useState();

    // M---JACKET
    const [lenm, setLenm] = useState("");
    const [bm, setBm] = useState("");
    const [wm, setWm] = useState("");
    const [hpsm, setHpsm] = useState("");
    const [backm, setBackm] = useState("");
    const [bgm, setBgm] = useState("");
    const [amptym, setAmptym] = useState("");
    const [lsm, setLsm] = useState("");
    const [ssm, setSsm] = useState("");
    const [pricem, setPricem] = useState("");
    const [quantitym, setQuantitym] = useState("");
    const [workerm, setWorkerm] = useState("");


    // M---TROUSER
    const [lenmt, setLenmt] = useState("");
    const [wmt, setWmt] = useState("");
    const [hpsmt, setHpsmt] = useState("");
    const [kneemt, setKneemt] = useState("");
    const [anklemt, setAnklemt] = useState("");
    const [thighmt, setThighmt] = useState("");
    const [flysmt, setFlysmt] = useState("");
    const [pricemt, setPricemt] = useState("");
    const [quantitymt, setQuantitymt] = useState("");
    const [workermt, setWorkermt] = useState("");


    // W---BLOUSER
    const [lenwb, setLenwb] = useState("");
    const [bwb, setBwb] = useState("");
    const [uwwb, setUwwb] = useState("");
    const [mwwb, setMwwb] = useState("");
    const [hpswb, setHpswb] = useState("");
    const [backwb, setBackwb] = useState("");
    const [shoulderwb, setShoulderwb] = useState("");
    const [amptywb, setAmptywb] = useState("");
    const [lswb, setLswb] = useState("");
    const [sswb, setSswb] = useState("");
    const [chuwb, setChuwb] = useState("");
    const [uchuwb, setUchuwb] = useState("");
    const [halfwb, setHalfwb] = useState("");
    const [pricewb, setPricewb] = useState("");
    const [quantitywb, setQuantitywb] = useState("");
    const [workerwb, setWorkerwb] = useState("");

    // W---TROUSER/SKIRT
    const [lenw, setLenw] = useState("");
    const [ww, setWw] = useState("");
    const [hpsw, setHpsw] = useState("");
    const [kneew, setKneew] = useState("");
    const [anklew, setAnklew] = useState("");
    const [thighw, setThighw] = useState("");
    const [flysw, setFlysw] = useState("");
    const [pricew, setPricew] = useState("");
    const [quantityw, setQuantityw] = useState("");
    const [workerw, setWorkerw] = useState("");

    // W---DRESS
    const [lenwd, setLenwd] = useState("");
    const [bwd, setBwd] = useState("");
    const [wwd, setWwd] = useState("");
    const [hpswd, setHpswd] = useState("");
    const [kneewd, setKneewd] = useState("");
    const [halfwd, setHalfwd] = useState("");
    const [kwd, setKwd] = useState("");
    const [pricewd, setPricewd] = useState("");
    const [quantitywd, setQuantitywd] = useState("");
    const [workerwd, setWorkerwd] = useState("");

    // W---SHOES
    const [pricesh, setPricesh] = useState("");
    const [quantitysh, setQuantitysh] = useState("");
    const [workersh, setWorkersh] = useState("");

    const params = useParams();

    const [next_view, setNext_view] = useState(0);
    const [sh, setSh] = useState("");
    const [m_tshirt, setMt_shirt] = useState("");
    const [w_tshirt, setWt_shirt] = useState("");
    const [mj, setMj] = useState("");
    const [wj, setWj] = useState("");
    const [wd, setWd] = useState("");

    const menT = () => m_tshirt === "" ? setMt_shirt("choose") : setMt_shirt("");
    const wT = () => w_tshirt === "" ? setWt_shirt("choose") : setWt_shirt("");
    const mJK = () => mj === "" ? setMj("choose") : setMj("");
    const wJK = () => wj === "" ? setWj("choose") : setWj("");
    const wDS = () => wd === "" ? setWd("choose") : setWd("");
    const Shoes = () => sh === "" ? setSh("choose") : setSh("");

    const query_close = () => {
        jQuery(".cancel").on("click", function () {
            jQuery(".add_box.add_deal").fadeOut();
        });
    }
    let bodydata = [];
    const send_array = async () => {
        if (m_tshirt === "choose") {
            const dealdt = {
                "measurement": `L - ${lenmt}, W - ${wmt}, HPS - ${hpsmt}, THIGH - ${thighmt}, KNEE - ${kneemt}, ANKLE - ${anklemt}, FLYS - ${flysmt}`,
                "category": "Men Trouser",
                "quantity": quantitymt,
                "price": pricemt,
                "the_worker": workermt
            };
            bodydata.push(dealdt);
        }
        if (w_tshirt === "choose") {
            const dealdt = {
                "measurement": `L - ${lenw}, W - ${ww}, HPS - ${hpsw}, THIGH - ${thighw}, KNEE - ${kneew}, ANKLE - ${anklew}, FLYS - ${flysw}`,
                "category": "Women Trouser",
                "quantity": quantityw,
                "price": pricew,
                "the_worker": workerw
            };
            bodydata.push(dealdt);
        }
        if (mj === "choose") {
            const dealdt = {
                "measurement": `L - ${lenm}, B - ${bm}, W - ${wm}, HPS - ${hpsm}, BACK - ${backm}, BG - ${bgm}, AMPITY - ${amptym}, L SLVS - ${lsm}, S SLVS - ${ssm}`,
                "category": "Men Jacket",
                "quantity": quantitym,
                "price": pricem,
                "the_worker": workerm
            };
            bodydata.push(dealdt);
        }
        if (wj === "choose") {
            const dealdt = {
                "measurement": `L - ${lenwb}, CHU - ${chuwb}, U CHU - ${uchuwb}, HALF - ${halfwb}, B - ${bwb}, UW - ${uwwb}, MW - ${mwwb}, HPS - ${hpswb}, SHOULDER-  ${shoulderwb}, BACK - ${backwb}, AMPITY - ${amptywb}, L SLVS - ${lswb}, S SLVS - ${sswb}`,
                "category": "Women Jacket",
                "quantity": quantitywb,
                "price": pricewb,
                "the_worker": workerwb
            };
            bodydata.push(dealdt);
        }
        if (wd === "choose") {
            const dealdt = {
                "measurement": `L - ${lenwd}, B - ${bwd}, W - ${wwd}, HPS - ${hpswd}, KNEE - ${kneewd}, HALF - ${halfwd}, K - ${kwd}`,
                "category": "Women Dress",
                "quantity": quantitywd,
                "price": pricewd,
                "the_worker": workerwd
            };
            bodydata.push(dealdt);
        }
        if (sh === "choose") {
            const dealdt = {
                "measurement": `No Measurements`,
                "category": "SHOES",
                "quantity": quantitysh,
                "price": pricesh,
                "the_worker": workersh
            };
            bodydata.push(dealdt);
        }
        // try {
        const employee = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);

        if (employee.data.status === "200") {
            const deal_assets = {
                "main_data": {
                    title: fname,
                    description: lname,
                    requirements: requirements,
                    pay_status: dstatus !== "" ? dstatus : "PENDING",
                    deal_tracking: tracks !== "" ? tracks : "WAITING",
                    registered_by: employee.data.employee[0].employeeID,
                    customer: unique
                },
                "resp": bodydata
            }

            // const respn = await axios.post(`${baseURL}manydeal.php`, deal_assets);
            const respn = await axios.request({
                method: "POST",
                url: `${baseURL}manydeal.php`,
                data: JSON.stringify(deal_assets)
            }).catch(function (error) {
                console.log("Axios Error:", error.message);
            });
            console.log(respn.data);
            if (respn.data !== undefined && respn.data.status === "200") {
                const getall = async () => {
                    const response = await axios.get(`${baseURL}onecustomer.php?id=${params.id}`);
                    setContents(response.data.customer[0]);
                    const deals = await axios.get(`${baseURL}dealforone.php?customer=${response.data.customer[0].customerUnique}&employee=${response.data.customer[0].registeredBy}`);
                    window.localStorage.setItem("UNIQUE_ID", response.data.customer[0].customerUnique);
                    setWorks(deals.data.deals);
                    for (let index = 0; index < deals.data.deals.length; index++) {
                        if (index < deals.data.deals.length - 1) {
                            setOnecount(Number(deals.data.deals[index].price) + Number(deals.data.deals[index + 1].price));
                        } else if (deals.data.deals.length === 1) {
                            setOnecount(Number(deals.data.deals[index].price));
                        }

                    }
                    setCount(deals.data.counter);
                    jQuery(".add_box.add_deal").fadeOut();
                }

                getall();
            }
        }
        // } catch (error) {
        //     console.log("ERROR",error.message);
        // }
        bodydata = [];
    }
    const the_workers = async () => {
        const get__worker = await axios.get(`${baseURL}worker.php`);
        setWorkers(get__worker.data.workers);
    }
    useEffect(() => { query_close(); the_workers(); }, []);

    return (
        <div>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel">
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                {
                    next_view === 0 ?
                        <div className="container">
                            <div className="title">
                                <h3><span>Choose the Point</span></h3>
                            </div>
                            <div className={`preview p2 ${mj}`} onClick={mJK}>
                                <div className="title">
                                    <h4><span>Men Jacket</span></h4>
                                    <span className="small comment desc">
                                        L | B | W | HPS | BG | BACK | AMPITY | LSLEEVES | SLEEVES
                                    </span>
                                </div>
                            </div>

                            <div className={`preview p2 ${m_tshirt}`} onClick={menT}>
                                <div className="title">
                                    <h4><span>Men Trouser</span></h4>
                                    <span className="small comment desc">
                                        L | W | HPS | THIGH | KNEE | ANKLE | FLYS
                                    </span>
                                </div>
                            </div>

                            <div className={`preview p2 ${wj}`} onClick={wJK}>
                                <div className="title">
                                    <h4><span>Women Blouse/Jacket</span></h4>
                                    <span className="small comment desc" style={{ fontSize: 'x-small' }}>
                                        {(" L | CHU | U CHU | HALF | B | UW | MW | HPS | SHOULDER | BACK | AMPITY | LONG/SHORT SLEEVES").substring(0, 50)}...
                                    </span>
                                </div>
                            </div>

                            <div className={`preview p2 ${w_tshirt}`} onClick={wT}>
                                <div className="title">
                                    <h4><span>Women Skirt/Trouser</span></h4>
                                    <span className="small comment desc">
                                        L | W | HPS | THIGH | KNEE | ANKLE | FLYS
                                    </span>
                                </div>
                            </div>

                            <div className={`preview p2 ${wd}`} onClick={wDS}>
                                <div className="title">
                                    <h4><span>Women Dress</span></h4>
                                    <span className="small comment desc">
                                        L | B | W | HPS | KNEE | HALF | K
                                    </span>
                                </div>
                            </div>
                            <div className={`preview p2 ${sh}`} onClick={Shoes}>
                                <div className="title">
                                    <h4><span>SHOES</span></h4>
                                    <span className="small comment desc">
                                        QUANTITY & PRICE
                                    </span>
                                </div>
                            </div>


                            <div className="button">
                                <button id="bottonGet" onClick={() => setTask(0)}>
                                    <div className="bn2"></div>
                                    <div className="bn1">
                                        <span className="small">
                                            <i className="bi bi-chevron-double-left"></i> Back
                                        </span>
                                    </div>
                                </button>
                                <button id="bottonGet" onClick={() => setNext_view(1)}>
                                    <div className="bn2"></div>
                                    <div className="bn1">
                                        <span className="small">
                                            <i className="bi bi-chevron-double-right"></i> next
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div> : next_view === 1 ?
                            <div className="multi_bx">


                                {/* M----JACKET */}
                                <div className="container" style={{ display: `${mj === "" ? "none" : "block"}` }}>
                                    <div className="title">
                                        <h3><span>Men Jacket</span></h3>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="L" name="l" value={lenm}
                                            onChange={(e) => setLenm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                                        <div className="small text-center">{lenm?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="B" name="b" value={bm}
                                            onChange={(e) => setBm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{bm?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="W" name="lName" value={wm}
                                            onChange={(e) => setWm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{wm?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="HPS" name="fname" value={hpsm}
                                            onChange={(e) => setHpsm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                                        <div className="small text-center">{hpsm?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="BG" name="fname" value={bgm}
                                            onChange={(e) => setBgm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                                        <div className="small text-center">{bgm?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="BACK" name="lName" value={backm}
                                            onChange={(e) => setBackm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{backm?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">

                                        <input type="text" placeholder="AMPITY" name="lName" value={amptym}
                                            onChange={(e) => setAmptym(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{amptym?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="L SLEEVES" name="fname" value={lsm}
                                            onChange={(e) => setLsm(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                                        <div className="small text-center">{lsm?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <input type="text" placeholder="S SLEEVES" name="Quantity" value={ssm}
                                        onChange={(e) => setSsm(e.target.value)}
                                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                                    <div className="small text-center">{ssm?.length < 1 ? "Fill this field" : ""}</div>
                                    <div className="flex">

                                        <input type="text" placeholder="PRICE" name="lName" value={pricem}
                                            onChange={(e) => setPricem(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", border: `1px solid ${pricem?.length < 1 ? "red" : "black"}` }} />

                                        <input type="text" placeholder="QUANTITY" name="fname" value={quantitym}
                                            onChange={(e) => setQuantitym(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px', border: `1px solid ${quantitym?.length < 1 ? "red" : "black"}` }} />
                                    </div>
                                    <select name="worker" id="" onChange={(e) => setWorkerm(e.target.value)}>
                                        <option value={"null"}>Select Worker</option>
                                        {
                                            workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>) : "Loading..."
                                        }
                                    </select>

                                </div>


                                {/* M-----------TROUSER */}
                                <div className="container" style={{ display: `${m_tshirt === "" ? "none" : "block"}` }}>
                                    <div className="title">
                                        <h3><span>Men Trouser</span></h3>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="L" name="l" value={lenmt}
                                            onChange={(e) => setLenmt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                                        <div className="small text-center">{lenmt?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="W" name="w" value={wmt}
                                            onChange={(e) => setWmt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{wmt?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="HPS" name="hps" value={hpsmt}
                                            onChange={(e) => setHpsmt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{hpsmt?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="THIGH" name="thigh" value={thighmt}
                                            onChange={(e) => setThighmt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                                        <div className="small text-center">{thighmt?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="KNEE" name="knee" value={kneemt}
                                            onChange={(e) => setKneemt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                                        <div className="small text-center">{kneemt?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="ANKLE" name="ankle" value={anklemt}
                                            onChange={(e) => setAnklemt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{anklemt?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <input type="text" placeholder="FLYS" name="flys" value={flysmt}
                                        onChange={(e) => setFlysmt(e.target.value)}
                                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                                    <div className="small text-center">{flysmt?.length < 1 ? "Fill this field" : ""}</div>
                                    <div className="flex">

                                        <input type="text" placeholder="PRICE" name="lName" value={pricemt}
                                            onChange={(e) => setPricemt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", border: `1px solid ${pricemt?.length < 1 ? "red" : "black"}` }} />

                                        <input type="text" placeholder="QUANTITY" name="fname" value={quantitymt}
                                            onChange={(e) => setQuantitymt(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px', border: `1px solid ${quantitymt?.length < 1 ? "red" : "black"}` }} />
                                    </div>
                                    <select name="worker" id="" onChange={(e) => setWorkermt(e.target.value)}>
                                        <option value={"null"}>Select Worker</option>
                                        {
                                            workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>) : "Loading..."
                                        }
                                    </select>
                                </div>



                                {/* W-----------Jacket */}
                                <div className="container" style={{ display: `${wj === "" ? "none" : "block"}` }}>
                                    <div className="title">
                                        <h3><span>Women Jacket/Blouse</span></h3>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="L" name="l" value={lenwb}
                                            onChange={(e) => setLenwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{lenwb?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="CHU" name="chu" value={chuwb}
                                            onChange={(e) => setChuwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                                        <div className="small text-center">{chuwb?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="U CHU" name="uchu" value={uchuwb}
                                            onChange={(e) => setUchuwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                                        <div className="small text-center">{uchuwb?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="HALF" name="half" value={halfwb}
                                            onChange={(e) => setHalfwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{halfwb?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="B" name="b" value={bwb}
                                            onChange={(e) => setBwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{bwb?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="UW" name="uw" value={uwwb}
                                            onChange={(e) => setUwwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                                        <div className="small text-center">{uwwb?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="MW" name="mw" value={mwwb}
                                            onChange={(e) => setMwwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                                        <div className="small text-center">{mwwb?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="HPS" name="hps" value={hpswb}
                                            onChange={(e) => setHpswb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{hpswb?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="SHOULDER" name="shoulder" value={shoulderwb}
                                            onChange={(e) => setShoulderwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{shoulderwb?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="BACK" name="back" value={backwb}
                                            onChange={(e) => setBackwb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                                        <div className="small text-center">{backwb?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="AMPITY" name="ampity" value={amptywb}
                                            onChange={(e) => setAmptywb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                                        <div className="small text-center">{amptywb?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="LONG SLEEVES" name="ls" value={lswb}
                                            onChange={(e) => setLswb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{lswb?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <input type="text" placeholder="SHORT SLEEVES" name="ss" value={sswb}
                                        onChange={(e) => setSswb(e.target.value)}
                                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                                    <div className="small text-center">{sswb?.length < 1 ? "Fill this field" : ""}</div>
                                    <div className="flex">

                                        <input type="text" placeholder="PRICE" name="lName" value={pricewb}
                                            onChange={(e) => setPricewb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", border: `1px solid ${pricewb?.length < 1 ? "red" : "black"}` }} />

                                        <input type="text" placeholder="QUANTITY" name="fname" value={quantitywb}
                                            onChange={(e) => setQuantitywb(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px', border: `1px solid ${quantitywb?.length < 1 ? "red" : "black"}` }} />
                                    </div>
                                    <select name="worker" id="" onChange={(e) => setWorkerwb(e.target.value)}>
                                        <option value={"null"}>Select Worker</option>
                                        {
                                            workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>) : "Loading..."
                                        }
                                    </select>
                                </div>



                                {/*W-----TROUSER */}
                                <div className="container" style={{ display: `${w_tshirt === "" ? "none" : "block"}` }}>
                                    <div className="title">
                                        <h3><span>Women Trouser/Skirt</span></h3>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="L" name="l" value={lenw}
                                            onChange={(e) => setLenw(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                                        <div className="small text-center">{lenw?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="W" name="w" value={ww}
                                            onChange={(e) => setWw(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{ww?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="HPS" name="hps" value={hpsw}
                                            onChange={(e) => setHpsw(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{hpsw?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="THIGH" name="thigh" value={thighw}
                                            onChange={(e) => setThighw(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '160px' }} />
                                        <div className="small text-center">{thighw?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="KNEE" name="knee" value={kneew}
                                            onChange={(e) => setKneew(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '170px' }} />
                                        <div className="small text-center">{kneew?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="ANKLE" name="ankle" value={anklew}
                                            onChange={(e) => setAnklew(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{anklew?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <input type="text" placeholder="FLYS" name="flys" value={flysw}
                                        onChange={(e) => setFlysw(e.target.value)}
                                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                                    <div className="small text-center">{flysw?.length < 1 ? "Fill this field" : ""}</div>
                                    <div className="flex">

                                        <input type="text" placeholder="PRICE" name="lName" value={pricew}
                                            onChange={(e) => setPricew(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", border: `1px solid ${pricew?.length < 1 ? "red" : "black"}` }} />

                                        <input type="text" placeholder="QUANTITY" name="fname" value={quantityw}
                                            onChange={(e) => setQuantityw(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px', border: `1px solid ${quantityw?.length < 1 ? "red" : "black"}` }} />
                                    </div>
                                    <select name="worker" id="" onChange={(e) => setWorkerw(e.target.value)}>
                                        <option value={"null"}>Select Worker</option>
                                        {
                                            workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>) : "Loading..."
                                        }
                                    </select>
                                </div>



                                {/* W------DRESS*/}
                                <div className="container" style={{ display: `${wd === "" ? "none" : "block"}` }}>
                                    <div className="title">
                                        <h3><span>Women Dress</span></h3>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="L" name="l" value={lenwd}
                                            onChange={(e) => setLenwd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{lenwd?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="B" name="b" value={bwd}
                                            onChange={(e) => setBwd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{bwd?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="W" name="w" value={wwd}
                                            onChange={(e) => setWwd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{wwd?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="HPS" name="hps" value={hpswd}
                                            onChange={(e) => setHpswd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{hpswd?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="KNEE" name="knee" value={kneewd}
                                            onChange={(e) => setKneewd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{kneewd?.length < 1 ? "Fill this field" : ""}</div>
                                        <input type="text" placeholder="HALF" name="half" value={halfwd}
                                            onChange={(e) => setHalfwd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                                        <div className="small text-center">{halfwd?.length < 1 ? "Fill this field" : ""}</div>
                                    </div>
                                    <input type="text" placeholder="K" name="k" value={kwd}
                                        onChange={(e) => setKwd(e.target.value)}
                                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                                    <div className="small text-center">{kwd?.length < 1 ? "Fill this field" : ""}</div>
                                    <div className="flex">
                                        <input type="text" placeholder="PRICE" name="lName" value={pricewd}
                                            onChange={(e) => setPricewd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", border: `1px solid ${pricewd?.length < 1 ? "red" : "black"}` }} />

                                        <input type="text" placeholder="QUANTITY" name="fname" value={quantitywd}
                                            onChange={(e) => setQuantitywd(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px', border: `1px solid ${quantitywd?.length < 1 ? "red" : "black"}` }} />
                                    </div>
                                    <select name="worker" id="" onChange={(e) => setWorkerwd(e.target.value)}>
                                        <option value={"null"}>Select Worker</option>
                                        {
                                            workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>) : "Loading..."
                                        }
                                    </select>
                                </div>

                                {/* SHOES*/}
                                <div className="container" style={{ display: `${sh === "" ? "none" : "block"}` }}>
                                    <div className="title">
                                        <h3><span>SHOES</span></h3>
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="PRICE" name="lName" value={pricesh}
                                            onChange={(e) => setPricesh(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", border: `1px solid ${pricesh?.length < 1 ? "red" : "black"}` }} />

                                        <input type="text" placeholder="QUANTITY" name="fname" value={quantitysh}
                                            onChange={(e) => setQuantitysh(e.target.value)}
                                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px', border: `1px solid ${quantitysh?.length < 1 ? "red" : "black"}` }} />
                                    </div>
                                    <select name="worker" id="" onChange={(e) => setWorkersh(e.target.value)}>
                                        <option value={"null"}>Select Worker</option>
                                        {
                                            workers !== undefined && workers?.length > 0 ? workers.map((w, k) => <option value={w.workerName} key={k}>{w.workerName}</option>) : "Loading..."
                                        }
                                    </select>
                                </div>
                                <div className="button">
                                    <button id="bottonGet" onClick={() => setNext_view(0)}>
                                    <div className="bn2"></div>
                                    <div className="bn1">
                                        <span className="small">
                                            <i className="bi bi-chevron-double-left"></i> Back
                                        </span>
                                    </div>
                                </button>
                                    <button onClick={send_array}>
                                    <div className="bn2"></div>
                                    <div className="bn1">
                                        <span className="small">
                                            <i className="bi bi-chevron-double-down"></i> Complete
                                        </span>
                                    </div>
                                </button>
                                </div>
                            </div>
                            : <Loading />
                }
            </div>
        </div>
    )
}

export default Multiple;