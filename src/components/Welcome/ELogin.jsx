import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import './../../primary/style2.css';
import jQuery, { event } from 'jquery';
import { baseURL } from '../../baseURL';

const ELogin = () => {
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
            formdt.append("Aemail", email.replace("+", ""));
            formdt.append("Apasscode", pass);
            const checkOut = await axios.request({
                url: `${baseURL}e_log.php`,
                method: "POST",
                data: formdt
            });
            switch (checkOut.data.status) {
                case '200':
                    setVpwd(<span style={{ color: 'green' }}>Authorization Granted!</span>);
                    setVmail(<span style={{ color: 'green' }}></span>);

                    jQuery(".asking").fadeIn({ duration: 200 });
                    jQuery(".btn button:nth-child(1)").on("click", function () {
                        jQuery(".asking > *").text("Loading ...");
                    });
                    jQuery(".btn button:nth-child(1)").on("click", function () {
                        jQuery(".asking > *").text("Saving ...");
                        
                       
                        setTimeout(() => {
                            jQuery(".asking > *").text("Almost there ...");
                        }, 2000);
                        setTimeout(() => {
                            jQuery(".asking > *").text("Done ...");
                        }, 4000);
                        setTimeout(() => {
                            jQuery(".asking > *").text("Redirecting ...");
                            localStorage.clear();
                        }, 6000);
                        setTimeout(() => {
                            if(checkOut.data.role === "admin") {
                                window.localStorage.setItem("adminmail", email.replace("+", ""));
                                window.localStorage.setItem("user_role", "admin");
                                navigate('/admin');
                            } else if(checkOut.data.role ==="employee"){
                                window.localStorage.setItem("emMail", email.replace("+", ""));
                                window.localStorage.setItem("user_role", "employee");
                                navigate('/employee');
                            }
                            

                        }, 8000);
                    });
                    break;
                case '404':
                    setVpwd(<span style={{ color: 'red' }}>Incorrect Username/Password</span>);
                    setVmail(<span style={{ color: 'red' }}></span>);
                    break;
            }
        }
    }
    
    window.onkeyup = function(evt){
        if(evt.key === "Enter" || evt.key === 13){
            handlesubmit();
        }
    }
    const query_2 = () => {
        jQuery("button").on("click", function () {
            jQuery("button *").removeClass("btn_cli");
            jQuery(this).find(".bn1").hide();
            jQuery(this).find(".bn2").addClass("btn_cli");
            jQuery(this).prop("disabled", true);
            setTimeout(() => {
                jQuery(this).prop("disabled", false);
                jQuery(this).find(".bn1").show({
                    done: function () {
                        jQuery("button *").removeClass("btn_cli");
                        jQuery(this).prop("disabled", false);
                    }
                });
            }, 3000);
        });
    }
    useEffect(() => {
        query_2();
        if (window.localStorage.user_role === "employee") {
            navigate('/employee');
        }else if(window.localStorage.user_role === "admin"){
            navigate("/admin");
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
                            <button>
                                <div className="bn2"></div>
                                <div className="bn1">
                                    <span className="small">
                                        <i className="bi bi-chevron-double-right"></i> continue
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bubble" style={{ "--width": "100vw", "--height": "100vw", "--top": "-100%", "--left": "-60%" }}></div>
            <div className="bubble" style={{ "--width": "100vw", "--height": "100vw", "--top": "-100%", "--left": "60%" }}>
            </div>
            <div className="container">
                <div className="registration_box login">
                    {/* <div className="reg_items">
                        <Link to={'/'} className="header">Admin</Link>
                        <Link to={'/e_login'} className='header active'>Employee</Link>
                    </div> */}
                    <div className="title" style={{ margin: "20px", marginTop: "50px" }}>
                        <h2><span>SIGN IN</span></h2>
                    </div>
                    <div className="grid_items" style={{ "--width": "90%", marginLeft: "30px", marginRight: "30px", padding: "25px", marginBottom: "-10px", marginTop: "-20px" }} onKeyUp={() => handlesubmit}>
                        <input type="text" placeholder="Enter Email" value={email} onChange={(evt) => setEmail(evt.target.value)} name="E_email" style={{ padding: "25px" }} />
                        <div className="small pwd">{vmail}</div>
                    </div>
                    <div className="grid_items" style={{ "--width": "90%", marginLeft: "30px", marginRight: "30px", padding: "25px", marginBottom: "-10px", marginTop: "-20px" }}>
                        <input type="password" placeholder="Enter Password" value={pass} onChange={(evt) => setPass(evt.target.value)} name="E_passcode" style={{ padding: "25px" }} />
                        <div className="small pwd">{vpwd}</div>

                    </div>
                    <div className="btn">
                        <button className="gradient" id="buttonGet" style={{ color: "white" }} onClick={handlesubmit}>
                            <div className="bn2"></div>
                            <div className="bn1">
                                <span className="small">
                                    <i className="bi bi-chevron-lock"></i> Sign In
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ELogin