import React from 'react'
import Navbar from '../components/Navbar'
import EditEnquiryBox from '../components/EditEnquiryBox'


function EditEnquiry() {

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '20px' }}>
                <EditEnquiryBox />
            </div>
        </div>
    )
}

export default EditEnquiry
