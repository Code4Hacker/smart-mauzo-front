import React, { useEffect, useState } from 'react';
// import useEmployee from '../../customerHooks/useEmployee';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ setEmployee }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [codes, setCodes] = useState("");
    const [status, setStatus] = useState();
    const navigate = useNavigate();
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
        setStatus(response.data.status);
    }
    // useEffect(() => {
    // }, [PATH,fname,lname,address,phone,mail,codes]);
    const handlepost = () => {
        addNew("http://localhost/tailor_backend/employee.php");
        switch(status){
            case '400':
                console.log("user Exist");
                break;
            case '200':
                console.log("new User");
                navigate('/employees');
                break;
            default:
                console.log(status);
                break;
        }
        const getall = async() => {
            const response = await axios.get("http://localhost/tailor_backend/employee.php");
            setEmployee(response.data.employees);
        }
        getall();
    }
  return (
    <div className="add_box" style={{display: "none"}}>
                <div className="update" style={{padding: "2px"}}>
                    <div className="cancel">
                        <button><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div className="container">
                        <input type="text" placeholder="Employee First Name" name="fname" value={fname}
                        onChange={(e) => setFname(e.target.value)}
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div>
                        <input type="text" placeholder="Employee Last Name" name="lName" value={lname}
                        onChange={(e) => setLname(e.target.value)}
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div>
                        <input type="text" placeholder="Employee Email" name="email" value={mail}
                        onChange={(e) => setMail(e.target.value)}
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div>
                        <input type="text" placeholder="Employee Contact " name="contact" value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div>
                        <input type="text" placeholder="Employee Passcode " name="expire" value={codes}
                        onChange={(e) => setCodes(e.target.value)}
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div>
                        <input type="text" placeholder="Address " name="selling" value={address}
                        onChange={(e) => setAddress(e.target.value)}
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div>
                        {/*
                        <input type="text" placeholder="Buying Price " name="buying"
                            style={{marginTop: "5px",marginBottom: "5px"}} />
                        <div className=""></div> */}

                        <div className="button">
                            <button id="bottonGet" onClick={handlepost}>Complete</button>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default AddEmployee;