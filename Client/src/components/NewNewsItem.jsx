import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
    } from 'reactstrap';
import '../Styles/Theme.css';
import 'whatwg-fetch';

import { newNews, getNews } from '../API/api';

class NewNewsItem extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            subTitle: '',
            detail: ''
        }
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        newNews(this.state.title, this.state.subTitle, this.state.detail)
            .then ( updatedNews => { console.log(updatedNews) }) //this.props.updateNews(updatedNews) );
            .then ( () => this.props.updateNews() );
        this.props.toggleModal();
    }
 
    

    render() {
                return (
            <div className='NewNewsItem'>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label >Title</Label>
                        <Input type='text' name='title' id='title' placeholer='Title' onChange={this.handleInputChange} value={this.state.title} />
                    </FormGroup>
                    <FormGroup>
                        <Label>SubTitle</Label>
                        <Input type='text' name='subTitle' id='subTitle' placeholer='SubTitle' onChange={this.handleInputChange} value={this.state.subTitle} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Detail</Label>
                        <Input type='text' name='detail' id='detail' placeholer='Detail' onChange={this.handleInputChange} value={this.state.detail} />
                    </FormGroup>
                    <div className='text-center'>
                        {/*Make submit button of type SUBMIT in production*/}
                        <Button type='submit' color='success'>Submit</Button>
                        &#8194;&#8194;
                        <Button type='button' color='danger' onClick={this.props.toggleModal}>Cancel</Button>
                    </div>
                </Form>
            </div>  
        );
    }
}

export default NewNewsItem;