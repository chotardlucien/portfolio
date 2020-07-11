import styled from 'styled-components';
import {NavLink} from 'react-router-dom'
import theme from '../assets/theme.js'

const StyledLink = styled(NavLink)`
color: white;
font-family: AvenirBlack;
text-decoration:none;
`

export const StyledIconLink= styled.li`
.link-icon{
    width:20px;
    color:${theme.textColor};
    margin-right:10px;
}
a{
    font-family:AvenirRoman;
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
    color:white;
}

`

export const StyledBtn = styled(NavLink)`
color: black;
font-family: AvenirBlack;
font-size:0.8rem;
text-decoration:none;
background:${theme.primaryColor};
padding:5px 15px;
border-radius:20px;
`

export const PageWrapper = styled.div`
opacity:1;
transition:all 0.2s;
`

export default StyledLink