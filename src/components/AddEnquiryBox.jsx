import React, { useState } from 'react';
import './AddEnquiryBox.css';
import { addEnquiry } from '../services/AdminAxios';
import { useNavigate } from 'react-router-dom';

const projectStages = [
    "select",
    "BID TO BID",
    "BID TO BUY",
    "BID TO CAUGHT"
];
const regions = [
    "select",
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
    "select",
    "Dropped",
    "Quoted"
];

function AddEnquiryBox() {
    const [client, setClient] = useState('');
    const [endUser, setEndUser] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectStage, setProjectStage] = useState('');
    const [supplyOf, setSupplyOf] = useState('');
    const [region, setRegion] = useState('');
    const [status, setStatus] = useState('');
    const [sectorName, setSectorName] = useState('');
    const [businessUnit, setBusinessUnit] = useState('');
    const [closingDateForQuote, setClosingDateForQuote] = useState('');
    const [quoteNumber, setQuoteNumber] = useState('');
    const [enquiryReceivedDate, setEnquiryReceivedDate] = useState('');
    const [quotationSubmittedDate, setQuotationSubmittedDate] = useState('');
    const [reworkOnQuote, setReworkOnQuote] = useState('');
    const [revisionNumber, setRevisionNumber] = useState('');
    const [engineerQuoting, setEngineerQuoting] = useState('');
    const [approvingManager, setApprovingManager] = useState('');
    const [accountManager, setAccountManager] = useState('');
    const [estimateValueUsd, setEstimateValueUsd] = useState('');
    const [estimateValueAed, setEstimateValueAed] = useState('');
    const [estimateValueRev0, setEstimateValueRev0] = useState('');
    const [reasonForRevision, setReasonForRevision] = useState('');
    const [percWinProbability, setPercWinProbability] = useState('');

    const navigate = useNavigate();



    const formatDateToYYYYMMDD = (date) => {
        console.log(date);
        const [year, month, day] = date.split('-');

        console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);

        return `${day}-${month}-${year}`;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDatas = {
            client,
            end_user: endUser,
            project_name: projectName,
            project_stage: projectStage,
            supply_of: supplyOf,
            region,
            status,
            sector_name: sectorName,
            business_unit: businessUnit,
            closing_date_for_quote: formatDateToYYYYMMDD(closingDateForQuote),
            quote_number: quoteNumber,
            enquiry_received_date: formatDateToYYYYMMDD(enquiryReceivedDate),
            quotation_submitted_date: formatDateToYYYYMMDD(quotationSubmittedDate),
            rework_on_quote: reworkOnQuote,
            revision_number: revisionNumber,
            engineer_quoting: engineerQuoting,
            approving_manager: approvingManager,
            account_manager: accountManager,
            estimate_value_usd: `$${estimateValueUsd}`,
            estimate_value_aed: `${estimateValueAed}AED`,
            estimate_value_rev0: `$${estimateValueRev0}`,
            reason_for_revision: reasonForRevision,
            perc_win_probability: `${percWinProbability}%`
        }


        try {

            const result = await addEnquiry(formDatas);


            console.log('Enquiry added successfully:', result);
            navigate('/enquirelist');
        } catch (error) {
            console.error('Failed to add enquiry:', error);
        }

    };




    return (
        <div className="form-container">
            <form className="enquiry-form" onSubmit={handleSubmit}>
                <h2>Add New Enquiry</h2>

                <div className="form-group">
                    <label htmlFor="client">Client:</label>
                    <input
                        id="client"
                        name="client"
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endUser">End User:</label>
                    <input
                        id="endUser"
                        name="endUser"
                        type="text"
                        value={endUser}
                        onChange={(e) => setEndUser(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                        id="projectName"
                        name="projectName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectStage">Project Stage:</label>
                    <select
                        id="projectStage"
                        name="projectStage"
                        value={projectStage}
                        onChange={(e) => setProjectStage(e.target.value)}
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
                        name="supplyOf"
                        type="text"
                        value={supplyOf}
                        onChange={(e) => setSupplyOf(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="region">Region:</label>
                    <select
                        id="region"
                        name="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
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
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sectorName">Sector Name:</label>
                    <input
                        id="sectorName"
                        name="sectorName"
                        type="text"
                        value={sectorName}
                        onChange={(e) => setSectorName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="businessUnit">Business Unit:</label>
                    <input
                        id="businessUnit"
                        name="businessUnit"
                        type="text"
                        value={businessUnit}
                        onChange={(e) => setBusinessUnit(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="closingDateForQuote">Closing Date for Quote:<span className="mandatory-star">*</span></label>
                    <input
                        id="closingDateForQuote"
                        name="closingDateForQuote"
                        type="date"
                        required
                        value={closingDateForQuote}
                        onChange={(e) => setClosingDateForQuote(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quoteNumber">Quote Number:</label>
                    <input
                        id="quoteNumber"
                        name="quoteNumber"
                        type="text"
                        value={quoteNumber}
                        onChange={(e) => setQuoteNumber(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="enquiryReceivedDate">Enquiry Received Date:<span className="mandatory-star">*</span></label>
                    <input
                        id="enquiryReceivedDate"
                        name="enquiryReceivedDate"
                        type="date"
                        required
                        value={enquiryReceivedDate}
                        onChange={(e) => setEnquiryReceivedDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quotationSubmittedDate">Quotation Submitted Date:<span className="mandatory-star">*</span></label>
                    <input
                        id="quotationSubmittedDate"
                        name="quotationSubmittedDate"
                        required
                        type="date"
                        value={quotationSubmittedDate}
                        onChange={(e) => setQuotationSubmittedDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reworkOnQuote">Rework on Quote:</label>
                    <input
                        id="reworkOnQuote"
                        name="reworkOnQuote"
                        type="text"
                        value={reworkOnQuote}
                        onChange={(e) => setReworkOnQuote(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="revisionNumber">Revision Number:</label>
                    <input
                        id="revisionNumber"
                        name="revisionNumber"
                        type="text"
                        value={revisionNumber}
                        onChange={(e) => setRevisionNumber(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="engineerQuoting">Engineer Quoting:</label>
                    <input
                        id="engineerQuoting"
                        name="engineerQuoting"
                        type="text"
                        value={engineerQuoting}
                        onChange={(e) => setEngineerQuoting(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="approvingManager">Approving Manager:</label>
                    <input
                        id="approvingManager"
                        name="approvingManager"
                        type="text"
                        value={approvingManager}
                        onChange={(e) => setApprovingManager(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="accountManager">Account Manager:</label>
                    <input
                        id="accountManager"
                        name="accountManager"
                        type="text"
                        value={accountManager}
                        onChange={(e) => setAccountManager(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="estimateValueUsd">Estimate Value USD:</label>
                    <input
                        id="estimateValueUsd"
                        name="estimateValueUsd"
                        type="text"
                        value={estimateValueUsd}
                        onChange={(e) => setEstimateValueUsd(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="estimateValueAed">Estimate Value AED:</label>
                    <input
                        id="estimateValueAed"
                        name="estimateValueAed"
                        type="text"
                        value={estimateValueAed}
                        onChange={(e) => setEstimateValueAed(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="estimateValueRev0">Estimate Value Rev0:</label>
                    <input
                        id="estimateValueRev0"
                        name="estimateValueRev0"
                        type="text"
                        value={estimateValueRev0}
                        onChange={(e) => setEstimateValueRev0(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reasonForRevision">Reason for Revision:</label>
                    <select
                        id="reasonForRevision"
                        name="reasonForRevision"
                        value={reasonForRevision}
                        onChange={(e) => setReasonForRevision(e.target.value)}
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
                        name="percWinProbability"
                        type="number"
                        min="0"
                        max="100"
                        value={percWinProbability}
                        onChange={(e) => setPercWinProbability(e.target.value)}
                    />
                </div>

                <div className='buttonBox'><button type="submit" className="submit-button">Submit</button></div>
            </form>
        </div>
    );
}

export default AddEnquiryBox;
