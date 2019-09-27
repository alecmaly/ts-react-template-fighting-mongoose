import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { 
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col } from 'reactstrap';

import Settings_General from '../Components/Settings_General.jsx'; 

import '../Styles/Theme.css';
import classnames from 'classnames';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            activeTab: '1',
            background: ''
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleSubmit(event) {
        this.setState({
            backgroundColor: event.target.background
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    render() {
        return (
            <Container className='myTheme' style={{'backgroundColor':`${this.state.backgroundColor}`}} fluid>
                <h2>Settings</h2>

                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1'}, 'icon')} onClick={() => {this.toggle('1')}}
                        >
                        General
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2'}, 'icon')} onClick={() => {this.toggle('2')}}
                        >
                        Profile
                        </NavLink>
                    </NavItem>

                </Nav>


                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <h4>General Settings</h4> 
                            <Settings_General />
                    </TabPane>
                    <TabPane tabId='2'>
                        <Row>
                            <Col sm='12'>
                                <h4>Profile Settings</h4>
                                <p>This is where I will put my Profile Settings Component</p>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>



                
              
               


            </Container>
        );
    }
}


export default Settings;