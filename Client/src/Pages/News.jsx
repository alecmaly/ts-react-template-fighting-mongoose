import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { Route, Link, Switch } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Modal,
    ModalHeader,
    ModalBody } from 'reactstrap';
import '../Styles/Navigation.css';

import NewsItem from '../Components/NewsItem';
import NewNewsItem from '../Components/NewNewsItem';

import { getNews } from '../API/api';

class News extends Component {
    constructor(props) {
        super(props);
        this.createNews = this.createNews.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.createNewsStory = this.createNewsStory.bind(this);
        this.toggleNewItem = this.toggleNewItem.bind(this);
        this.state = {
            newNewsItem: false,
            news : [
                {
                    // Add loading icon for when API is slow to respond 
                    'Title':'LOADING',
                    'SubTitle': 'loading',
                    'Detail':'Detail about loading',
                    'URL':'#'
                }
            ]
        };
    }


    componentDidMount() {
        getNews().then( updatedNews => this.setState({ news: updatedNews }) );
    }


    updateNews() {
        getNews()
            .then( updatedNews => this.setState({ news: updatedNews }));
    }

    toggleNewItem() {
        this.setState({
            newNewsItem: !this.state.newNewsItem
        });
    }

    createNewsStory(newsItem, i){
        return (
            <Col xm='12' sm='6' md='4' lg='3' xl='2'>
                <NewsItem className='customCard' updateNews={this.updateNews} cardID={newsItem.id} cardTitle={newsItem.Title} cardSubtitle={newsItem.SubTitle} cardDetail={newsItem.Detail}  cardUrl={newsItem.URL} />
            </Col>
        );
    }

    createNews(newsItems) {
        return newsItems.map(this.createNewsStory);
    }

    render() {
        return (
            <div>
                {/* Modal for new news item */}
                <Modal isOpen={this.state.newNewsItem} toggle={this.toggleNewItem}>
                    <ModalHeader>
                        New News Item
                    </ModalHeader>
                    <ModalBody>
                        <NewNewsItem toggleModal={this.toggleNewItem} updateNews={this.updateNews} />
                    </ModalBody>
                </Modal>


                <Button type='button' color='primary' onClick={this.toggleNewItem}>New Item</Button>
                <Row className='fluid'>
                    {this.createNews(this.state.news)}
                </Row>
            </div>
        );
    }
}

export default News;
