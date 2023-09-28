import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="bubble" style={{"--width":"100vw","--height":"100vw","--top":"-100%","--left":"-60%"}}></div>
            <div className="bubble" style={{"--width":"100vw","--height":"100vw","--top":"-100%","--left":"60%"}}>
            </div>
            <div className="container">
                <div className="registration_box">
                    <div className="reg_items">
                        {/* <div onclick="window.location = 'register.jsp'">Register</div> */}
                        <div className="">Login</div>
                    </div>
                    <div className="title" style={{margin: "20px",marginTop: "50px"}}>
                        <h2><span>Login</span></h2>
                    </div>
                    <div className="grid_items" style={{"--width": "90%",marginLeft: "30px",marginRight: "30px",padding: "25px",marginBottom: "-10px",marginTop: "-20px"}}>
                        <input type="text" placeholder="Enter Email" name="email" style={{padding: "25px"}} />
                    </div>
                    <div className="grid_items" style={{"--width": "90%",marginLeft: "30px",marginRight: "30px",padding: "25px",marginBottom: "-10px",marginTop: "-20px"}}>
                        <input type="password" placeholder="Enter Password" name="passcode" style={{padding: "25px"}} />
                    </div>
                    <div className="btn">
                        <button className="gradient" id="buttonGet" style={{color:"white"}} onClick={() => navigate('/admin')}>Sign In</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login