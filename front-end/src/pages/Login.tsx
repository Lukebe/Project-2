import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Form } from "react-bootstrap";

export default class Login extends Component <any,any>{

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleSubmit(event:any) {  
        event.preventDefault();
        this.handleRequest();
    }

    handleLink() {
        this.props.history.push('/');
    }

    handleUpdate(event:any) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    async handleRequest() {
        const url =``;
        try {
            let response = await Axios.post(url, {
                    username: this.state.username,
                    password: this.state.password
                });

            console.log(response.status);
            console.log('returned data:', response);

            this.handleLink();
            
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
            alert("Invalid Credentials");
        }
    }

    render() {
        return (
            <div className="Login">
                <h2>Login</h2>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            required
                            autoFocus
                            type="text" 
                            placeholder="Enter username" 
                            value={this.state.username}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Button variant="primary" 
                            type="submit"
                            size="lg" 
                            block>
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}