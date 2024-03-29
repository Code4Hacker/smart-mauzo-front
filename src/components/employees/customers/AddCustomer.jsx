import React, { useEffect, useState } from 'react';
// import useCustomer from '../../customerHooks/useCustomer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../baseURL';
import jQuery from 'jquery';
import { GeminiNotification } from '../../Notification';

const AddCustomers = ({ setCustomers }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [photo, setPhoto] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [regId, setRegId] = useState("");
    const [fVname, setFVname] = useState("");
    const [lVname, setLVname] = useState("");
    const [aVddress, setAVddress] = useState("");
    const [pVhone, setPVhone] = useState("");
    const [mVail, setMVail] = useState("");
    const [status, setStatus] = useState();


    const jqueries = () => {
        jQuery(".add_box.cmt").fadeOut({ duration: 20 });
        setAddress(""); setFname(""); setMail(""); setPhone(""); setLname("");
    }
    const getall = async () => {
        const response = await axios.get(`${baseURL}employeeid.php?id=${localStorage.emMail != undefined ? localStorage.emMail : 0}`);
        setCustomers(response.data.customers);
    }
    const addNew = async (PATH) => {
        const respons = await axios.get(`${baseURL}e_log.php?employee_id=${window.localStorage.emMail}`);

        if (respons.data.status === "200") {
            setRegId(respons.data.employee[0].employeeID);
        }
        let formdata = new FormData();
        formdata.append("fname", fname);
        formdata.append("lname", lname);
        formdata.append("address", address);
        formdata.append("phone", phone.replace("+", ""));
        formdata.append("mail", mail);
        formdata.append("registered", respons.data.employee[0].employeeID);
        formdata.append("photo", photo);

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
            let file = photo;
            if (file !== "") {
                let filereader = new FileReader();
                filereader.onload = function () {
                    GeminiNotification("New Customer Uploaded!", `\nThanks for contribution Customer ${fname + " " + lname}, Added Successful!`, this.result);
                }
                filereader.readAsDataURL(file);
            } else {
                GeminiNotification("New Customer Uploaded!", `\nThanks for contribution Customer ${fname + " " + lname}, Added Successful!`, "");
            }
            jqueries();
            getall();
        }
    }
    const handleupdate = async () => {
        fname.length < 1 ?
            setFVname(<span style={{ color: 'red' }}>Too Small!</span>) :
            setFVname(<span style={{ color: 'orange' }}></span>);
        lname.length < 1 ?
            setLVname(<span style={{ color: 'red' }}>Too Small!</span>) :
            setLVname(<span style={{ color: 'orange' }}></span>);
        phone.length < 10 || phone.match(/[a-z]/g) ?
            setPVhone(<span style={{ color: 'red' }}>Phone Number Not Valid!</span>) :
            setPVhone(<span style={{ color: 'orange' }}></span>);
        address.length < 1 ?
            setAVddress(<span style={{ color: 'red' }}>Address is not Valid!</span>) :
            setAVddress(<span style={{ color: 'orange' }}></span>);
        // !codes.match(/[0-9]/g) ?
        //     setCVodes(<span style={{ color: 'red' }}>Unique code should contain numbers too!</span>) :
        //     setCVodes(<span style={{ color: 'orange' }}></span>);
        if (fname.length >= 1 && lname.length >= 1 && (phone.length >= 10 || phone.match(/[\d+]/g)) && address.length >= 1) {
            addNew(`${baseURL}customers.php`);
            switch (status) {
                case "400":
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'blue' }}>Please Try to Resubmit if no Data on the table!</span>);
                    const respons = await axios.get(`${baseURL}employeeid.php?id=${localStorage.emMail != undefined ? localStorage.emMail : 0}`);
                    setCustomers(respons.data.customers);
                    alert("Please, Submit again to Confirm!");
                    getall();
                    jqueries();
                    getall();

                    break;
                case "200":
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'green' }}>New Customer Added!</span>);
                    const respone = await axios.get(`${baseURL}employeeid.php?id=${localStorage.emMail != undefined ? localStorage.emMail : 0}`);
                    setCustomers(respone.data.customers);
                    getall();
                    jqueries();
                    getall();

                    break;
                default:
                    break;
            }
            getall();
        }

    }
    const getPhoto = () => {
        document.getElementById("profilePic").click();
    }
    return (
        <div className="add_box cmt" style={{ display: "none" }}>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="container">
                    <div className="flex">
                        <input type="text" placeholder="Customer First Name" name="fname" value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                        <div className="small text-center">{fVname}</div>
                        <input type="text" placeholder="Customer Last Name" name="lName" value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                        <div className="small text-center">{lVname}</div>
                    </div>
                    <input type="text" placeholder="Email, OPTIONAL" name="email" value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <input type="text" placeholder="Customer Contact " name="contact" value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{pVhone}</div>
                    <input type="text" placeholder="Address " name="address" value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{aVddress}</div>

                    <div className='preview' onClick={getPhoto}>
                        <div className="title">
                            <input type="file" name="" id="profilePic" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                            <h4><span>SELECT IMAGE</span></h4>
                        </div>
                    </div>


                    <div className="button">
                        <button id="bottonGt" onClick={handleupdate}>
                            <div className="bn2"></div>
                            <div className="bn1"><span className="small">Complete</span></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCustomers;