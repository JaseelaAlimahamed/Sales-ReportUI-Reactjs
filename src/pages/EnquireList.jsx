import React from 'react'
import EnquireListBox from '../components/EnquireListBox'
import Navbar from '../components/Navbar';

function EnquireList() {
  return (
    <div>
        <Navbar />
        <div style={{ marginTop: '20px' }}>
      <EnquireListBox/>
      </div>
    </div>
  )
}

export default EnquireList;
