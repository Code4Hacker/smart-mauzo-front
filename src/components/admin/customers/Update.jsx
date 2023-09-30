import axios from 'axios';
import React, { useEffect, useState } from 'react'
import jQuery from 'jquery';
import { useNavigate } from 'react-router-dom';

const Update = ({ setEmployee }) => {
    // const {employeeid2, employeefirst2,employeelast2,employeeemail2,employeeContact,registedDate} = employee;
    let store = window.localStorage;
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [codes, setCodes] = useState("");
    const [status, setStatus] = useState();
    const navigate = useNavigate();
    const addNew = async (PATH) => {
        let jsonpatch = JSON.stringify({ 
            "fname":fname === "" && store.first2 ? store.first2 : fname,
            "lname":lname === "" && store.last2 ? store.last2 : lname,
            "address":address === "" && store.add2 ? store.add2 : address,
            "phone":phone === "" && store.phone2 ? store.phone2: phone,
            "mail":mail === "" && store.email2 ? store.email2 : mail,
            "codes":codes,
            "id": store.id2 ? store.id2 : 0
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
        addNew("https://tailorgemini.000webhostapp.com/tailorwebapp/customers.php");
        switch (status) {
            case '404':
                console.log("No User Exist");
                break;
            case '200':
                console.log("Update");
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
            const response = await axios.get("https://tailorgemini.000webhostapp.com/tailorwebapp/customers.php");
            setEmployee(response.data.customers);
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
                    <input type="text" placeholder="Employee first2 Name" name="fname" value={fname === "" && store.first2 ? store.first2 : fname}
                        onChange={(e) => setFname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee last2 Name" name="lName" value={lname === "" && store.last2 ? store.last2 : lname}
                        onChange={(e) => setLname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee email2" name="email2" value={mail === "" && store.email2 ? store.email2 : mail}
                        onChange={(e) => setMail(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Employee Contact " name="contact" value={phone === "" && store.phone2 ? store.phone2 : phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>
                    <input type="text" placeholder="Address " name="selling" value={address === "" && store.add2 ? store.add2 : address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className=""></div>

                    <div className="button">
                        <button id2="bottonGet" onClick={handlepost}>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update;