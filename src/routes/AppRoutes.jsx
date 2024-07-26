import React from 'react'
import { Route,Router, Routes } from 'react-router-dom'
import LogIn from '../pages/LogIn'
import EnquireList from '../pages/EnquireList'
import AddEnquiry from '../pages/AddEnquiry'
import Authentication from '../api/Authentication'
import EditEnquiry from '../pages/EditEnquiry'
import ViewEnquiry from '../pages/ViewEnquiry'


function AppRoutes() {
  return (
    <div>
      <Routes>
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
