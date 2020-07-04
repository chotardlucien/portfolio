import React, { Component} from 'react'
import MobileSliderNav from './MobileSliderNav.js'
import {Link} from 'react-router-dom'
import data from '../../assets/data.js'
import styled from 'styled-components';
import {StyledBtn} from '../shared_components.js'
import {Spring} from 'react-spring/renderprops'
import theme from '../../assets/theme.js'

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
display:flex;
flex-direction:column;
a{
    align-self:flex-end;
}
@media screen and (min-width: 960px){
    align-self:unset;
    width:400px;
    margin-right:50px;
}
`
const Headline = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-end;
#context{
    color:${theme.primaryColor};
    font-family: AvenirRoman;
    min-width:fit-content;
    span{
        text-transform:uppercase;
    }
}
h2{
    color: ${theme.titleColor};
    text-transform: uppercase;
    font-family: AvenirBlack;
    letter-spacing: .2rem;
    text-align:right;
}
`
const Desc = styled.p`
padding: 30px 00px;
text-align: right;
font-family: AvenirBook;
font-size: 14px;
position: relative;
color: ${theme.textColor};
`

let SlidesContainer = styled.div`
width: calc(100% * 3);
transform: translateX(${props => 100/props.nbimg});
position:relative;
transition: all ${theme.sliderDelay}s;
@media screen and (min-width: 960px){
    display:flex;
    flex-direction:column;
    width:min-content;
    top:254px;
}
@media screen and (min-width: 1260px){
    top:441.500px;
}
@media screen and (min-width: 1850px){
    top:500px;
}
`
let SlideImg = styled(Link)`
width:${props => 100/props.nbimg}%;
float:left;
transition: all ${theme.sliderDelay}s;
filter: blur(20px);
img{
    clip-path: polygon(70% 0, 100% 0%, 35% 100%, 0% 100%);
    filter: grayscale(100%);
    width:100%;
    transition: all ${theme.sliderDelay}s;
}
&.active{
    filter: blur(0px);
    img{
        filter: grayscale(0%);
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
        transition: all ${theme.sliderDelay}s;
    }
    transition: all ${theme.sliderDelay}s;
}
@media screen and (min-width: 960px){
    width:400px;
    opacity:0.2;
    transform:translateX(200px);
    &.active{
        transform:translateX(0px) !important;
        opacity:1;
    }
}
@media screen and (min-width: 1260px){
    width:700px;
}
@media screen and (min-width: 1850px){
    width:800px;
}
`
let SvgBox = styled.div`
width:100vw;
height:100vh;
position:fixed;
left:0;
top:0;
z-index:0;
display:flex;
justify-content:center;
align-items:center;
`
let SliderNav = styled.div`
display:flex;
flex-direction:column;
justify:centent:center;
align-items:center;
font-family:AvenirBlack;
margin-left:20px;
span{
    padding:10px;
}
span:first-child{
    color:${theme.primaryColor};
    border-bottom:solid #ffffff40 2px;
}
span:last-child{
    color:${theme.titleColor};
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
        window.addEventListener('wheel', this.handleScroll,true);
    }  
    componentWillUnmount(){
        console.log('unmount')
        window.removeEventListener('resize',this.seekSlide,true)
        window.removeEventListener('wheel', this.handleScroll,true);
    }
    handleScroll=(event)=>{
        if (event.deltaY*100 < 0)
        {
        this.seekSlide(this.state.curIndex-1)
        }
        else if (event.deltaY*100 > 0)
        {
        this.seekSlide(this.state.curIndex+1)
        }
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
                <SvgBox>
                <svg xmlns="http://www.w3.org/2000/svg" width="80%"  viewBox="0 0 890 500" preserveAspectRatio="xMidYMid meet">
                        <Spring
                        from={{shape:"M4604.625,2296.35c-56.023-206.106-21.417-410.334,121.186-407.472,71.729,1.44,189.79,77.377,321.52,80.982,130.891,3.582,285.5-121.707,338.081-72.785,125.561,116.83,93.553,403.162,35.585,432.641-106.951,54.389-209.523-51.211-380.138-14S4660.646,2502.456,4604.625,2296.35Z"}}
                        to={{shape:"M4604.625,2296.35c-56.023-206.106-21.417-410.334,121.186-407.472,71.729,1.44,189.79,77.377,321.52,80.982,130.891,3.582,285.5-121.707,338.081-72.785,125.561,116.83,93.553,403.162,35.585,432.641-106.951,54.389-209.523-51.211-380.138-14S4660.646,2502.456,4604.625,2296.35Z"}}>
                            {props=> <path fill="#060606 " d={props.shape} transform="translate(-4579.143 -1885.726)"/> }
                        </Spring>
                </svg>
                </SvgBox>
                <MobileSliderNav next={this.seekSlide} curIndex={this.state.curIndex} prev="disabled" ></MobileSliderNav>
                <DesktopWrapper id="wrapper">
                    <Slide id="slide">
                        <SliderNav>
                            <span>{this.state.curIndex+1}</span>
                            <span>{data.length}</span>
                        </SliderNav>
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
                                    <span id="tag">#{this.state.tag} - </span>
                                    <span id="year">{this.state.year}</span>
                                </div>
                                <h2>{this.state.title}</h2>
                            </Headline>
                            <Desc>{this.state.desc}</Desc>
                            <StyledBtn to="/project_details">See project</StyledBtn>
                        </Info>
                    </Slide>
                </DesktopWrapper>
            </>
        )
    }
}

export default Projects
