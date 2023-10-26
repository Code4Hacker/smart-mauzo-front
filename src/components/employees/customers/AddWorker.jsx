import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import jQuery from 'jquery';
import { GeminiNotification } from '../../Notification';

const AddWorker = ({ setContents }) => {
    const [fullname, setFullname] = useState("");
    const [regId, setRegId] = useState("");
    const [fullVname, setFullVname] = useState("");
    const [status, setStatus] = useState();


    const jqueries = () => {
        jQuery(".add_box.cmt").fadeOut({ duration: 500 });
        setFullname(""); setFullVname("");
    }
    const getall = async () => {
        const response = await axios.get(`${baseURL}worker.php`);
        setContents(response.data.workers);
    }
    const addNew = async (PATH) => {
        let formdata = new FormData();
        formdata.append("fullname", fullname);

        let bodyContent = formdata;

        let reqOptions = {
            url: PATH,
            method: "POST",
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        // console.log(response.data);
        setStatus(response.data.status);
        if (response.data.status === "200") {
            const respons = await axios.get(`${baseURL}worker.php`);
            setContents(respons.data.workers);
            GeminiNotification("New Worker Uploaded!", `\nThanks for contribution Worker ${fullname}, Added Successful!`, "");
            jqueries();
            getall();
        }
    }
    const handleupdate = async () => {
        const response = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);

        if (response.data.status === "200") {
            setRegId(response.data.employee[0].employeeID);
        }
        addNew(`${baseURL}addworker.php`);
        switch (status) {
            case "400":
                const response = await axios.get(`${baseURL}worker.php`);
                setContents(response.data.workers);
                alert("Please, Submit again to Confirm!");
                getall();
                jqueries();
                getall();

                break;
            case "200":
                const respons = await axios.get(`${baseURL}worker.php`);
                setContents(respons.data.workers);
                getall();
                jqueries();
                getall();

                break;
            default:
                break;
        }
        getall();
    }
    return (
        <div className="add_box cmt" style={{ display: "none" }}>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="container">
                    <input type="text" placeholder="Full Name" name="fname" value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{fullVname}</div>


                    <div className="button">
                        <button id="bottonGt text-center" onClick={handleupdate}>
                            <div className="bn2"></div>
                            <div className="bn1">Add Worker</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWorker;