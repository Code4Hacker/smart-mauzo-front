import React from 'react'
const Card = ({ employee }) => {
    const {employeeID, employeeFirst,employeeLast,employeeEmail,employeeContact,registedDate} = employee;
    return (
        <div className="common-grid-2 " style={{ "--grid-template": "auto auto auto auto auto auto auto" }}>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {employeeFirst}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {employeeLast}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {employeeEmail}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {employeeContact}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {"Employee"}
                    </span></h5>
                </div>
            </div>

            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {(new Date(registedDate)).toDateString()}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h" style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title">
                    <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }}></i>
                    <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }}></i>
                </div>
            </div>
        </div>
    )
}

export default Card