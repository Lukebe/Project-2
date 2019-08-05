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
            <div className = 'landing-background'>
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
                    <Button>Make</Button>
                    <Button>Work</Button>
                </Row>
            </Container>
            </div>
        )
    }
}