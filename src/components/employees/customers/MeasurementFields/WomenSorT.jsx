import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../../baseURL';

const WomenSorT = ({ setCustomers, setTask }) => {
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
        phone.length < 10 || phone.match(/[a-z]/g) ?
            setPVhone(<span style={{ color: 'red' }}>Phone Number Not Valid!</span>) :
            setPVhone(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        address.length < 10 ?
            setAVddress(<span style={{ color: 'red' }}>Address is not Valid!</span>) :
            setAVddress(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        !codes.match(/[0-9]/g) || codes.length < 8 ?
            setCVodes(<span style={{ color: 'red' }}>Unique code is too small!</span>) :
            setCVodes(<span style={{ color: 'orange' }}>Followed Successiful!</span>);
        if (fname.length >= 4 && lname.length >= 4 && mail.length >= 10 && (phone.length >= 10 || phone.match(/[\d+]/g)) && address.length >= 10 && (!codes.match(/[0-9]/g) || codes.length >= 8)) {
            addNew(`${baseURL}Customer.php`);
            switch (status) {
                case '400':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setCVodes(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'blue' }}>Sorry, Customer with this Email Exist!</span>);
                    break;
                case '200':
                    setFVname(<span style={{ color: 'red' }}></span>);
                    setLVname(<span style={{ color: 'orange' }}></span>);
                    setMVail(<span style={{ color: 'orange' }}></span>);
                    setPVhone(<span style={{ color: 'orange' }}></span>);
                    setCVodes(<span style={{ color: 'orange' }}></span>);
                    setAVddress(<span style={{ color: 'green' }}>New Customer Added!</span>);
                    break;
                default:
                    console.log(status);
                    break;
            }
            const getall = async () => {
                const response = await axios.get(`${baseURL}Customer.php`);
                setCustomers(response.data.Customers);
            }
            getall();
        }

    }
    return (

        <div className="container">
            <div className="title">
                <h3><span>Women Skirt/Trouser</span></h3>
            </div>
            <div className="flex">
                <input type="text" placeholder="L" name="fname" value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width:'150px' }} />
                <div className="small text-center">{fVname}</div>
                <input type="text" placeholder="W" name="lName" value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{lVname}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="HPS" name="lName" value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{lVname}</div>
                <input type="text" placeholder="THIGH" name="fname" value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width:'160px' }} />
                <div className="small text-center">{fVname}</div>
            </div>
            <div className="flex">
                <input type="text" placeholder="KNEE" name="fname" value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px", width:'170px' }} />
                <div className="small text-center">{fVname}</div>
                <input type="text" placeholder="ANKLE" name="lName" value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    style={{ marginTop: "5px", marginBottom: "5px" }} />
                <div className="small text-center">{lVname}</div>
            </div>
            <input type="text" placeholder="FLYS" name="Quantity" value={mail}
                onChange={(e) => setMail(e.target.value)}
                style={{ marginTop: "5px", marginBottom: "5px" }} />
            <div className="small text-center">{mVail}</div>
            <div className="button">
                <button id="bottonGet" onClick={() => setTask(1)}><i className="bi bi-chevron-double-left"></i> Back</button>
                <button id="bottonGet" onClick={handleupdate}><i className="bi bi-chevron-double-up"></i> Complete</button>
            </div>
        </div>
    )
}

export default WomenSorT;