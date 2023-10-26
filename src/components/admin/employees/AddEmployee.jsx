import React, { useEffect, useState } from 'react';
// import useEmployee from '../../customerHooks/useEmployee';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../baseURL';
import jQuery from 'jquery';

const AddEmployee = ({ setEmployee }) => {
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

    const jqueries = () => {
        jQuery(".add_box.adduser").fadeOut({ duration: 500 });
        setAddress(""); setCodes(""); setFname(""); setMail(""); setPhone(""); setLname("");
    }
    const addNew = async (PATH) => {
        let formdata = new FormData();
        formdata.append("fname", fname);
        formdata.append("lname", lname);
        formdata.append("address", address);
        formdata.append("phone", phone);
        formdata.append("mail", mail);
        formdata.append("codes", codes);

        let bodyContent = formdata;

        let reqOptions = {
            url: PATH,
            method: "POST",
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        if (response.data.status === "200") {
            jqueries();
            getall();
        }
        setStatus(response.data.status);
    }

    const getall = async () => {
        const response = await axios.get(`${baseURL}employee.php`);
        setEmployee(response.data.employees);
    }
    const handleupdate = () => {
        fname.length < 4 ?
            setFVname(<span style={{ color: 'red' }}>First Name is Too Small!</span>) :
            setFVname(<span style={{ color: 'orange' }}></span>);
        lname.length < 4 ?
            setLVname(<span style={{ color: 'red' }}>Last Name is Too Small!</span>) :
            setLVname(<span style={{ color: 'orange' }}></span>);
        mail.length < 10 ?
            setMVail(<span style={{ color: 'red' }}>Email is Invalid!</span>) :
            setMVail(<span style={{ color: 'orange' }}></span>);
        phone.match(/[a-z]/g) ?
            setPVhone(<span style={{ color: 'red' }}>Phone Number Not Valid!</span>) :
            setPVhone(<span style={{ color: 'orange' }}></span>);
        address.length < 10 ?
            setAVddress(<span style={{ color: 'red' }}>Address is not Valid!</span>) :
            setAVddress(<span style={{ color: 'orange' }}></span>);
        !codes.match(/[0-9]/g) || codes.length < 8 ?
            setCVodes(<span style={{ color: 'red' }}>Strong Password Required!</span>) :
            setCVodes(<span style={{ color: 'orange' }}></span>);
        if (fname.length >= 4 && lname.length >= 4 && mail.length >= 10 && phone.match(/[\d+]/g) && address.length >= 10 && (!codes.match(/[0-9]/g) || codes.length >= 8)) {
            addNew(`${baseURL}employee.php`);
            switch (status) {
                case '400':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setCVodes(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'blue' }}>Sorry, User with this Email Exist!</span>);
                    getall();
                    jqueries();
                    break;
                case '200':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setCVodes(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'green' }}>New Employee Added!</span>);
                    getall();
                    jqueries();
                    break;
                default:
                    break;
            }
            getall();
        }

    }
    return (
        <div className="add_box adduser" style={{ display: "none" }}>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="container">
                    <input type="text" placeholder="Employee First Name" name="fname" value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{fVname}</div>
                    <input type="text" placeholder="Employee Last Name" name="lName" value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{lVname}</div>
                    <input type="text" placeholder="Employee Email" name="email" value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{mVail}</div>
                    <input type="text" placeholder="Employee Contact " name="contact" value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{pVhone}</div>
                    <input type="text" placeholder="Employee Passcode " name="expire" value={codes}
                        onChange={(e) => setCodes(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{cVodes}</div>
                    <input type="text" placeholder="Address " name="selling" value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{aVddress}</div>

                    <div className="button">
                        <button id="bottonGet" onClick={handleupdate}>
                            <div className="bn2"></div>
                            <div className="bn1">
                                <span className="small">
                                    <i className="bi bi-chevron-double-down"></i> Complete
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;