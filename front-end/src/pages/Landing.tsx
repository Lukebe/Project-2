import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import './Landing.css';
interface IState {

}
interface IProps{

}
export default class Landing extends React.Component<IProps,IState>{


    render() {
        return(
            <Container className = "landing-container">
                <Row><h1>Kutsies</h1></Row>
                <Row><p>Sample text about application...</p></Row>
                <Row>
                    <Button>Make</Button>
                    <Button>Work</Button>
                </Row>
            </Container>
        )
    }
}