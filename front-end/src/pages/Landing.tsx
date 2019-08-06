import React from 'react';
import { Container, Row, Button, Carousel } from 'react-bootstrap';
import './Landing.css';
import { IAuthState, IAppState } from '../reducers';
import { setRedirect } from '../actions/Authentication.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
interface IState {
    buttonClicked : boolean,
}

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    setRedirect: (url : string) => void;
}
export class Landing extends React.Component<IAuthProps,IState>{
    constructor(props: any){
        super(props);
        this.state = {
            buttonClicked: false
        }
    }
    handleButtonClick = (event: any) => {
        this.props.setRedirect(event.target.name);
        this.setState({...this.state, buttonClicked: true});
    }
    render() {
        return(
            <div className = 'landing-background'>
                {this.state.buttonClicked ? <Redirect to = "/login"/> : null }
            <Carousel controls = {false} indicators = {false} className = "landing-background-carousel">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="http://writingexercises.co.uk/images2/randomimage/balloons.jpg"
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="http://writingexercises.co.uk/images2/randomimage/trafalgar.jpg"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="http://writingexercises.co.uk/images2/randomimage/waterfall.jpg"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            <Container className = "landing-container">
                
                <Row>
                    <h1>Kutsies</h1>
                    <hr className = 'hr-light'/>
                </Row>
                <Row><p className = 'landing-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis officia voluptatem nulla nemo temporibus accusantium inventore, labore consequuntur suscipit voluptatum incidunt sed quisquam, esse dicta qui adipisci doloremque. Deserunt, vel!
                Quod quas nam quos saepe quisquam culpa tempore dolor laboriosam animi? Rem consequuntur et explicabo quaerat quae qui quidem ea! Minima debitis quod quae pariatur nulla dignissimos labore in ab?
                Itaque sed quis reiciendis? Modi labore voluptatem enim error, vero esse quidem voluptas nulla iusto beatae velit dignissimos sunt veritatis quam adipisci magnam suscipit totam tempora asperiores doloremque odit maiores.</p></Row>
                <Row className = 'landing-buttons'>
                    <Button name = "make" onClick = {this.handleButtonClick}>Make</Button>
                    <Button name = "work" onClick = {this.handleButtonClick}>Work</Button>
                </Row>
            </Container>
            </div>
        )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    setRedirect: setRedirect,
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);