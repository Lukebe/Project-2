import React, { Component } from 'react';
import { Card, Button, Carousel, Badge } from 'react-bootstrap';
import Samsung from '../../resources/images/Featured/samsung.jpg';
import PS4 from '../../resources/images/Featured/ps4.jpg';

export default class Featured extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [
               {id:"1", product:"Playstation", Date:"1/1/2019", Time:"2:23PM", Location:"123 W. Avenue, Tampa, FL 33612", Category:"Gaming", ProductPrice:"$400", Earnings:"$100", Description:"New Playstation release only available at best buy", img: PS4},
               {id:"2", product:"product2", Date:"1/2/2019", Time:"3:23PM", Location:"122 W. Avenue, Tampa, FL 60606", Category:"Gaming", Earnings:"$9.99", Description:"Description here", img: Samsung},
               {id:"3", product:"product3", Date:"1/3/2019", Time:"4:23PM", Location:"124 W. Avenue, Tampa, FL 60606", Category:"Shoes", Earnings:"$9.99", Description:"Description here", img: Samsung},
               {id:"4", product:"product4", Date:"1/4/2019", Time:"5:23PM", Location:"125 W. Avenue, Tampa, FL 60606", Category:"Event", Earnings:"$9.99", Description:"Description here", img: Samsung}
            ]
        } 
    }

    render() {
        const caro = this.state.data.map((item:any, i:any) =>{
            return <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={ item.img }
                        alt={ item.id}
                        />

                        <Carousel.Caption>
                        <h3>{item.product}</h3>
                        <p>{item.Description}</p>
                        <Button variant="primary">View</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
        })
        return( 
            <div>
                <React.Fragment>
                    <h2>
                        Featured Jobs <Badge variant="secondary">New</Badge>
                    </h2>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={Samsung}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>NEW NOTE 10 Release</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            <Button variant="primary">View</Button>
                            </Carousel.Caption>   
                        </Carousel.Item>
                        {caro}
                    </Carousel>
                </React.Fragment>
            </div>
        );
    }
}