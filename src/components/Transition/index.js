import React, { Component } from 'react'
import styled from 'styled-components';
import theme from '../../assets/theme.js'

const TransitionContainer=styled.div`
    position:fixed;
    width:100vw;
    height:100vh;
    background:${theme.primaryColor};
`

export class Transition extends Component {
    render() {
        return (
            <TransitionContainer id="transition">
            </TransitionContainer>
        )
    }
}

export default Transition
