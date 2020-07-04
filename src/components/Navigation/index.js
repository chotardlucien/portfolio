import React from 'react'
import styled from 'styled-components';
import StyledLink from '../shared_components.js'

const Nav = styled.nav`
z-index:2;
ul{
    display:flex;
    list-style:none;
    a.active{
        color:#FFCC00;
    }
    li{
        margin-left:40px;
    }
}
`

function Navigation() {
    return (
        <Nav>
            <ul>
                <li><StyledLink to="/about">About me</StyledLink></li>
                <li><StyledLink to="/projects">Projects</StyledLink></li>
            </ul>
        </Nav> 
    )
}

export default Navigation
