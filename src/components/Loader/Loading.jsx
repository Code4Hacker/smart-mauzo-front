import React, { useEffect } from 'react'
import './style.css'
import jQuery from 'jquery'
const Loading = () => {
  useEffect(() => {
    setTimeout(() => {
      jQuery(".loadingme").fadeOut({
        duration: 300, done: function () {
          jQuery(".msg_load").fadeIn({ duration: 600 });
        }
      })
    }, 6000);
  }, []);
  return (
    <>
      <div className="msg_load x-small" style={{display:'none'}}>Nothing Found!</div>
      <div className="loadingme">
        <div className="loading"></div>
      </div>
    </>
  )
}

export default Loading