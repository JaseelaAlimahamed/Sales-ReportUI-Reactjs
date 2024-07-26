import React from 'react'
import Navbar from '../components/Navbar'
import AddEnquiryBox from '../components/AddEnquiryBox'

function AddEnquiry() {
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '20px' }}>
                <AddEnquiryBox />
            </div>
        </div>
    )
}

export default AddEnquiry
