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
    filter: invert(1);
    margin-right:10px;
}
a{
    font-family:AvenirBook;
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
    color:black;
}

`

export const StyledBtn = styled(NavLink)`
color: black;
font-family: AvenirBook;
font-size:16px;
text-decoration:none;
background:${theme.primaryColor};
padding:10px 20px;
border-radius:5px;
`

export const PageWrapper = styled.div`
opacity:1;
height:100%;
transition:all 0.2s;
`

export default StyledLink