import React, { Component } from 'react';
import { Form, ListGroup, Card, Button } from 'react-bootstrap';
import { IAppState, IAuthState } from '../../reducers';
import { connect } from 'react-redux';
import * as APICall from '../../utils/APICall';


export interface IAuthProps {
    user: IAuthState;
}

export class SearchCategory extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [],
            input: ""
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.handleRequest(1);
    }

 
    handleChange(event:any){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(this.state.input);
        this.handleRequest(value);
    }


    async handleRequest(num: any) {
        console.log(this.state.input + "hello")
        const response = await APICall.GET('/jobs/category/' + num
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
                <Card className="card" key={i}>
                <Card.Header>Earn: ${item.jobEarnings}</Card.Header>
                    <Card.Body> 
                        <Card.Title>{item.product.itemName}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text> 
                        <Button variant="primary">View</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{item.jobDateTime}</Card.Footer>
            </Card>
            </ListGroup.Item>
            
        })

        return(
            <React.Fragment>
                <h2>user {this.props.user.userProfile.getUsername()} </h2>
                <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} name="input">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    </Form.Control>
                </Form.Group>
                </Form>
                {list}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state:IAppState) => ({
    user: state.auth
});

export default connect(mapStateToProps)(SearchCategory);