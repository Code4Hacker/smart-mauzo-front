import React from 'react'
import { Link } from 'react-router-dom';
const Card = ({ workers, setworkers }) => {
    const { workerID, workerName } = workers;
    return (
        <div className="common-grid-2 for_worker " style={{ "--grid-template": "auto 100px" }}>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title " style={{textAlign:'start'}}>
                    <h5><span>
                        {workerName}
                    </span></h5>
                </div>
            </div>
            {/* <div className="grid-item h" style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title">
                    <Link to={`/stuff_member/${workerName}`} className="bi bi-folder-fill" style={{ color: "var(--black)",textDecoration:'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer' }}> view</Link>
                </div>
            </div> */}
        </div>
    )
}

export default Card;