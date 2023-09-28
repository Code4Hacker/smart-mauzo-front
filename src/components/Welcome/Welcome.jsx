import React from 'react'
import Aos from 'aos'
import { Link } from 'react-router-dom';

const Welcome = () => {
Aos.init({
        duration:1000,
        easing:'linear'
    });
  return (
    <div>
        <div className="imagebg">
            <div>
                <div className="simple_nav">
                    <div className="container">
                        <Link to={'/login'}>Sign In</Link>
                    </div>
                </div>
                <div className="container">
                    <div className="banner_home">
                        <div className="title" data-aos="fade-up">
                            <h1><span>Pharmacy Management System</span></h1>
                        </div>
                        <div className="" data-aos="fade-up">
                            <span>Start making evaluation and Prediction to your future products</span>
                        </div>
                        <br />
                        <div className="" data-aos="fade-up">
                            <span className="small italic" style={{color:" gray"}}>-- Greatest health is Wealth --</span>
                        </div>
                        <div className="butto" data-aos="fade-up">
                            <button onclick="window.location = 'register.jsp'">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Welcome