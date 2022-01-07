import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';

function App() {

  let [shoes, shoes변경] = useState(Data) 
  let [재고,재고변경] = useState([10,11,12])
  
  return (
    <div className="App">
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home" className='name'>Brandy</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/Detail/1">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Switch>
<Route exact path="/">
  <div className='Jumbotron'>
  <h1>20% Season OFF</h1>
  <p>this is a simple hero unit, a simpe jumbotron-style component for calling extra attendin to featured content or informatiob</p>
  <button type="button" className="btn btn-dark">Learn more</button>
</div>

<div className='container'>
  <div className='row'>
    {shoes.map((a, i)=>{
      return <Card shoes={shoes[i]} i={i} />
    })
  }
  </div>
  <button className='btn btn-primary' onClick={()=>{

    axios.get('https://codingapple1.github.io/shop/data2.json')
    .then((result)=>{
      console.log(result.data);
      shoes변경([...shoes, ...result.data])
    })
    .catch(()=>{
      console.log('실패했어요')
    });

  }}>더보기</button>
</div>
</Route>

<Route exact path='/Detail/:id'>
  <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
</Route>



</Switch>
    </div>
  );
}

function Loding() {
  return (
    <div>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

function Card(props){
  return (
    <div className='col-md-4'>
      <img src={ 'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg' } alt="pic1" width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>

  )
}
export default App;
