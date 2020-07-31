import React from 'react'
import Navigation from '../Navigation'
import HeaderLogo from '../../assets/images/logolight.svg'
import styled from 'styled-components';

const HeaderWrapper = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding:30px 4%;
`
const Logo = styled.img`
width:120px;
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
