import React from "react";
import { CFooter } from '@coreui/react'
import './FooterStyles.css'

function Footer() {
  return (
    <div className="footer-div">
    <CFooter>
      <span>&copy; 2021 Scientia - </span>
      <span>Powered by HENRY</span>
  </CFooter>
    </div>
  )
}

export default Footer