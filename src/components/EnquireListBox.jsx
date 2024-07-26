import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EnquireListBox.css';
import { fetchEnquiries } from '../services/AdminAxios';

function EnquireListBox() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("access_token");
  
    const fetchData = async () => {
      if (token) {
        try {
          const data = await fetchEnquiries();
          setEnquiries(data);
          console.log('Enquiries fetched:', data);
        } catch (error) {
          console.error('Failed to fetch enquiries:', error);
        }
      }
    };
    fetchData();
  }, []);

  const filteredEnquiries = enquiries.filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    
    'client',
    'closing_date_for_quote',
    'end_user',
    'engineer_quoting',
    'enquiry_id',
    'enquiry_no','account_manager',
    'approving_manager',
    'business_unit'
  ];
  
return(
  <div className="table-container">
  <div className="add-new-container">
    <Link to="/add-enquiry" className="add-new-link">Add New Enquiry</Link>
  </div>
  <div className="header-container">
    <h2 className="header-heading">LIST OF ENQUIRIES</h2>
    <input
      type="text"
      className="search-input"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="table-wrapper">
    <table className="styled-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredEnquiries.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{item[column] ? item[column] : 'N/A'}</td>
            ))}
            <td>
              <Link to={`/view/${item.enquiry_id}`} className="view-link">
                View
              </Link>
              <h4></h4>
              <Link to={`/edit/${item.enquiry_id}`} className="view-link">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
}

export default EnquireListBox;
