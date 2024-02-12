import React from 'react'

const StockCards = ({data, key2}) => {
    return (
        <>
            <div className="icon_num">
                {key2}
            </div>
            <div className="">
                {data.name}
            </div>
            <div className="">{Number(data.price).toLocaleString()}</div>
            <div className="" style={{textAlign:'center'}}>{data.qty}</div>
            <div className="">{Number(data.price*data.qty).toLocaleString()}</div>
            <div className="">{data.date_out}</div>
        </>
    )
}

export default StockCards