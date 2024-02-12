import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'
import axios from 'axios'
import './style.css';
import { useParams } from 'react-router-dom'
import { baseURL, baseURL2 } from '../../../baseURL'
import SideBar2 from '../../widgets/sidebar/SideBar2';
import TopBar2 from '../../widgets/topbar/TopBar2';
import NewDeal from './../../employees/customers/NewDeal';
import Mini2 from '../../widgets/sidebar/Mini2';
import Loading from '../../Loader/Loading';
import Search from '../../widgets/Search/Search';
import toast from 'react-hot-toast';
import CustomerDeals from "./CustomerDeals"
import SideBar from '../../widgets/sidebar/SideBar';
import TopBar from '../../widgets/topbar/TopBar';
import Mini from '../../widgets/sidebar/Mini';
const Customer = () => {
    const jqueryCodes = () => {
        // jQuery.noConflict();
        setTimeout(() => {
            jQuery(".pre_loader ").fadeOut({
                duration: 500,
                easing: 'linear'
            });
        }, 2000);
        jQuery(".add_deal .update .cancel button").on("click", () => {
            jQuery(".add_box.add_deal").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            })
        });
        // jQuery(".add_open.dealnew").on("click", () => {
        //     jQuery(".add_box.add_deal").addClass("animate__animated animate_fadeInUp");
        //     jQuery(".add_box.add_deal").fadeIn({
        //         duration: 500,
        //         easing: 'linear',
        //         done: function () {
        //         }
        //     });
        // });

        jQuery(".rename .cancel button").on("click", () => {
            jQuery(".rename_box").fadeOut({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            })
        });
        jQuery(".updateMe").on("click", () => {
            jQuery(".rename_box").addClass("animate__animated animate_fadeInUp");
            jQuery(".rename_box").fadeIn({
                duration: 500,
                easing: 'linear',
                done: function () {
                }
            });
        });
    }
    const params = useParams();
    const [contents, setContents] = useState();
    const [works, setWorks] = useState();
    const [count, setCount] = useState();
    const [onecount, setOnecount] = useState();
    const [products, setProducts] = useState();
    const [show, setShow] = useState(false);
    const [numArr, setNumArr] = useState("1");
    const [deals, setDeals] = useState();
    const [sel, setSel] = useState();
    // console.log("SELL AT IRS", sel)
    const store = window.localStorage;
    // store.setItem("productId", "0");
    const getAll_products = async () => {
        try {
            const products = axios.request({
                url: `${baseURL}add-product.php`,
                method: 'GET'
            });
            const data = (await products).data;
            setProducts(data.products);
            setSel(document.getElementById("dataNotYet").firstChild.value);
            store.setItem("price", data.products[0].sellingPrice);
            store.setItem("productId", data.products[0].productId);
            store.setItem("productName", data.products[0].productName);
            let arra = new Array();
            for (let index = 0; index < data.products[0].quantity; index++) {
                arra.push(index+1);
                
            }
            setSel(arra);
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
        }

    }
    const onChangeHandler = async (e) => {
        try {
            const products = axios.request({
                url: `${baseURL}one-product.php?p_name=${e.target.value}`,
                method: 'GET'
            });
            let arra = new Array();
            // setNumArr((await products).data.product);
            store.setItem("productName", e.target.value);
            store.setItem("productId", (await products).data.product.productId);
            store.setItem("price", (await products).data.product.sellingPrice);
            for (let index = 0; index < (await products).data.product.quantity; index++) {
                arra.push(index+1);
                
            }
            setSel(arra);
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
        }
        return e.target.value;
    }
    const getall = async () => {
        const response = await axios.get(`${baseURL}onecustomer.php?id=${params.id}`);
        setContents(response.data.customer[0]);
        const deals = await axios.get(`${baseURL}dealforone.php?customer=${response.data.customer[0].customerUnique}&employee=${response.data.customer[0].registeredBy}`);
        window.localStorage.setItem("UNIQUE_ID", response.data.customer[0].customerUnique);
        try {
        
            const products = await axios.request({
                url: `${baseURL}sell.php?user=${response.data.customer[0].customerUnique}`,
                method: 'GET'
            });
            setDeals(products.data.products);
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
        }
        setWorks(deals.data.deals);
        const money_in = await axios.get(`${baseURL}customerTotal.php?customer=${response.data.customer[0].customerUnique}`);
        setOnecount(Number(money_in.data.TOTAL).toLocaleString());
        setCount(deals.data.counter);
    }
    useEffect(() => {
        getAll_products();

        

        getall();
        jqueryCodes();
    }, []);
    const printing = () => {
        jQuery(".prt_on").hide();
        jQuery(".prt_on").css({
            "display": "none"
        });
        jQuery(".pdeal").css({
            "position": "absolute",
            "width": "90%",
            "left": "50%",
            "transform": "translateX(-50%)"
        });
        window.print();
        window.onafterprint = function () {
            jQuery(".prt_on").show();
            jQuery(".prt_on").css({
                "display": "block !important"
            });
            jQuery(".pdeal").css({
                "position": "auto",
                "width": "auto",
                "left": "auto",
                "transform": "none"
            });
        }
    }
    // const param = useParams();
    const handleDeploy = async () => {
        try {
            let formdata = new FormData();
            formdata.append("cId", store.productId);
            formdata.append("qty", numArr);
            formdata.append("price", store.price);
            formdata.append("p_name", store.productName);
            formdata.append("customer", store.UNIQUE_ID);
            const body = formdata;
            const products = await axios.request({
                url: `${baseURL}sell.php`,
                method: 'POST',
                data: body
            });
            products.data.status === "200" ? toast.success("Product Sold") : toast.error("Something Went Wrong");
            if(products.data.status === "200")
                 getall();
                setShow(false);
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
        }
    }
    return (
        <div>
            <Mini />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar prt_on">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000" >
                        <SideBar />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar location={"CUSTOMER INFO"} />
                    <div className=" container " style={{

                    }}>
                        <div className="row customer">
                            <div className="col-md-10 prt_on">
                                <div className="contents">
                                    <div className="title"><h3><span style={{
                                        fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                    }}>CUSTOMER PROFILE</span></h3></div>
                                    <div className="grid2 prt_on" style={{ "--template": "150px auto" }}>
                                        <div className="photo">
                                            <img src={contents !== undefined ? baseURL2 + contents.customerProfile : ""} alt="" />
                                        </div>
                                        <div className="content">
                                            <div className="container">
                                                <h4>Full Name</h4>
                                                <p>{contents !== undefined ? contents.customerFirst + " " + contents.customerLast : "Wait ..."}</p>
                                                <h4>Customer Email</h4>
                                                <p>{contents !== undefined ? contents.customerEmail : "Wait ..."}</p>
                                                <h4>Unique ID</h4>
                                                <p>{contents !== undefined ? contents.customerUnique : "Wait ..."}</p>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="grid_mini">
                                        <div className="">
                                            <h5>Contact</h5>
                                            <p>{contents !== undefined ? contents.customerContact : "Wait ..."}</p>
                                        </div>
                                        <div className="">
                                            <h5>Address</h5>
                                            <p>{contents !== undefined ? contents.customerAddress : "Wait ..."}</p>
                                        </div>
                                        {/* <div className="">
                                            <h5>Registered By</h5>
                                            <p>{contents !== undefined ? contents.customerUnique : "Wait ..."}</p>
                                        </div> */}
                                        {/* <div className="">
                                            <h5>Total Price</h5>
                                            {
                                                onecount !== undefined ? <p>{onecount} <span className="small">Tsh</span></p> : "Cash is Empty"
                                            }
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-4 process prt_on">
                                <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>ACTIVITIES</span></h3></div>
                                <div className="contents">
                                    <div className="processor">
                                        <div className="processor2">
                                            <div className="center">
                                                <h1><span>{count}</span></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-xl-10 pdeal" style={{
                                marginTop: '50px', position: 'relative'
                            }}>
                                <div className="title"><h3><span style={{
                                    fontWeight: 100, marginTop: '50px !important', padding: '20px', background: 'var(--milk)', color: 'var(--black)', position: 'relative', minHeight: '30px', marginLeft: '-50px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'
                                }}>CUSTOMER DEALS</span></h3></div>
                                {/* <button className="print_deal bi bi-printer-fill prt_on" onClick={printing}> Print</button> */}
                                <div className="deals  container product_list" style={{
                                    marginTop: '40px', position: 'relative'
                                }}>
                                    {
                                        deals !== undefined && deals?.length > 0 ? deals.map((work, id) => <CustomerDeals deals={work}  key={id} keys={id+1} />) : <Loading />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADDING
            <AddEmployee setEmployee={setContents} /> */}
            <NewDeal setContents={setContents} setOnecount={setOnecount} setWorks={setWorks} setCount={setCount} />
            {/* <Search setDeals={setWorks} setCount={setCount} uri={"searchbyInd.php"} id={"YES"} /> */}



            {/* <div className="addnew">
                <button className='bi bi-plus dealnew' onClick={()  => setShow(true)}>
                    <span>New Deal</span>
                </button>
            </div> */}
            <div className="add_box choises"  style={{
                display: `${show? 'block':'none'}`
            }}>
                <div className="update text-center">
                <button onClick={()  => setShow(false)}>CLOSE</button>
                    <h3>INSERT THE DEAL</h3>
                    <span className="small grey" style={{ marginLeft:'15px'}}>Select Product</span>
                    <select name="" id="dataNotYet" onChange={onChangeHandler}>
                        {
                            products !== undefined && products?.length > 0 ?
                                products.map((data, i) => <option key={i} value={data.productName}> {data.productName}</option>) :
                                <option disabled></option>
                        }

                    </select>
                    <span className="small grey" style={{ marginLeft:'15px'}}>Select Quantity</span>
                    <select name="" id="" onChange={(evt) => setNumArr(evt.target.value)}>
                        
                        {
                            sel !== undefined && sel?.length > 0 ?
                                sel.map((data, i) => <option key={i} value={data}> {data}</option>) :
                                <option disabled></option>
                        }

                    </select>
                    <div className="button"><button onClick={handleDeploy}>SELL THE PRODUCT</button></div>
                </div>
            </div>
        </div >
    )
}
export default Customer;