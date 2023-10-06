import React, { useEffect } from 'react'
import './style.css'
import jQuery from 'jquery'

const Loader = () => {

  const preloader = () => {
    setTimeout(() => {
      jQuery(".pre-loader").fadeOut({duration:1000});
    }, 2000);
  }
  useEffect(() => {
    preloader();
  });
  return (
    <div className="pre-loader">
      <div className="loading"></div>
    </div>
  )
}

export default Loader