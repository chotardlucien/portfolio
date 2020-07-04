import React from 'react';
import Header from '../Header'
import About from '../About'
import Projects from '../Projects'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import styled from 'styled-components';
import '../../main.css';

const Wrapper = styled.div`
  @media screen and (max-width: 960px){
    padding:0 10%;
  }
  @media screen and (min-width: 960px){
    width:915px;
  }
  @media screen and (min-width: 1260px){
    width:1220px;
  }
  margin:0 auto;
`

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header></Header>
        <Redirect exact from="/" to="projects" />
        <Switch>
        <Route path="/about" component={About}></Route>
        <Route path="/projects" component={Projects}></Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
