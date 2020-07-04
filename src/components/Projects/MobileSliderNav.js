import React from 'react'
import styled from 'styled-components';
import LeftArrow from '../../assets/images/arrow_left.svg'
import RightArrow from '../../assets/images/arrow_right.svg'

const MobileSliderNavigation = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
@media screen and (min-width: 960px){
    display:none;
}
`
const Button = styled.img`
 filter: ${props => props.disabled ? "grayscale(1)" : "unset"};
 opacity: ${props => props.disabled ? "0.2" : "1"};
 width:20px;
`


function MobileSliderNav(props) {
    return (
        <MobileSliderNavigation>
            <Button onClick={() => props.next(props.curIndex-1)} src={LeftArrow} alt="Projet précédent" />
            <Button onClick={() => props.next(props.curIndex+1)} src={RightArrow} alt="Projet suivant" />
        </MobileSliderNavigation>
    )
}

export default MobileSliderNav
