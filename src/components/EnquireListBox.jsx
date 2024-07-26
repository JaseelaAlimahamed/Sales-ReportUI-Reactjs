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

  const keys = enquiries.length > 0 ? Object.keys(enquiries[0]) : [];

  return (
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
              {keys.map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((item, index) => (
              <tr key={index}>
                {keys.map((key) => (
                  <td key={key}>{item[key] ? item[key] : 'N/A'}</td>
                ))}
                <td>
                <Link to={`/view/${item.enquiry_id}`} className="view-link">
                    View
                  </Link>
                 <h4> </h4>
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
