import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import jQuery from 'jquery'
const Mini = () => {
    const queries = () => {
        jQuery(".main-bar").on("click", function(){
            jQuery(".sidebar").removeClass("minimized");
            jQuery(".dashboard_grid_container").removeClass("minimized");
            jQuery(".mini-sidebar>*").removeClass("minimized");
        });
    }
    useEffect(() => {queries()},[]);
  return (
    <div className='mini-sidebar'>
        <div className="container">
            <Link to={'/admin'}> <h3 className="bi bi-buildings-fill"></h3></Link>
            <Link to={'/employees'}> <h3 className="bi bi-collection-fill"></h3></Link>
            <Link to={'/customers'}> <h3 className="bi bi-people-fill"></h3></Link>
            <Link to={'/deals'}> <h3 className="bi bi-cart-fill"></h3></Link>
            <Link to={'/'}> <h3 className="bi bi-shield-fill"></h3></Link>
            <i className="bi bi-x main-bar"></i>
        </div>
    </div>
  )
}

export default Mini