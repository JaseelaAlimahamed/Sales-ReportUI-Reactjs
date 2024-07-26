import React from 'react'
import ViewEnquiryBox from '../components/ViewEnquiryBox'
import Navbar from '../components/Navbar'

function ViewEnquiry() {
  return (
    <div>
        <div>
            <Navbar/>
            <div style={{ marginTop: '20px' }}>
                <ViewEnquiryBox />
            </div>
        </div>
    </div>
  )
}

export default ViewEnquiry
