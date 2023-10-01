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
    const [fVname, setFVname] = useState("");
    const [lVname, setLVname] = useState("");
    const [aVddress, setAVddress] = useState("");
    const [pVhone, setPVhone] = useState("");
    const [mVail, setMVail] = useState("");
    const [cVodes, setCVodes] = useState("");
    const [status, setStatus] = useState();
    const navigate = useNavigate();
    const jqueries = () => {
        store.clear(); setAddress(""); setCodes(""); setFname(""); setMail(""); setPhone(""); setLname("");
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
        setStatus(response.data.status);
    }
    // useEffect(() => {
    // }, [PATH,fname,lname,address,phone,mail,codes]);    
    const handleupdate = () => {
        fname.length < 4 ?
            setFVname(<span style={{ color: 'red' }}>First Name is Too Small!</span>) :
            setFVname(<span style={{ color: 'orange' }}>Rule Followed Successiful!</span>);
        lname.length < 4 ?
            setLVname(<span style={{ color: 'red' }}>Last Name is Too Small!</span>) :
            setLVname(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        mail.length < 10 ?
            setMVail(<span style={{ color: 'red' }}>Email is Invalid!</span>) :
            setMVail(<span style={{ color: 'orange' }}>Rule Followed Successiful!</span>);
        phone.match(/[a-z]/g) ?
            setPVhone(<span style={{ color: 'red' }}>Phone Number Not Valid!</span>) :
            setPVhone(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        address.length < 10 ?
            setAVddress(<span style={{ color: 'red' }}>Address is not Valid!</span>) :
            setAVddress(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        !codes.match(/[0-9]/g) || codes.length < 8?
            setCVodes(<span style={{ color: 'red' }}>Strong Password Required!</span>) :
            setCVodes(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        if (fname.length >= 4 && lname.length >= 4 && mail.length >= 10 && phone.match(/[\d+]/g) && address.length >= 10 && (!codes.match(/[0-9]/g) || codes.length < 8)) {
            addNew("https://tailorgemini.000webhostapp.com/tailorwebapp/employee.php");
            switch (status) {
                case '400':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setCVodes(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'blue' }}>Sorry, User with this Email Exist!</span>);
                    break;
                case '200':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setCVodes(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'green' }}>New Employee Added!</span>);
                    break;
                default:
                    console.log(status);
                    break;
            }
            const getall = async () => {
                const response = await axios.get("https://tailorgemini.000webhostapp.com/tailorwebapp/employee.php");
                setEmployee(response.data.employees);
            }
            getall();
        }

    }
    return (
        <div className="add_box" style={{ display: "none" }}>
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
                        <button id="bottonGet" onClick={handleupdate}>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;