import axios from 'axios';
import React, { useEffect, useState } from 'react'
import jQuery from 'jquery';
import { Link } from 'react-router-dom';
const Card = ({ employee, setEmployee }) => {
    const [empname, setEmpname] = useState();
    const { customerID,
        customerFirst,
        customerLast,
        customerEmail,
        customerAddress,
        customerContact,
        customerProfile,
        customerUnique,
        registeredBy,
        registedDate } = employee;
        const handledel = async () => {
            const del = await axios.delete("http://localhost/tailor_backend/customers.php", { data: JSON.stringify({ "id": customerID }) });
            // const status = del.data;
            const getall = async () => {
                const response = await axios.get("http://localhost/tailor_backend/customers.php");
                setEmployee(response.data.customers);
            }
            getall();
        }
    useEffect(() => {
        const emp = async () => {
            const response = await axios.get(`http://localhost/tailor_backend/employeeid.php?id=${registeredBy}`);
            setEmpname(response.data.fullname[0]);
        }
        emp();
    }, []);
    const clickhandle = () => {
        let store = window.localStorage;
        store.clear();
        store.setItem("id2", customerID);
        store.setItem("first2", customerFirst);
        store.setItem("last2", customerLast);
        store.setItem("email2", customerEmail);
        store.setItem("phone2", customerContact);
        store.setItem("add2", customerAddress);
        store.setItem("unique", customerUnique);

        jQuery(".rename_box").addClass("animate__animated animate_fadeInUp");
        jQuery(".rename_box").fadeIn({
            duration: 500,
            easing: 'linear',
            done: function () {
                console.log("sds CANCELED!");
            }
        });
    }
    return (
        <div className="common-grid-2 " style={{ "--grid-template": "auto auto auto auto auto auto auto" }}>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {customerFirst}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {customerLast}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {customerEmail}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {customerContact}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {customerAddress}
                    </span></h5>
                </div>
            </div>

            <div className="grid-item h " style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title ">
                    <h5><span>
                        {empname !== undefined ? empname.employeeFirst + " " + empname.employeeLast : registeredBy}
                    </span></h5>
                </div>
            </div>
            <div className="grid-item h" style={{ paddingLeft: "10px", paddingRight: "10px " }}>
                <div className="title">
                    <Link to={`/customers/${customerID}`} className="bi bi-folder-fill" style={{ color: "var(--black)",textDecoration:'none', padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px", backgroundColor: 'var(--top-color)', fontSize: 'small', fontStyle: 'normal !important', cursor: 'pointer' }}> view</Link>
                    <i className="bi bi-pen-fill" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }} onClick={clickhandle}></i>
                    <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }} onClick={handledel}></i>
                </div>
            </div>
        </div>
    )
}

export default Card