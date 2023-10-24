import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.css';
import jQuery from 'jquery';
import { baseURL } from '../../../baseURL';
import Loading from '../../Loader/Loading';

const UStock = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [the_old, setThe_old] = useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    useEffect(() => {
        const old = async () => {
            try {
                const getdata = await axios.get(`${baseURL}onestock.php?id=${params.id}`);
                setThe_old(getdata.data.stock);
            } catch (error) {
                alert(error);
            }
        }
        old();
        // if (window.localStorage.adminmail !== undefined) {
        //     navigate('/admin');
        // }
    });
    const handlesubmit = async() => {

        let forma = new FormData();
        forma.append("stockTitle", title);
        forma.append("stockDes", desc);
        forma.append("stockCost", price);
        forma.append("quantity", quantity);
        forma.append("id", params.id);
        if(title !== "" && desc !== "" && price !== "" && quantity !== ""){
            let bodydata = forma;

            const send_update = await axios.request({
                method:'POST', url:`${baseURL}onestock.php`, data: bodydata
            });
            if(send_update.data.status === "200"){
                navigate("/repo");
            }
            // console.log(send_update.data.status);
        }else{
            alert("Please Fill All Field");
        }
    }
    return (
        <div>
            <div className="asking" style={{ display: 'none' }}>
                <div className="ask">
                    <div className="">
                        <span>We need to save your Cookies First ? </span>
                        <div className="btn">
                            {/* <button>No</button> */}
                            <button>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bubble" style={{ "--width": "100vw", "--height": "100vw", "--top": "10%", "--left": "-40%" }}></div>
            <div className="bubble" style={{ "--width": "100vw", "--height": "100vw", "--top": "-100%", "--left": "60%" }}>
            </div>
            <div className="container">
                <div className="add_box">
                    <div className="registration_box login">
                        <div className="reg_items">
                        </div>
                        <div className="title" style={{ margin: "20px", marginTop: "50px" }}>
                            <h2><span>Update Stock</span></h2>
                        </div>
                        {
                            the_old !== undefined ?
                                <>
                                    <div className="flex">
                                        <input type="text" placeholder='Title' value={title} style={{ width: '150px', margin: '10px' }} onChange={(evt) => setTitle(evt.target.value)} />
                                        <input type="text" placeholder='Description' value={desc} style={{ margin: '10px' }} onChange={(evt) => setDesc(evt.target.value)} />
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder='Price or Cost' value={price} style={{ margin: '10px' }} onChange={(evt) => setPrice(evt.target.value)} />
                                        <input type="text" placeholder='Quantity' value={quantity} style={{ width: '150px', margin: '10px' }} onChange={(evt) => setQuantity(evt.target.value)} />
                                    </div>
                                    <div className="btn">
                                        <button className="gradient" id="buttonGet" style={{ color: "white" }} onClick={handlesubmit}>UPDATE</button>
                                    </div>
                                </> : <Loading />
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UStock