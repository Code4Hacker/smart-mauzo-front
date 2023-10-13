import moneybg from '../../../assets/money.jpg';
import React from 'react'

const Stock_card = () => {
    return (
        <div className="box_stock">
            <div className="image_holder">
                <img src={moneybg} alt="" loading='lazy' />
            </div>
            <div className="">
                <span className="small italic">
                    Date: 12-02-2023
                </span>
                <div className="">
                    <span className="small">
                        For some charts, data has to be uploaded to Google servers for the chart to be rendered. If you deal with sensitive data, please check the Google APIs Terms of Service. Also, make sure to always check the Data Policy sections in the docs. In this tutoria
                    </span>
                </div>
                <div className="price_holder">
                    <i className="bi bi-star-half"></i><i className="bi bi-coin"></i> <span className="small">203000 Tshs.</span>
                </div>
            </div>
        </div>
    )
}

export default Stock_card