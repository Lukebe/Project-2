import React from 'react';
import { Container, Row, Button, Carousel } from 'react-bootstrap';
import './Landing.css';
interface IState {

}
interface IProps{

}
export default class Landing extends React.Component<IProps,IState>{


    render() {
        return(
            <>
            <Carousel controls = {false} className = "landing-background-carousel">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="http://writingexercises.co.uk/images2/randomimage/balloons.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="http://writingexercises.co.uk/images2/randomimage/trafalgar.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="http://writingexercises.co.uk/images2/randomimage/waterfall.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            <Container className = "landing-container">
                
                <Row><h1>Kutsies</h1></Row>
                <Row><p>Sample text about application...</p></Row>
                <Row>
                    <Button>Make</Button>
                    <Button>Work</Button>
                </Row>
            </Container>
            </>
        )
    }
}