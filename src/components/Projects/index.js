import React, { Component} from 'react'
import MobileSliderNav from './MobileSliderNav.js'
import {Link} from 'react-router-dom'
import data from '../../assets/data.js'
import styled from 'styled-components';
import StyledLink from '../shared_components.js'

const DesktopWrapper = styled.div`
@media screen and (min-width: 960px){
    z-index:0;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    position: fixed;
    top: 0;
    left: 0;
}
`
const Slide = styled.div`
display:flex;
flex-direction:column;
align-items:baseline;
@media screen and (min-width: 960px){
    flex-direction:row-reverse;
    left:0;
    top:0;
    align-items:center;
}
`
const Info = styled.div`
align-self:stretch;
@media screen and (min-width: 960px){
    align-self:unset;
    width:400px;
    margin-right:50px;
}
`
const Headline = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
border-bottom: solid 2px #ffffff70;
#context{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    #tag{
        font-size:14px;
        color: #727272;
        text-transform: uppercase;
        font-family: OpenSansBlack;
    }
    #year{
        font-size: 18px;
        color: #FFB951;
        font-family: OpenSansBlack;
    }
}
h2{
    padding: 25px 00px;
    color: #ffffff;
    text-transform: uppercase;
    font-family: OpenSansBlack;
}
`
const Desc = styled.p`
padding: 20px 00px;
text-align: right;
font-family: OpenSansBold;
font-size: 14px;
position: relative;
color: #C5C5C5;
`

let SlidesContainer = styled.div`
width: calc(100% * 3);
transform: translateX(${props => 100/props.nbimg});
position:relative;
transition: all 0.3s;
@media screen and (min-width: 960px){
    display:flex;
    flex-direction:column;
    width:min-content;
    top:254px;
}
@media screen and (min-width: 1260px){
    top:347.750px;
}
@media screen and (min-width: 1850px){
    top:500px;
}
`
let SlideImg = styled(Link)`
width:${props => 100/props.nbimg}%;
float:left;
clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%);
transition: all 0.5s;
img{
    width:100%;
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%);
    transition: all 0.5s;
}
filter: blur(10px);
&.active{
    filter: blur(0px);
    clip-path: polygon(77% 16%, 93% 71%, 58% 91%, 10% 77%, 11% 38%, 33% 8%);
    transition: all 0.5s;
    img{
        clip-path: polygon(77% 16%, 93% 71%, 58% 91%, 10% 77%, 11% 38%, 33% 8%);
        transition: all 0.5s;
    }
}
@media screen and (min-width: 960px){
    width:400px;
    opacity:0.2;
    transform:translateX(200px);
    transition: all 0.3s;
    &.active{
        transform:translateX(0px) !important;
        opacity:1;
    }
}
@media screen and (min-width: 1260px){
    width:550px;
}
@media screen and (min-width: 1850px){
    width:800px;
}
`

class Projects extends Component {
    constructor(props){
        super(props)
        this.sliderWrapper=React.createRef()
        this.activeSlide=React.createRef()
        this.disabledSlide=React.createRef()
        this.state={
            nbImg:data.length,
            curIndex:0,
            incrMobile:0,
            tag:data[0].tag,
            year:data[0].year,
            title:data[0].title,
            desc:data[0].desc,
        }
    }
    componentDidMount(){
        window.addEventListener('resize',this.seekSlide,true)
    }  
    componentWillUnmount(){
        console.log('unmount')
        window.removeEventListener('resize',this.seekSlide,true)
    }
    seekSlide = (target) => {
        console.log('seekslide')
        if(typeof(target)!="number" || target > data.length-1 || target < 0){
            console.log(this.state.curIndex)
            target = this.state.curIndex
        }
        let incr = (100/this.state.nbImg)*(target)
        this.setState({
            curIndex:target,
            incrMobile:incr,
            tag:data[target].tag,
            year:data[target].year,
            title:data[target].title,
            desc:data[target].desc,
        })
        if(document.body.offsetWidth < 960){
            this.sliderWrapper.current.style.transform="translateX(-"+incr+"%)"
        }
        else {
            this.sliderWrapper.current.style.transform="translateY(calc(100%/"+this.state.nbImg+"*-"+target+"))"
        }
    }
    render() {
        return (
            <>
            <MobileSliderNav next={this.seekSlide} curIndex={this.state.curIndex} prev="disabled" ></MobileSliderNav>
            <DesktopWrapper id="wrapper">
                <Slide id="slide">
                    <SlidesContainer ref={this.sliderWrapper} nbimg={this.state.nbImg} curindex={this.state.curIndex}>
                    {data.map((item, index) => {
                        let curIndex = this.state.curIndex
                        return(
                        <SlideImg className={index === curIndex? "active" : null} nbimg={this.state.nbImg} key={index} to="/project_details">
                            <img src={"projects-images/"+data[index].img} alt="" />
                        </SlideImg>
                        )
                    })}
                    </SlidesContainer>
                    <Info>
                        <Headline>
                            <div id="context">
                                <span id="tag">#{this.state.tag}</span>
                                <span id="year">{this.state.year}</span>
                            </div>
                            <h2>{this.state.title}</h2>
                        </Headline>
                        <button onClick={()=>{this.seekSlide(this.state.curIndex+1)}}>Suivant</button>
                        <button onClick={()=>{this.seekSlide(this.state.curIndex-1)}}>Précédent</button>
                        <button onClick={()=>{this.seekSlide(this.state.curIndex)}}>Current</button>
                        <button onClick={()=>{this.forceUpdate()}}>ForceUpdate</button>
                        <button onClick={this.test}>State</button>
                        <Desc>{this.state.desc}</Desc>
                        <StyledLink to="/project_details">En savoir plus</StyledLink>
                    </Info>
                </Slide>
            </DesktopWrapper>
            </>
        )
    }
}

export default Projects
