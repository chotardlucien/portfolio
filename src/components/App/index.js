import React from 'react';
import Header from '../Header'
import About from '../About'
import Projects from '../Projects'
import ProjectDetails from '../ProjectDetails'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import styled from 'styled-components';
import '../../main.css';
import{TransitionGroup,CSSTransition} from'react-transition-group'

const Wrapper = styled.div`
  width:100%;
  margin:0 auto;
  overflow:hidden;
`

function App() {
  const [inProp, setInProp] = React.useState(false);
  return (
    <Wrapper>
      <BrowserRouter  basename={process.env.PUBLIC_URL}>
          <Header></Header>
          <Route render={(location) => {
            location = location.location
            const { pathname, key } = location
            return(
              <TransitionGroup component={null}>
                <CSSTransition
                key={key}
                classNames="page"
                timeout={400}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Projects}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/projects/:url" component={ProjectDetails}></Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )
          }}/>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
