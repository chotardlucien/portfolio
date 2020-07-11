import React from 'react'
import styled from 'styled-components';
import theme from '../../assets/theme.js'
const { render } = require("@testing-library/react")

const ScrollBar =styled.div`
position:fixed;
z-index:9;
width:100vw;
.bar{
    bottom:0;
    left:0;
    position:fixed;
    height:5px;
    border-radius:20px;
    width:${props => ((props.index)*props.nb)+"%"};
    background:${theme.primaryColor};
    transition:all 0.8s ease-in-out;
}
`
render(
    <ScrollBar>
        <div className="bar"></div>
    </ScrollBar>
);

export default ScrollBar