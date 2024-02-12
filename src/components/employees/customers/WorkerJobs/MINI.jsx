import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../../baseURL';

const MINI = ({ d, splitted_deal, dealID, dealStatus }) => {
    let [des, setDes] = useState("");
    useEffect(() => {
        const get_all = async () => {
            const getdata_all = await axios.get(`${baseURL}worker2.php?id=${dealID}`);
            for (let index = 0; index < getdata_all.data.content.length; index++) {
                if (getdata_all.data.content[index] === d.categories) {
                    // console.log(getdata_all.data.content[index], "  Number:", index);
                    setDes(splitted_deal.description.split(",")[index]);
                    console.log(des);

                }
            }
        }
        get_all();
    }, []);
    return (
        <div className="week_jb_gemini">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-5">
                            <span>{des}</span><br />
                            <span className='x-small' style={{
                                color: 'gray'
                            }}>{dealStatus}</span>
                        </div>
                        <div className="col-7">
                            <span>{splitted_deal.the_name}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4 text-end">
                    {Number(d.price * d.quantity).toLocaleString()} Tshs.
                    <span className="x-small" style={{ fontFamily: 'cursive' }}>
                        [ Price {Number(d.price).toLocaleString()}
                        @({d.quantity}) Items ]
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MINI