import axios from 'axios';
import React, { useEffect, useState } from 'react'
import jQuery from 'jquery';
import { useNavigate } from 'react-router-dom';

const Update = ({ setEmployee }) => {
    // const {employeeID, employeeFirst,employeeLast,employeeEmail,employeeContact,registedDate} = employee;
    let store = window.localStorage;
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [codes, setCodes] = useState("");
    const [status, setStatus] = useState();
    const addNew = async (PATH) => {
        let jsonpatch = JSON.stringify({ 
            "fname":fname === "" && store.first ? store.first : fname,
            "lname":lname === "" && store.last ? store.last : lname,
            "address":address === "" && store.add ? store.add : address,
            "phone":phone === "" && store.phone ? store.phone : phone,
            "mail":mail === "" && store.email ? store.email : mail,
            "codes":codes,
            "id": store.id ? store.id : 0
          });

        let bodyContent = jsonpatch;

        let reqOptions = {
            url: PATH,
            method: "PATCH",
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        setStatus(response.data.status);
    }
    // useEffect(() => {
    // }, [PATH,fname,lname,address,phone,mail,codes]);
    const handlepost = () => {
        addNew("http://localhost/tailor_backend/employee.php");
        switch (status) {
            case '404':
                console.log("No User Exist");
                break;
            case '200':
                console.log("new User");
                store.clear();setAddress("");setCodes("");setFname("");setMail("");setPhone("");setLname("");
                jQuery(".rename_box").fadeOut({
                    duration:1000
                });
                break;
            default:
                console.log(status);
                break;
        }
        const getall = async () => {
            const response = await axios.get("http://localhost/tailor_backend/employee.php");
            setEmployee(response.data.employees);
        }
        getall();

    }
    const jqueries = () => {
        store.clear();setAddress("");setCodes("");setFname("");setMail("");setPhone("");setLname("");
    }
    return (
        <div className="rename_box" style={{ display: "none" }}>
            <div className="rename" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="container">
                    <input type="text" placeholder="Employee First Name" name="fname" value={fname === "" && store.first ? store.first : fname}
                        onChange={(e) => setFname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee Last Name" name="lName" value={lname === "" && store.last ? store.last : lname}
                        onChange={(e) => setLname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee Email" name="email" value={mail === "" && store.email ? store.email : mail}
                        onChange={(e) => setMail(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee Contact " name="contact" value={phone === "" && store.phone ? store.phone : phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee Passcode " name="expire" value={codes}
                        onChange={(e) => setCodes(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Address " name="selling" value={address === "" && store.add ? store.add : address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>

                    <div className="button">
                        <button id="bottonGet" onClick={handlepost}>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update;