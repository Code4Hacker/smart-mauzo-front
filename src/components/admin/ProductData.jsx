import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { baseURL } from '../../baseURL'
import './../../primary/style2.css'
import './product.css'

import Product_log  from './product_log'
import Loading from '../Loader/Loading'
import toast from 'react-hot-toast'
import Mini from '../widgets/sidebar/Mini'
import TopBar from '../widgets/topbar/TopBar'
import SideBar from '../widgets/sidebar/SideBar'

const AEProducts = () => {
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

    const handleDeploy = async () => {
        try {
            let formdata = new FormData();
            formdata.append("p_name", product);
            formdata.append("s_price", sprice);
            formdata.append("b_price", bprice);
            formdata.append("qty", qty);
            const body = formdata;
            const products = await axios.request({
                url: `${baseURL}add-product.php`,
                method: 'POST',
                data: body
            });
            products.data.status === "200" ? toast.success("Product Sold") : toast.error("Something Went Wrong");
            if(products.data.status === "200"){
                getAll_products();
                setShow(false);
                console.log(product);
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
                url: `${baseURL}add-product.php`,
                method: 'GET'
            });
            const data = (await products).data;
            setProducts(data.products);
            console.log(data);
        } catch (error) {
            toast.error("Gemini Throwing .... ", error);
        }

    }
    useEffect(() => {
        const getall = async () => {
            // const response = await axios.get(`${baseURL}employeeid.php?id=${localStorage.emMail != undefined ? localStorage.emMail : 0}`);
            // setContents(response.data.customers.splice(0, 3));

        }
        getall();
        getAll_products();
    }, []);
    return (
        <div>
            <Loader />
            <Mini />
            <div className="dashboard_grid_container">
                <div className="dash_grid_items sidebar">
                    <div className="row" data-aos="fade-left" data-aos-duration="1000">
                        <SideBar />
                    </div>
                </div>
                <div className="dash_grid_items">
                    <TopBar location={"VIEW PRODUCTS"} />
                    <div className="products">
                        <div className="text-center p-3">

                            <button onClick={() => setShow(true)}>ADD PRODUCT</button>
                        </div>
                        <div className="container product_list">
                            {
                                products !== undefined && products?.length > 0 ?
                                    products.map((data, i) => <Product_log key={i} product={data} setProduct={setProducts} />) :
                                    "Check your Connection | try to re-load the Page"
                            }
                        </div>
                    </div>
                    <div className="add_box choises"  style={{
                        display: `${show ? 'block':'none'}`
                    }}>
                        <div className="update text-center">
                            <button onClick={() => setShow(false)}>CLOSE</button>
                            <h3>INSERT THE DEAL</h3>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Product Name</span>
                            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)}/>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Quantity</span>
                            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)}/>
                            <span className="small grey" style={{ marginLeft: '15px' }}>Buying Price</span>
                            <input type="number" value={bprice} onChange={(e) => setBprice(e.target.value)}/>
                            <span className="small grey" style={{ marginLeft: '15px' }}>selling Price</span>
                            <input type="number" value={sprice} onChange={(e) => setSprice(e.target.value)}/>

                            <div className="button"><button onClick={handleDeploy}>ADD PRODUCT</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AEProducts;


