import React, { Component } from 'react';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './PostJob.css';



export default class PostJob extends Component<any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            data: []
        }

    }

    render() {
        return (
            <div className = "flex-container"><form>

            <h1>Post a Job</h1>

                <label>
                    Address:  <input type="text" name="address" value="address" />
                </label>


                <label>
                    Description:
        <input type="text" name="description" value="description" />
                </label>

                <label>
                    Due Date:
        <input type="date" name="dueDate" value="date" />
                </label>

                <label>

                    Job Price:
        <input type="number" name="jobPrice" value="Earnings" />
                </label>

                <label>
                    Product:
        <input type="number" name="product" value="What are they buying" />
                </label>

                <label>
                    Product:
        <input type="text" name="productPrice" value="itemPrice" />
                </label>

                <label>

                    Category:
        <input type="text" name="category" value="Item Category" />
                </label>



                <label>

                    
                    Time Estimate:
        <input type="number" name="timeEstimate" value="
        time Estimate" />
                </label>


                <label>

                    Status:
        <input type="text" name="status" value="New" />
                </label>
                <div className="postJobButton">
                <input type="button" value="Submit" />
                <input type="button" value="Cancel" />
                </div>
            </form></div>
            
        );
    }
}