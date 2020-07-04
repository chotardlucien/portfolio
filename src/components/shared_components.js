import styled from 'styled-components';
import {NavLink} from 'react-router-dom'
import theme from '../assets/theme.js'

const StyledLink = styled(NavLink)`
color: white;
font-family: AvenirBlack;
text-decoration:none;
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

export default StyledLink