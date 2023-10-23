import React, { useEffect, useState } from 'react';
// import useCustomer from '../../customerHooks/useCustomer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../baseURL';
import jQuery from 'jquery';

const NewStock = ({ setStocksdt }) => {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [cost, setCost] = useState("");
    const [photo, setPhoto] = useState("");
    const [regId, setRegId] = useState("");
    const [qty, setQty] = useState("");
    const [status, setStatus] = useState();
    const [tvitle, setTVitle] = useState("");
    const [dves, setDves] = useState("");
    const [cvost, setCvost] = useState("");
    const [pvhoto, setPvhoto] = useState("");
    const [qvty, setQvty] = useState("");
    const navigate = useNavigate();

    const jqueries = () => {
        // store.clear(); setAddress(""); setCodes(""); setTitle(""); setMail(""); setPhone(""); setDes("");
    }
    const addNew = async (PATH) => {
        let formdata = new FormData();
        formdata.append("stockTitle", title);
        formdata.append("stockDes", des);
        formdata.append("stockCost", cost);
        formdata.append("quantity", qty);
        formdata.append("registered", regId);
        formdata.append("photo", photo);

        let bodyContent = formdata;

        let reqOptions = {
            url: PATH,
            method: "POST",
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        setStatus(response.data.status);
        console.log(response.data);
    }
    // useEffect(() => {
    // }, [PATH,title,des,address,phone,mail,codes]);    
    const handleupdate = async () => {
        title.length < 4 ?
            setTVitle(<span style={{ color: 'red' }}>Title is Too Small!</span>) :
            setTVitle(<span style={{ color: 'orange' }}></span>);
        des.length < 4 ?
            setDves(<span style={{ color: 'red' }}>Description is Too Small!</span>) :
            setDves(<span style={{ color: 'orange' }}></span>);
        cost.length < 2 || !cost.match(/[\d+]/g) ?
            setCvost(<span style={{ color: 'red' }}>Fill the Price !</span>) :
            setCvost(<span style={{ color: 'orange' }}></span>);
        qty.length < 1 || !qty.match(/[\d+]/g) ?
            setQvty(<span style={{ color: 'red' }}>Fill the Quatity!</span>) :
            setQvty(<span style={{ color: 'orange' }}></span>);
        photo.length < 1 ?
            setPvhoto(<span style={{ color: 'red' }}>No Photo Selected!</span>) :
            setPvhoto(<span style={{ color: 'orange' }}></span>);

        if (title.length >= 4 && des.length >= 4 && (cost.length >= 2 || cost.match(/[\d+]/g)) && (qty.length >= 1 || qty.match(/[\d+]/g)) && !(photo.length < 1)) {
            const response = await axios.get(`${baseURL}log.php?a_id=${window.localStorage.adminmail}`);

            if (response.data.status === "200") {
                setRegId(response.data.adm[0].adminID);
            }
            addNew(`${baseURL}stocks.php`);
            switch (status) {
                case '400':
                    setTVitle(<span style={{ color: 'red' }}></span>);
                    setDves(<span style={{ color: 'orange' }}></span>);
                    const getal = async () => {
                        const stoc = await axios.get(`${baseURL}stocks.php`);
                        if (stoc.data.status === "200") {
                            setStocksdt(stoc.data.stocks);
                            jQuery(".add_box.newstock").fadeOut({
                                duration:1000
                            });
                            setTitle("");setDes(""); setQty(""); setCost(""); setPhoto("");
                        }
                    }
                    getal();
                    break;
                case '200':
                    setTVitle(<span style={{ color: 'red' }}></span>);
                    setDves(<span style={{ color: 'orange' }}></span>);
                    const getall = async () => {
                        const stock = await axios.get(`${baseURL}stocks.php`);
                        if (stock.data.status === "200") {
                            setStocksdt(stock.data.stocks);
                            jQuery(".add_box.newstock").fadeOut({
                                duration:1000
                            });
                            setTitle("");setDes(""); setQty(""); setCost(""); setPhoto("");
                        }
                    }
                    getall();
                    break;
                default:
                    console.log("NOTHING")
                    break;
            }
            const getall = async () => {
                const response = await axios.get(`${baseURL}customers.php`);
                // setCustomers(response.data.customers);
            }
            getall();
        }

    }
    const getPhoto = () => {
        document.getElementById("profilePic").click();
    }
    return (
        <div className="add_box newstock" style={{ display: "none" }}>
            <div className="update" style={{ padding: "2px" }}>
                <div className="cancel" onClick={jqueries}>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="container">
                    <div className="flex">
                        <input type="text" placeholder="Stock Headline" name="title" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                        <div className="small text-center">{tvitle}</div>
                        <input type="text" placeholder="Stock Quatities" name="qty" value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                        <div className="small text-center">{qvty}</div>
                    </div>
                    <div className="flex">
                        <input type="text" placeholder="Stock Details" name="desc" value={des}
                            onChange={(e) => setDes(e.target.value)}
                            style={{ marginTop: "5px", marginBottom: "5px" }} />
                        <div className="small text-center">{dves}</div>
                        <input type="text" placeholder="Price" name="title" value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            style={{ marginTop: "5px", marginBottom: "5px", width: '150px' }} />
                        <div className="small text-center">{cvost}</div>
                    </div>
                    <div className='preview' onClick={getPhoto}>
                        <div className="title">
                            <input type="file" name="" id="profilePic" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                            <h4><span>SELECT IMAGE</span></h4>
                        </div>
                    </div>
                    <div className="small text-center">{pvhoto}</div>


                    <div className="button">
                        <button id="bottonGet" onClick={handleupdate}>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewStock;