import React from "react";
import { CFooter, CLink } from '@coreui/react'
import './FooterStyles.css'

function Footer() {
  return (
    <div className="footer-div">
    <CFooter>
      {/* <CLink href="https://coreui.io">CoreUI</CLink> */}
      <span>&copy; 2021 Scientia - </span>
      <span>Powered by HENRY</span>
      {/* <CLink href="https://coreui.io">CoreUI</CLink> */}
  </CFooter>
    </div>
  )
}

export default Footer