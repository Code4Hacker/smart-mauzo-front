import React from 'react'

const Card_Top = ({detail, value, icon}) => {
    return (
        <div className="card_show">
            <div className="icon">
                <i className={icon}></i>
            </div>
            <div className="content" style={{textAlign:'center'}}>
                <h1 >{value}</h1>
                <span>{detail}</span>
            </div>
        </div>
    )
}

export default Card_Top