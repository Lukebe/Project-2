import React, { Component } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import * as APICall from '../../utils/APICall';
import { IAppState, IAuthState } from '../../reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export interface IAuthProps {
    user: IAuthState;
}

export class MyJobs extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: []
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.handleRequest();
    }


    async handleRequest() {
        const userid = this.props.user.userProfile.getUserId();
        const response = await APICall.GET('/jobs/useraccepted/2'
        ,this.props.user.userProfile.getToken());

        if(await response instanceof Error){
        } else { 
            let res = response.content;
            this.setState({
                data: res
            })
            console.log(this.state.data);
        }
        console.log(await response);
    }

    render() {

        const list = this.state.data.map((item:any, i:any) => {
            return <ListGroup.Item className="list" key={i}>
                <Card border="info" className="card" key={i}>
                    <Card.Body >
                        <div className="cardContainer">
                        <Card.Text className="userCardText">{item.description}<br></br>{item.address}<br></br>{item.jobDateTime}</Card.Text>
                        <Card.Link className="userCardLink" as={Link} to="/userportal/jobview"><br></br>Card Link</Card.Link>
                        </div>
                    </Card.Body>
                </Card> 
            </ListGroup.Item>
        })

        return(
            <React.Fragment>
                <h1>My Jobs</h1>
                <ListGroup>
                    <ListGroup.Item>
                    <Card>
                        {list}
                    </Card>
                    </ListGroup.Item>
                </ListGroup>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state:IAppState) => ({
    user: state.auth
});
 
export default connect(mapStateToProps)(MyJobs);