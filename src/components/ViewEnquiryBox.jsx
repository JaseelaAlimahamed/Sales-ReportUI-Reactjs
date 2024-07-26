import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteEnquiry, fetchEnquiry } from '../services/AdminAxios';
import './EditEnquiryBox.css';

function ViewEnquiryBox() {
    const { enquiry_id } = useParams();
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const loadEnquiry = async () => {
            try {
                const enquiryData = await fetchEnquiry(enquiry_id);
                setData(enquiryData);
            } catch (error) {
                console.error('Failed to load enquiry:', error);
                setErrorMessage('Failed to load enquiry data');
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



    if (!data) return <div>Loading...</div>;
    if (errorMessage) return <div className="error-message">{errorMessage}</div>;

    return (
        <div className="form-container">
            <div className="view-form">
                <h2>View Enquiry</h2>

                <div className="form-group">
                    <label htmlFor="client">Client:</label>
                    <p id="client">{data.client}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="endUser">End User:</label>
                    <p id="endUser">{data.end_user}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="projectName">Project Name:</label>
                    <p id="projectName">{data.project_name}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="projectStage">Project Stage:</label>
                    <p id="projectStage">{data.project_stage}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="supplyOf">Supply Of:</label>
                    <p id="supplyOf">{data.supply_of}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="region">Region:</label>
                    <p id="region">{data.region}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <p id="status">{data.status}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="sectorName">Sector Name:</label>
                    <p id="sectorName">{data.sector_name}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="businessUnit">Business Unit:</label>
                    <p id="businessUnit">{data.business_unit}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="closingDateForQuote">Closing Date for Quote:</label>
                    <p id="closingDateForQuote">{data.closing_date_for_quote}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="quoteNumber">Quote Number:</label>
                    <p id="quoteNumber">{data.quote_number}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="enquiryReceivedDate">Enquiry Received Date:</label>
                    <p id="enquiryReceivedDate">{data.enquiry_received_date}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="quotationSubmittedDate">Quotation Submitted Date:</label>
                    <p id="quotationSubmittedDate">{data.quotation_submitted_date}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="reworkOnQuote">Rework on Quote:</label>
                    <p id="reworkOnQuote">{data.rework_on_quote}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="revisionNumber">Revision Number:</label>
                    <p id="revisionNumber">{data.revision_number}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="engineerQuoting">Engineer Quoting:</label>
                    <p id="engineerQuoting">{data.engineer_quoting}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="approvingManager">Approving Manager:</label>
                    <p id="approvingManager">{data.approving_manager}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="accountManager">Account Manager:</label>
                    <p id="accountManager">{data.account_manager}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="estimateValueUsd">Estimate Value USD:</label>
                    <p id="estimateValueUsd">{data.estimate_value_usd}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="estimateValueAed">Estimate Value AED:</label>
                    <p id="estimateValueAed">{data.estimate_value_aed}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="estimateValueRev0">Estimate Value Rev0:</label>
                    <p id="estimateValueRev0">{data.estimate_value_rev0}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="reasonForRevision">Reason for Revision:</label>
                    <p id="reasonForRevision">{data.reason_for_revision}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="percWinProbability">Percentage Win Probability:</label>
                    <p id="percWinProbability">{data.perc_win_probability}</p>
                </div>

                <div className="form-group">
                    <button onClick={handleDelete} className="delete-button">Delete Enquiry</button>
                </div>

            </div>
        </div>
    );
}

export default ViewEnquiryBox;
