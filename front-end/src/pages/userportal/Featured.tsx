import React, { Component } from 'react';
import { Card, Button, Carousel, Badge } from 'react-bootstrap';
import Samsung from '../../resources/images/Featured/samsung.jpg';
import PS4 from '../../resources/images/Featured/ps4.jpg';
import { IAuthState, IAppState } from '../../reducers';
import { connect } from 'react-redux';
import { Job } from '../../models/Job';
import * as APICall from '../../utils/APICall';

export interface IAuthProps {
    user: IAuthState;
}


export class Featured extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data:[]
        } 
    }

    componentDidMount(){
        this.handleRequest();
    }

    async handleRequest() {
        const userid = this.props.user.userProfile.getUserId();
        const response = await APICall.GET('/jobs/popular/5?days=864000'
        ,this.props.user.userProfile.getToken());

        if(await response instanceof Error){
        } else { 
            let responseArray = response.content;
            this.setState({
                data : response
            }) 
            console.log(this.state.data);
        } 
        console.log(await response);
    } 

    render() {
        const caro = this.state.data.map((item:any, i:any) =>{
            return <Carousel.Item key={i}>
                        <img
                        className="d-block w-100"
                        src={item.product.imageUrl}
                        alt="image of product"
                        />
                        <Carousel.Caption>
                        <h3>{item.product.itemName}</h3>
                        <p>{item.product.description}</p> 
                        <p>{item.count} People Are Currently Looking to Get This Item</p>
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
                            <p></p>
                            </Carousel.Caption>   
                        </Carousel.Item>
                        {caro}
                    </Carousel>
                </React.Fragment>
            </div>
        );
    }
}

const mapStateToProps = (state:IAppState) => ({
    user: state.auth
});

export default connect(mapStateToProps)(Featured);