import React from 'react'
import Aos from 'aos'
import './style.css'
const TopBar = () => {
    Aos.init({
        duration:1000,
        easing:'linear'
    });
    return (
        <div>
            <div className="box_full" style={{"--width":"100%"}}>
                <div className="container">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="3000">
                        <div className="col-9 flex">
                            <div className="Input Search">
                                {/* <input type="text" placeholder="Search Package Name"/> */}
                                <h2 style={{
                                    marginTop:"50px",
                                    marginLeft:"20px"
                                }} className='gradient-text'>ADMIN DASHBOARD</h2>
                            </div>
                        </div>
                        <div className="col-3 flex mt-20">
                            <div className="profile">
                                <img src="https://th.bing.com/th/id/OIP.X0Bqsl6JQsvg2mSFr9JrcQHaHa?pid=ImgDet&rs=1" alt=""/>
                            </div>
                            <div className="grid mt-20">
                                <span className="white">
                                   Gemini Child
                                </span>
                                <div className="up">
                                    <span className="gray small italic">Administrator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid_templated showcase">
                <div className="box_full_template_grid " style={{"--width":"100%", "--h":"150px"}} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>Employeed</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span>
                                683
                            </span></h1>
                        </div>
                    </div>
                </div>
                <div className="box_full_template_grid " style={{"--width":"100%","--h":"150px"}} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>Customers</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span>
                                872
                            </span></h1>
                        </div>
                    </div>
                </div>
                <div className="box_full_template_grid " style={{"--width":"100%","--h":"150px"}} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>TOTAL SALES</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span> 998 </span></h1>
                        </div>
                    </div>
                </div>
                {/* <div className="box_full_template_grid " style={{"--width":"100%","--h":"150px"}} data-aos="flip-up" data-aos-duration="1000"
                    data-aos-delay="3000">
                    <div className="title text-center mt-2">
                        <h5><span>ITEMS SOLD</span></h5>
                    </div>
                    <div className="number">
                        <div className="title text-center mt-2">
                            <h1><span> 1000 </span></h1>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default TopBar