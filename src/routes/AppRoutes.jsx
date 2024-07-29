import React from 'react'
import { Route,Navigate, Routes } from 'react-router-dom'
import LogIn from '../pages/LogIn'
import EnquireList from '../pages/EnquireList'
import AddEnquiry from '../pages/AddEnquiry'
import Authentication from '../middleware/Authentication'
import EditEnquiry from '../pages/EditEnquiry'
import ViewEnquiry from '../pages/ViewEnquiry'


function AppRoutes() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/enquirelist" element={<Authentication><EnquireList/></Authentication>} />
      <Route path="/add-enquiry" element={<Authentication><AddEnquiry/></Authentication>} />
      <Route path="/edit/:enquiry_id" element={<Authentication><EditEnquiry/></Authentication>} />
      <Route path="/view/:enquiry_id" element={<Authentication><ViewEnquiry/></Authentication>} />
      </Routes>
    </div>
  )
}

export default AppRoutes
