import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jQuery from 'jquery'
const Mini = () => {
    const queries = () => {
        jQuery(".main-bar").on("click", function(){
            jQuery(".sidebar").removeClass("minimized");
            jQuery(".dashboard_grid_container").removeClass("minimized");
            jQuery(".mini-sidebar>*").removeClass("minimized");
        });
    }
    const navigate = useNavigate();
    useEffect(() => { queries() }, []);
    const handleLog = () => {
        window.localStorage.clear();
        navigate('/');
    }
  return (
    <div className='mini-sidebar'>
        <div className="container">
            <Link to={'/admin'}> <h3 className="bi bi-buildings"></h3></Link>
            <Link to={'/employees'}> <h3 className="bi bi-collection"></h3></Link>
            <Link to={'/customers'}> <h3 className="bi bi-people"></h3></Link>
            <Link to={'/deals'}> <h3 className="bi bi-cart"></h3></Link>
            <Link to={'/stuff'}> <h3 className="bi bi-personal-workspace"></h3></Link>
            <Link to={'/search_'}> <h3 className="bi bi-search"></h3></Link>
            <Link to={'/report'}> <h3 className="bi bi-building"></h3></Link>
            <div onClick={handleLog}> <h3 className="bi bi-shield"></h3></div>
            <i className="bi bi-x main-bar"></i>
        </div>
    </div>
  )
}

export default Mini