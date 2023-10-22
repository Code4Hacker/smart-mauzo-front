import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jQuery from 'jquery'
const Mini2 = () => {
    const queries = () => {
        jQuery(".main-bar").on("click", function(){
            jQuery(".sidebar").removeClass("minimized");
            jQuery(".dashboard_grid_container").removeClass("minimized");
            jQuery(".mini-sidebar>*").removeClass("minimized");
        });
    }
    useEffect(() => {queries()},[]);
    const navigate = useNavigate();
    const handleLog = () => {
        window.localStorage.clear();
        navigate('/e_login');
    }
  return (
    <div className='mini-sidebar'>
        <div className="container">
            <Link to={'/employee'}> <h3 className="bi bi-house"></h3></Link>
            <Link to={'/e_customers'}> <h3 className="bi bi-collection"></h3></Link>
            <Link to={'/userEmp'}> <h3 className="bi bi-people"></h3></Link>
            <Link to={'/stuff_members'}> <h3 className="bi bi-person-workspace"></h3></Link>
            <Link to={'/repo'}> <h3 className="bi bi-building"></h3></Link>
            <div  onClick={handleLog}> <h3 className="bi bi-shield"></h3></div>
            <i className="bi bi-x main-bar"></i>
        </div>
    </div>
  )
}

export default Mini2