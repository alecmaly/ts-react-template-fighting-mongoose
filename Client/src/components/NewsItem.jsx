import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import {
    Button,
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText,
    CardBody
    } from 'reactstrap';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import '../Styles/Theme.css';

import { deleteNews } from '../API/api';

class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = { URLwithQuotes: '${this.props.cardURL}' };
    }


    deleteItem() {
        deleteNews(this.props.cardID)
          .then (updatedNews => this.props.updateNews(updatedNews) );
    }

    render() {
                return (

            <div className='NewsItem'>
                <Card>
                    <CardTitle className='align-right icon'><span onClick={this.deleteItem}>X</span></CardTitle>
                    <CardImg top width='100%' style={{'maxHeight':'300px'}} src='https://cheatsheets.blob.core.windows.net/pdfs/Fighting%20Mongoose.png' />
                    <CardTitle>{this.props.cardTitle}</CardTitle>
                    <CardBody>{this.props.cardSubtitle}</CardBody>
                    <CardText>{this.props.cardDetail}</CardText>
                    {/*<a href={`${this.props.cardUrl}`} target='_new'>*/}

                    <Link to='/News/NewsDetail'>
                        <Button color='info'>View More</Button>
                    </Link>
                    <br />
                </Card>
            </div>
        );
    }
}

export default NewsItem;
