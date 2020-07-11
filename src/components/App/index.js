import React from 'react';
import Header from '../Header'
import About from '../About'
import Projects from '../Projects'
import ProjectDetails from '../ProjectDetails'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import styled from 'styled-components';
import '../../main.css';

const Wrapper = styled.div`
  width:100%;
  margin:0 auto;
  overflow:hidden;
`

function App() {
  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
      <Wrapper>
        <Header></Header>
          <Switch>
            <Route exact path="/" component={Projects}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/projects/:url" component={ProjectDetails}></Route>
          </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
