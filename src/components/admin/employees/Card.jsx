import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Update from './Update';
import jQuery from 'jquery';

const Card = ({ employee, setEmployee }) => {
    const { employeeID, employeeFirst, employeeLast, employeeEmail, employeeContact, registedDate, employeeAddress } = employee;
    const handledel = async () => {
        const del = await axios.delete("https://tailorgemini.000webhostapp.com/tailorwebapp/employee.php", { data: JSON.stringify({ "id": employeeID }) });
        // const status = del.data;
        const getall = async () => {
            const response = await axios.get("https://tailorgemini.000webhostapp.com/tailorwebapp/employee.php");
            setEmployee(response.data.employees);
        }
        getall();
    }

    useEffect(() => {
        jQuery(".updateMe").on("click", function () {
            jQuery(".rename").fadeIn({
                duration: 1000,
                easing: 'linear'
            });
        });
    }, []);
    const clickhandle = () => {
        let store = window.localStorage;
        store.clear();
        store.setItem("id", employeeID);
        store.setItem("first", employeeFirst);
        store.setItem("last", employeeLast);
        store.setItem("email", employeeEmail);
        store.setItem("phone", employeeContact);
        store.setItem("add", employeeAddress);

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
                    <i className="bi bi-pen-fill updateMe" style={{ color: "var(--green)", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }} onClick={clickhandle}></i>
                    <i className="bi bi-trash3-fill" style={{ color: "red", padding: "8px", boxShadow: " inset 0px 0px 10px 0px rgba(0, 0, 0, 0.11)", margin: " 3px", borderRadius: " 10px" }} value={employeeID} onClick={handledel}></i>
                </div>
            </div>
        </div>
    )
}

export default Card