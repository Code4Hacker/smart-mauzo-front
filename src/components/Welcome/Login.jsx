import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import jQuery from 'jquery';
import { baseURL } from '../../baseURL';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [vpwd, setVpwd] = useState("");
    const [vmail, setVmail] = useState("");
    const handlesubmit = async () => {
        email.length < 8 ?
            setVmail(<span style={{ color: 'red' }}>Email is Not Real!</span>) :
            setVmail(<span style={{ color: 'orange' }}>Rule Followed Successiful!</span>);
        pass.length < 6 ?
            setVpwd(<span style={{ color: 'red' }}>Password Should be Greater than 6 Digit!</span>) :
            setVpwd(<span style={{ color: 'orange' }}>Followed Successiful!</span>);

        if (email.length >= 8 && pass.length >= 6) {
            let formdt = new FormData();
            formdt.append("Aemail", email);
            formdt.append("Apasscode", pass);
            const checkOut = await axios.request({
                url: `${baseURL}log.php`,
                method: "POST",
                data: formdt
            });
            switch (checkOut.data.status) {
                case '200':
                    setVpwd(<span style={{ color: 'green' }}>Authorization Granted!</span>);
                    setVmail(<span style={{ color: 'green' }}></span>);

                    jQuery(".asking").fadeIn({ duration: 200 });
                    jQuery(".btn button:nth-child(2)").on("click", function () {
                        jQuery(".asking > *").text("Loading ...");
                        // setTimeout(() => {
                        //     navigate('/admin');
                        // }, 2000);
                    });
                    jQuery(".btn button:nth-child(1)").on("click", function () {
                        jQuery(".asking > *").text("Saving ...");
                        window.localStorage.setItem("adminmail", email);
                        setTimeout(() => {
                            jQuery(".asking > *").text("Almost there ...");
                            setTimeout(() => {
                                jQuery(".asking > *").text("Done ...");
                                setTimeout(() => {
                                    jQuery(".asking > *").text("Redirecting ...");
                                    setTimeout(() => {
                                        navigate('/admin');
                                    }, 2000);
                                }, 2000);
                            }, 2000);
                        }, 2000);
                    });
                    break;
                case '404':
                    setVpwd(<span style={{ color: 'red' }}>Incorrect Username/Password</span>);
                    setVmail(<span style={{ color: 'red' }}></span>);
                    break;
            }
        }
    }
    useEffect(() => {
        if (window.localStorage.adminmail !== undefined) {
            navigate('/admin');
        }
    })
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
            <div className="bubble" style={{ "--width": "100vw", "--height": "100vw", "--top": "-100%", "--left": "-60%" }}></div>
            <div className="bubble" style={{ "--width": "100vw", "--height": "100vw", "--top": "-100%", "--left": "60%" }}>
            </div>
            <div className="container">
                <div className="registration_box login">
                <div className="reg_items">
                        <Link to={'/'} className="header active">Admin</Link>
                        <Link to={'/e_login'} className='header'>Employee</Link>
                    </div>
                    <div className="title" style={{ margin: "20px", marginTop: "50px" }}>
                        <h2><span>Admin Login</span></h2>
                    </div>
                    <div className="grid_items" style={{ "--width": "90%", marginLeft: "30px", marginRight: "30px", padding: "25px", marginBottom: "-10px", marginTop: "-20px" }} onKeyUp={() => handlesubmit}>
                        <input type="text" placeholder="Enter Email" value={email} onChange={(evt) => setEmail(evt.target.value)} name="email" style={{ padding: "25px" }} />
                        <div className="small pwd">{vmail}</div>
                    </div>
                    <div className="grid_items" style={{ "--width": "90%", marginLeft: "30px", marginRight: "30px", padding: "25px", marginBottom: "-10px", marginTop: "-20px" }}>
                        <input type="password" placeholder="Enter Password" value={pass} onChange={(evt) => setPass(evt.target.value)} name="passcode" style={{ padding: "25px" }} />
                        <div className="small pwd">{vpwd}</div>

                    </div>
                    <div className="btn">
                        <button className="gradient" id="buttonGet" style={{ color: "white" }} onClick={handlesubmit}>Sign In</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login