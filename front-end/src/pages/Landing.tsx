import React from 'react';
import { Container, Row, Button, Carousel, Col } from 'react-bootstrap';
import './Landing.css';
import { IAuthState, IAppState } from '../reducers';
import { setRedirect } from '../actions/Authentication.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Login from './Login'
interface IState {
    buttonClicked : boolean,
    loginDialogOpen : boolean,
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
            buttonClicked: false,
            loginDialogOpen: false,
        }
    }
    handleModalClose = (event: any) =>   {
        this.setState({...this.state, loginDialogOpen: false})
    }
    handleButtonClick = (event: any) => {
        this.props.setRedirect(event.target.name);
        this.setState({...this.state, loginDialogOpen: true});
    }
    render() {
        return(
            <div className = 'landing-background'>
                {this.state.buttonClicked ? <Redirect to = "/login"/> : null }
                {this.state.loginDialogOpen ? <Login updateCallback = {this.handleModalClose}/> : null }
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
                <Row noGutters><Col className = "border-right"><p className = 'landing-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Reiciendis officia voluptatem nulla nemo temporibus accusantium inventore, labore consequuntur suscipit voluptatum 
                incidunt sed quisquam, esse dicta qui adipisci doloremque. Deserunt, vel!
                Quod quas nam quos saepe quisquam culpa tempore dolor laboriosam animi? </p>
                <Button name = "make" className = "landing-button" onClick = {this.handleButtonClick}>Make</Button>
                </Col>
                <Col><p className = 'landing-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Reiciendis officia voluptatem nulla nemo temporibus accusantium inventore, labore consequuntur suscipit voluptatum 
                incidunt sed quisquam, esse dicta qui adipisci doloremque. Deserunt, vel!
                Quod quas nam quos saepe quisquam culpa tempore dolor laboriosam animi? </p>
                <Button name = "work" className = "landing-button" onClick = {this.handleButtonClick}>Work</Button>
                </Col></Row>
            </Container>
            {}
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