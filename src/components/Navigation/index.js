import React from 'react'
import styled from 'styled-components';
import StyledLink from '../shared_components.js'
import theme from '../../assets/theme.js'

const Nav = styled.nav`
z-index:2;
ul{
    display:flex;
    list-style:none;
    a{
        color:${theme.titleColor};
    }
    a.active{
        color:${theme.primaryColor};
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
                <li><StyledLink to="/projects/">Projects</StyledLink></li>
                <li><StyledLink to="/about" exact>About</StyledLink></li>
            </ul>
        </Nav> 
    )
}

export default Navigation
