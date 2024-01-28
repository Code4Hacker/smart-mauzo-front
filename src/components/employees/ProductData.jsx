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

import { Product_log } from './product_log'
import Loading from '../Loader/Loading'
import toast from 'react-hot-toast'

const EProducts = () => {
    Aos.init({
        duration: 1000,
        easing: 'linear'
    });
    const [products, setProducts] = useState();
    const getAll_products = async () => {
        try {
            const products = axios.request({
                url: `${baseURL}add-product.php`,
                method:'GET'
            });
            const data = (await products).data;
            setProducts(data.products);
            console.log(data);
        } catch (error) {
            toast.error("Gemini Throwing .... ",error);
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

                        <button>Add User</button>
                        </div>
                        <div className="container product_list">
                           {
                            products !== undefined && products?.length > 0 ?
                            products.map((data, i) =>  <Product_log key={i} product={data} setProduct={setProducts}/>):
                           "Check your Connection | try to re-load the Page"
                           }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EProducts;


