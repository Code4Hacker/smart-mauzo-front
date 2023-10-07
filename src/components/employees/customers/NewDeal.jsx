import React, { useEffect, useState } from 'react';
import jQuery from 'jquery';
import MenJacket from './MeasurementFields/MenJacket';
import MenTrouser from './MeasurementFields/MenTrouser';
import WomenBorJ from './MeasurementFields/WomenBorJ';
import WomenSorT from './MeasurementFields/WomenSorT';
import WomenDress from './MeasurementFields/WomenDress';

const NewDeal = ({ setCustomers }) => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [codes, setCodes] = useState("");
    const [fVname, setFVname] = useState("");
    const [lVname, setLVname] = useState("");
    const [aVddress, setAVddress] = useState("");
    const [pVhone, setPVhone] = useState("");
    const [mVail, setMVail] = useState("");
    const [cVodes, setCVodes] = useState("");
    const [status, setStatus] = useState();

    const [next_task, setNext_task] = useState(0);
    const [choice, setChoice] = useState("MenJacket");
    const previewSelect = () => {
        jQuery(".preview").on("click", function () {
            jQuery(".preview").removeClass("choose");
            jQuery(this).addClass("choose");
        });
    }
    const jqueries = () => {
        store.clear(); setAddress(""); setCodes(""); setFname(""); setMail(""); setPhone(""); setLname("");
    }
    // useEffect(() => { previewSelect(); }, []);
    previewSelect();
    return (
        <div className="add_box add_deal" style={{ display: "none" }}>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                {
                    next_task === 0 ?
                        <div className="container">
                            <input type="text" placeholder="Deal Title" name="fname" value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} />
                            <div className="small text-center">{fVname}</div>
                            <textarea type="text" placeholder="Deal Description" name="lName" value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} ></textarea>
                            <div className="small text-center">{lVname}</div>


                            <input type="text" placeholder="Quantity" name="Quantity" value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} />
                            <div className="small text-center">{mVail}</div>
                            <input type="text" placeholder="Price " name="price" value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} />
                            <div className="small text-center">{pVhone}</div>
                            {/* <input type="text" placeholder="Address " name="address" value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{aVddress}</div> */}
                            <textarea type="text" placeholder="Summarization" name="lName" value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} ></textarea>
                            <div className="small text-center">{lVname}</div>



                            <input type="text" placeholder="Customer Unique ID" name="unique" value={codes}
                                onChange={(e) => setCodes(e.target.value)}
                                style={{ marginTop: "5px", marginBottom: "5px" }} />
                            <div className="small text-center">{cVodes}</div>



                            <div className="button">
                                <button id="bottonGet" onClick={() => setNext_task(1)}><i className="bi bi-chevron-double-right"></i> next</button>
                            </div>
                        </div> : next_task === 1 ?
                            <div className="container">
                                <div className="title">
                                    <h3><span>Choose the Point</span></h3>
                                </div>
                                <div className="preview" onClick={() => setChoice("MenJacket")}>
                                    <div className="title">
                                        <h4><span>Men Jacket</span></h4>
                                        <span className="small comment desc">
                                            L | B | W | HPS | BG | BACK | AMPITY | LSLEEVES | SLEEVES
                                        </span>
                                    </div>
                                </div>

                                <div className="preview" onClick={() => setChoice("MenTrouser")}>
                                    <div className="title">
                                        <h4><span>Men Trouser</span></h4>
                                        <span className="small comment desc">
                                            L | W | HPS | THIGH | KNEE | ANKLE | FLYS
                                        </span>
                                    </div>
                                </div>

                                <div className="preview" onClick={() => setChoice("WomenBorJ")}>
                                    <div className="title">
                                        <h4><span>Women Blouse/Jacket</span></h4>
                                        <span className="small comment desc" style={{ fontSize: 'x-small' }}>
                                            {(" L | CHU | U CHU | HALF | B | UW | MW | HPS | SHOULDER | BACK | AMPITY | LONG/SHORT SLEEVES").substring(0, 50)}...
                                        </span>
                                    </div>
                                </div>

                                <div className="preview" onClick={() => setChoice("WomenSorT")}>
                                    <div className="title">
                                        <h4><span>Women Skirt/Trouser</span></h4>
                                        <span className="small comment desc">
                                            L | W | HPS | THIGH | KNEE | ANKLE | FLYS
                                        </span>
                                    </div>
                                </div>

                                <div className="preview" onClick={() => setChoice("WomenD")}>
                                    <div className="title">
                                        <h4><span>Women Dress</span></h4>
                                        <span className="small comment desc">
                                            L | DW | KNEE
                                        </span>
                                    </div>
                                </div>


                                <div className="button">
                                    <button id="bottonGet" onClick={() => setNext_task(0)}><i className="bi bi-chevron-double-left"></i> Back</button>
                                    <button id="bottonGet" onClick={() => setNext_task(2)}><i className="bi bi-chevron-double-right"></i> Next</button>
                                </div>
                            </div> : next_task === 2 ?
                                <div className="">
                                    {choice === "MenJacket" ? <MenJacket setTask={setNext_task} setCustomers={setCustomers} /> : choice === "MenTrouser" ? <MenTrouser setTask={setNext_task} setCustomers={setCustomers} /> : choice === "WomenBorJ" ? <WomenBorJ setTask={setNext_task} setCustomers={setCustomers} /> : choice === "WomenSorT" ? <WomenSorT setTask={setNext_task} setCustomers={setCustomers} /> : choice === "WomenD" ? <WomenDress setTask={setNext_task} setCustomers={setCustomers} /> : "No choice Selected"}
                                </div>
                                :
                                "Loading ..."
                }
            </div>
        </div>
    )
}

export default NewDeal;