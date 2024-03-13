import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { baseURL } from '../../baseURL'
import './../../primary/style2.css'
import SideBar2 from '../widgets/sidebar/SideBar2'
import TopBar2 from '../widgets/topbar/TopBar2'
import Mini2 from '../widgets/sidebar/Mini2'
import './product.css'

// import { Product_log } from './product_log'
// import Loading from '../Loader/Loading'
import toast from 'react-hot-toast'
import Expense_log from './Expense_log'

const ExpensesAdm = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const [products, setProducts] = useState();
    const [show, setShow] = useState(false);


    const [product, setProduct] = useState();
    const [qty, setQty] = useState();
    const [bprice, setBprice] = useState();
    const [sprice, setSprice] = useState();
    const [ctg, setCtg] = useState();

    const handleDeploy = async () => {
        try {
            let formdata = new FormData();
            formdata.append("title", product);
            formdata.append("desc", qty);
            formdata.append("qty", bprice);
            formdata.append("cost", sprice);
            formdata.append("categ", ctg);
            formdata.append("g_by", localStorage.getItem("emMail"));
            const body = formdata;
            const products = await axios.request({
                url: `${baseURL}expenses.php`,
                method: 'POST',
                data: body
            });
            products.data.status === "200" ? toast.success("Product Sold") : toast.error("Something Went Wrong\n"+products.data.message);
            if(products.data.status === "200"){
                getAll_products();
                setShow(false);
                setProduct(""); setBprice(); setQty(); setSprice(); setShow(false);
            }
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
            console.log(error);
        }
    }

    const getAll_products = async () => {
        try {
            const products = axios.request({
                url: `${baseURL}expenses.php?date=`,
                method: 'GET'
            });
            const data = (await products).data;
            setProducts(data.ExpensesAdm);
            console.log(data);
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
        }

    }
    useEffect(() => {
        const getall = async () => {
            // const response = await axios.get(`${baseURL}employeeid.php?id=${localStorage.emMail != undefined ? localStorage.emMail : 0}`);
            // setContents(response.data.customers.splice(0, 3));;

        }
        getall();
        getAll_products();
    }, []);
    return (
        <div>
            <Loader />
            <Mini2 />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000">
                        <SideBar2 />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar2 location={"VIEW PRODUCTS"} />
                    <div className="products">
                        <div className="text-center p-3">

                            <button onClick={() => setShow(true)}>CREATE EXPENSE</button>
                        </div>
                        <div className="container product_list">
                            {
                                products !== undefined && products?.length > 0 ?
                                    products.map((data, i) => <Expense_log key={i} product={data} setProduct={setProducts} />) :
                                    "Check your Connection | try to re-load the Page"
                            }
                        </div>
                    </div>
                    <div className="add_box choises"  style={{
                        display: `${show ? 'block':'none'}`
                    }}>
                        <div className="update text-center">
                            <button onClick={() => setShow(false)}>CLOSE</button>
                            <h3>INSERT NEW EXPENSE</h3>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Title</span>
                            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)}/>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Description</span>
                            <input type="text" value={qty} onChange={(e) => setQty(e.target.value)}/>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Quantity</span>
                            <input type="number" value={bprice} onChange={(e) => setBprice(e.target.value)}/>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Cost</span>
                            <input type="number" value={sprice} onChange={(e) => setSprice(e.target.value)}/>

                            <span className="small grey" style={{ marginLeft: '15px' }}>Category</span>
                            <input type="text" value={ctg} onChange={(e) => setCtg(e.target.value)}/>

                            <div className="button"><button onClick={handleDeploy}>ADD PRODUCT</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpensesAdm;


