import React from 'react'
import Navigation from '../Navigation'
import HeaderLogo from '../../assets/images/logo.svg'
import styled from 'styled-components';

const HeaderWrapper = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
margin:40px 0;
`
const Logo = styled.img`
width:150px;
`

function Header() {
    return (
        <HeaderWrapper>
            <Logo src={HeaderLogo}></Logo>
            <Navigation></Navigation>
        </HeaderWrapper>
    )
}

export default Header
