import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import '../Styles/Navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Theme.css';

import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Row,
    Col } from 'reactstrap';

    
import Banner from './Banner';


class Navigation extends Component {
    constructor(props) {
        super(props);

        this.changePage = this.changePage.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleLeftNavbar = this.toggleLeftNavbar.bind(this);
        this.togglePinLeftNav = this.togglePinLeftNav.bind(this);
        this.setHeader = this.setHeader.bind(this);
        this.state = { 
            isOpen: false,
            leftNavbar_Collapsed: true,
            pinLeftNav: false,
            bannerTitle: 'Welcome!',
            bannerURL: require('../images/Home Banner.jpg'),
            bannerDescription: 'I\'m glad you found this site!'
        };
    }
    
       /* Need to: Trigger this on page change */
    changePage() {
        if (!this.state.pinLeftNav) {
            this.setState({
                leftNavbar_Collapsed: true
            });
        }
        this.setState({
            isOpen: false
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleLeftNavbar() {
        this.setState({
            leftNavbar_Collapsed: !this.state.leftNavbar_Collapsed
        });
    }

    togglePinLeftNav() {
        this.setState({
            pinLeftNav: !this.state.pinLeftNav
        });
    }

    setHeader(str, url, description) {
        this.setState({
            bannerTitle: str,
            bannerURL: url,
            bannerDescription: description
        })
    }
    
    render() {
        return (    
            <div>
                <Navbar color='light' light fixed='top'> {/*expand='sm'*/}
                    <Nav>
                        <NavbarToggler onClick={this.toggleLeftNavbar} />
                            <NavItem>
                                <NavLink tag={Link} to='/'  onClick={() => {this.setHeader('Home', require('../images/Home Banner.jpg'), 'I\'m glad you found this site!'); this.changePage}}>
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/Messages' onClick={() => {this.changePage; this.setHeader('Messages', require('../images/Green Dots.jpg'))}} >
                                    Messages
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <span onClick={this.changePage}>
                                        <Link to='/News' onClick={() => this.setHeader('News', require('../images/Green Dots.jpg'))}>News</Link>
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink>
                                  <span onClick={this.changePage}>
                                      <Link to='/Login' onClick={() => this.setHeader('Settings', require('../images/Green Dots.jpg'))}>Login</Link>
                                  </span>
                              </NavLink>
                            </NavItem>
                        <NavbarBrand href="/"></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                    </Nav>

                    {/* Top Nav Test on right*/}
                    
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>
                                    <span onClick={this.changePage}>
                                        <Link to='/MyProfile' onClick={() => this.setHeader('My Profile', require('../images/Blue Dots.jpg'), '')}>My Profile</Link>
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <span onClick={this.changePage}>
                                        <Link to='/Settings' onClick={() => this.setHeader('Settings', require('../images/Green Dots.jpg'))}>Settings</Link>
                                    </span>
                                </NavLink>
                            </NavItem>


                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                                
                        {/* FIX THIS BELOW TO BE A LEFT NAVBAR*/}
                        {/*Change isOpen for left nav*/}
                <Container fluid>
                    <Row>
                        <Collapse isOpen={!this.state.leftNavbar_Collapsed}>
                            <Col className='leftNavbar' xs='1'>
                                <Navbar>
                                    <Nav navbar>
                                        <NavItem>
                                        <span className='icon' onClick={this.togglePinLeftNav}> {this.state.pinLeftNav ? 'unpin' : 'pin'} </span>
                                        <span id='pin' style={{'fontSize':'90%'}}><i className={'fa fa-thumb-tack icon'} onClick={this.togglePinLeftNav} style={this.state.pinLeftNav ? {'color':'red'} : {'color':'orange'}} /></span>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink>
                                                <Link to='/messages' onClick={() => this.setHeader('Messages')}>Message</Link>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink>
                                                <Link to='/messages' onClick={() => this.setHeader('Messages')}>Message</Link>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink>
                                                <Link to='/messages' onClick={() => this.setHeader('Messages')}>Message</Link>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Navbar>
                            </Col>
                        </Collapse>
                        <Col>

                            <header>
                                <Banner bannerTitle={this.state.bannerTitle} bannerURL={this.state.bannerURL} bannerDescription={this.state.bannerDescription} />
                            </header>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Navigation;
