import axios from 'axios';
import React, { useEffect, useState } from 'react'
import jQuery from 'jquery';
import { baseURL } from '../../../baseURL';

const Update = ({ setEmployee }) => {
    // const {employeeid2, employeefirst2,employeelast2,employeeemail2,employeeContact,registedDate} = employee;
    let store = window.localStorage;
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

    const addNew = async (PATH) => {
        let formdata = new FormData();
            formdata.append("fname", fname === "" && store.first2 ? store.first2 : fname);
            formdata.append("lname", lname === "" && store.last2 ? store.last2 : lname);
            formdata.append("address", address === "" && store.add2 ? store.add2 : address);
            formdata.append("phone", phone === "" && store.phone2 ? store.phone2 : phone);
            formdata.append("mail", mail === "" && store.email2 ? store.email2 : mail);
            formdata.append("codes", codes);
            formdata.append("id", store.id2 ? store.id2 : 0);

        let bodyContent = formdata;

        let reqOptions = {
            url: PATH,
            method: "POST",
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        setStatus(response.data.status);
    }
    const jqueries = () => {
        store.clear(); setAddress(""); setCodes(""); setFname(""); setMail(""); setPhone(""); setLname("");
    }
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
        if (fname.length >= 4 && lname.length >= 4 && mail.length >= 10 && phone.match(/[\d+]/g) && address.length >= 10) {
            addNew(`${baseURL}updtodelc.php`);
            switch (status) {
                case '404':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'blue' }}>No Existing User!</span>);
                    break;
                case '200':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'green' }}>Successiful!</span>);
                    store.clear(); setAddress(""); setCodes(""); setFname(""); setMail(""); setPhone(""); setLname("");
                    jQuery(".rename_box").fadeOut({
                        duration: 1000
                    });
                    break;
                default:
                    console.log(status);
                    break;
            }
            const getall = async () => {
                const response = await axios.get(`${baseURL}customers.php`);
                setEmployee(response.data.customers);
            }
            getall();

        }

    }
    return (
        <div className="rename_box" style={{ display: "none" }}>
            <div className="rename" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="container">
                    <input type="text" placeholder="Customer First Name" name="fname" value={fname === "" && store.first2 ? store.first2 : fname}
                        onChange={(e) => setFname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{fVname}</div>
                    <input type="text" placeholder="Customer Last Name" name="lName" value={lname === "" && store.last2 ? store.last2 : lname}
                        onChange={(e) => setLname(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{lVname}</div>
                    <input type="text" placeholder="Customer Email" name="email2" value={mail === "" && store.email2 ? store.email2 : mail}
                        onChange={(e) => setMail(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{mVail}</div>
                    <input type="text" placeholder="Customer Contact " name="contact" value={phone === "" && store.phone2 ? store.phone2 : phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{pVhone}</div>
                    <input type="text" placeholder="Customer Address " name="selling" value={address === "" && store.add2 ? store.add2 : address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ marginTop: "5px", marginBottom: "5px" }} />
                    <div className="small text-center">{aVddress}</div>

                    <div className="button">
                        <button id2="bottonGet" onClick={handleupdate}>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update;