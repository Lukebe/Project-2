import React from 'react';
import './App.css';


const jobComponent: React.FC = () => {
    return (


        <div id="create-job-main-container">
            <p>New Job Post</p>

            <div>  Name</div>
            <input type="text" id="createjob_id" name="createjob_model" />

            <div>Author: </div>
            <input type="text" id="author" name="author_number" />

            <div>Amount:</div>
            <input type="text" id="createjob_amount" />

            <div>Date Submitted:</div>
            <input type="date" id="date_submitted" />

            <div>Date Resolved:</div>
            <input type="date" id="date_resolved" />

            <div>Description:</div>
            <input type="text" id="description" />

            <div>Description:</div>
            <input type="text" id="resolver" />
            <div>Status:</div>
            <input type="text" id="status" />                                        <div>
                <div>Type:</div>
                <input type="text" id="type" />

                <div id="submit-form-user">Submit</div>
                <input type="text" id="submit-input-user" />
                <button id="submit-create-job">Request createjob</button>
            </div>
        </div>
    );
}

export default jobComponent;