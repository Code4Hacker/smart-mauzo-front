import React from 'react'

const Card = () => {
    return (
        <div className="common-grid-2 " style={{ "--grid-template": "auto auto auto auto auto auto auto" }}>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {"Gemini"}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {"Child"}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {"gemini@gmail.com"}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {"+25573872898"}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {"size 30px width 40px ..."}
                    </span></h5>
                </div>
            </div>

            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {" registered_date "}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h" style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title">
                    <i className="bi bi-folder-fill" style={{ color: "var(--black)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px",backgroundColor:'var(--top-color)', fontSize:'small',fontStyle:'normal !important',cursor:'pointer' }}> view</i>
                    <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }}></i>
                    <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }}></i>
                </div>
            </div>
            
        </div>
    )
}

export default Card