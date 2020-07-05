import React from 'react';
import Header from '../Header'
import About from '../About'
import Projects from '../Projects'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import styled from 'styled-components';
import '../../main.css';

const Wrapper = styled.div`
  width:100%;
  padding:0 4%;
  margin:0 auto;
`

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header></Header>
        <Redirect exact from="/portfolio/" to="projects" />
        <Switch>
        <Route path="/portfolio/about" component={About}></Route>
        <Route path="/portfolio/projects" component={Projects}></Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
