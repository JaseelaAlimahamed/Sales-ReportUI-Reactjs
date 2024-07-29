// src/components/EditEnquiryBox.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteEnquiry, fetchEnquiry } from '../services/AdminAxios';
import { updateEnquiry } from '../services/AdminAxios'
import './EditEnquiryBox.css';

const projectStages = [
  "BID TO BID",
  "BID TO BUY",
  "BID TO CAUGHT"
];

const regions = [
  "UAE",
  "KSA",
  "INDIA",
  "IRAN",
  "QATAR",
  "USA",
  "UK",
  "EGYPT",
  "IRAQ"
];
const reasonsForRevision = [
  "Dropped",
  "Quoted"
];

function EditEnquiryBox() {

  const id = useParams();
  const enquiry_id = id.enquiry_id
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadEnquiry = async () => {
      try {
        const enquiryData = await fetchEnquiry(enquiry_id);
        setData(enquiryData);
      } catch (error) {
        console.error('Failed to load enquiry:', error);
      }
    };

    loadEnquiry();
  }, [enquiry_id]);

  const handleDelete = async () => {
    try {
      await deleteEnquiry(enquiry_id);
      console.log('Enquiry deleted successfully');
      navigate('/enquirelist');
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
      setErrorMessage('Failed to delete enquiry');
    }
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await updateEnquiry(data);
      setSuccessMessage(message);
      setErrorMessage('');
      navigate('/enquirelist');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  if (!data) return <div>Loading...</div>;

  return (
    <div className="form-container">
        
      <form className="enquiry-form" onSubmit={handleSubmit}>
        <div className='buttonBoxHead'><h2>Edit Enquiry</h2>
                    <div className="form-groups">
                     <button onClick={handleDelete} className="delete-button">Delete Enquiry</button>
                    </div>
                </div>

        <div className="form-group">
          <label htmlFor="client">Client:</label>
          <input
            id="client"
            name="client"
            type="text"
            value={data.client || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endUser">End User:</label>
          <input
            id="endUser"
            name="end_user"
            type="text"
            value={data.end_user || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            id="projectName"
            name="project_name"
            type="text"
            value={data.project_name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectStage">Project Stage:</label>
          <select
            id="projectStage"
            name="project_stage"
            value={data.project_stage || ''}
            onChange={handleChange}
          >
            {projectStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="supplyOf">Supply Of:</label>
          <input
            id="supplyOf"
            name="supply_of"
            type="text"
            value={data.supply_of || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <select
            id="region"
            name="region"
            value={data.region || ''}
            onChange={handleChange}
          >
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            name="status"
            type="text"
            value={data.status || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sectorName">Sector Name:</label>
          <input
            id="sectorName"
            name="sector_name"
            type="text"
            value={data.sector_name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessUnit">Business Unit:</label>
          <input
            id="businessUnit"
            name="business_unit"
            type="text"
            value={data.business_unit || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="closingDateForQuote">Closing Date for Quote:</label>
          <input
            id="closingDateForQuote"
            name="closing_date_for_quote"
            value={data.closing_date_for_quote || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quoteNumber">Quote Number:</label>
          <input
            id="quoteNumber"
            name="quote_number"
            type="text"
            value={data.quote_number || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="enquiryReceivedDate">Enquiry Received Date:</label>
          <input
            id="enquiryReceivedDate"
            name="enquiry_received_date"
            value={data.enquiry_received_date || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quotationSubmittedDate">Quotation Submitted Date:</label>
          <input
            id="quotationSubmittedDate"
            name="quotation_submitted_date"
            value={data.quotation_submitted_date || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reworkOnQuote">Rework on Quote:</label>
          <input
            id="reworkOnQuote"
            name="rework_on_quote"
            type="text"
            value={data.rework_on_quote || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="revisionNumber">Revision Number:</label>
          <input
            id="revisionNumber"
            name="revision_number"
            type="text"
            value={data.revision_number || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="engineerQuoting">Engineer Quoting:</label>
          <input
            id="engineerQuoting"
            name="engineer_quoting"
            type="text"
            value={data.engineer_quoting || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="approvingManager">Approving Manager:</label>
          <input
            id="approvingManager"
            name="approving_manager"
            type="text"
            value={data.approving_manager || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountManager">Account Manager:</label>
          <input
            id="accountManager"
            name="account_manager"
            type="text"
            value={data.account_manager || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estimateValueUsd">Estimate Value USD:</label>
          <input
            id="estimateValueUsd"
            name="estimate_value_usd"
            type="text"
            value={data.estimate_value_usd || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estimateValueAed">Estimate Value AED:</label>
          <input
            id="estimateValueAed"
            name="estimate_value_aed"
            type="text"
            value={data.estimate_value_aed || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estimateValueRev0">Estimate Value Rev0:</label>
          <input
            id="estimateValueRev0"
            name="estimate_value_rev0"
            type="text"
            value={data.estimate_value_rev0 || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reasonForRevision">Reason for Revision:</label>
          <select
            id="reasonForRevision"
            name="reason_for_revision"
            value={data.reason_for_revision || ''}
            onChange={handleChange}
          >
            {reasonsForRevision.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="percWinProbability">Percentage Win Probability:</label>
          <input
            id="percWinProbability"
            name="perc_win_probability"
            value={data.perc_win_probability || ''}
            onChange={handleChange}
          />
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className='buttonBox'><button type="submit" className="submit-button">Submit</button></div>


      </form>

    </div>
  );
}

export default EditEnquiryBox;
