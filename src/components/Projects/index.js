import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import data from '../../assets/data.js'
import styled from 'styled-components';
import {StyledBtn, PageWrapper} from '../shared_components.js'
import ScrollBar from '../Scrollbar'
import {Spring, animated} from 'react-spring/renderprops'
import theme from '../../assets/theme.js'
import delay from 'delay'

let Scroll = true
const DesktopWrapper = styled.div`
    padding:5%;
    z-index:0;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    position: fixed;
    top: 0;
    left: 0;
`
const Slide = styled.div`
    display:flex;
    flex-direction:row-reverse;
    left:0;
    top:0;
    align-items:center;
`
const Info = styled.div`
    z-index:1;
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
        
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
        transition: all 0.4s;
        &.ismoving{
            clip-path: polygon(0 1%, 0 0, 0 100%, 0% 100%);
            transition: all 0.2s;
        }
    }
    h2{
        color: ${theme.titleColor};
        text-transform: uppercase;
        font-family: AvenirBlack;
        letter-spacing: .2rem;
        text-align:right;
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
        transition: all 0.4s;
        &.ismoving{
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            transition: all 0.2s;
        }
    }
`
const Desc = styled.p`
    padding: 30px 00px;
    text-align: right;
    font-family: AvenirBook;
    font-size: 16px;
    position: relative;
    color: ${theme.textColor};
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    transition: all 0.4s;
    &.ismoving{
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
        transition: all 0.2s;
    }
`

let SlidesContainer = styled.div`
    display:none;   
    z-index:2;
    width: calc(100% * 3);
    transform: translateX(${props => 100/props.nbimg});
    position:relative;
    margin-bottom:20px;
    transition: all ${theme.sliderDelay}s;
    @media screen and (min-width: 960px){
        flex-direction:column;
        width:min-content;
        top:254px;
        margin-bottom:0px;
    }
    @media screen and (min-width: 1260px){
        top:441.5px;
    }
    @media screen and (min-width: 1850px){
        top:500px;
    }
`
let SlideImg = styled(Link)`
width:${props => 100/props.nbimg}%;
float:left;
transition: all ${theme.sliderDelay}s;
filter: blur(10px);
opacity:0;
pointer-events:none;
img{
    clip-path: polygon(70% 0, 100% 0%, 35% 100%, 0% 100%);
    filter: grayscale(100%);
    width:100%;
    transition: all ${theme.sliderDelay}s;
}
&.active{
    pointer-events:auto;;
    opacity:1;
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
}
@media screen and (min-width: 1260px){
    width:700px;
}
@media screen and (min-width: 1850px){
    width:800px;
}
`
let SvgBox = styled.div`
    pointer-events:none;
    width:100vw;
    height:100vh;
    position:fixed;
    left:0;
    top:0;
    z-index:0;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:0.5;
    svg{
        opacity:1;
        transform:scale(2);
        transition:all 0.4s;
    }
    @media screen and (min-width: 960px){
        svg{
            transform:scale(1);
            transition:all 0.4s;
        }
    }
`
let SliderNav = styled.div`
    display:flex;
    flex-direction:column;
    justify:centent:center;
    align-items:center;
    align-self:auto;
    font-family:AvenirBlack;
    margin-left:20px;
    margin-bottom:0px;
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

const paths=[
    'M48.5,-58.9C60.4,-47.8,66,-30.2,60.5,-17.2C55,-4.2,38.4,4.2,30.3,16.9C22.3,29.6,22.7,46.5,17,50C11.4,53.4,-0.4,43.3,-11.3,36.8C-22.1,30.3,-32.2,27.3,-38.1,20.4C-44,13.5,-45.7,2.5,-41.4,-4.8C-37.1,-12.2,-26.8,-15.9,-18.9,-27.7C-11,-39.6,-5.5,-59.4,6.4,-67C18.3,-74.6,36.6,-70,48.5,-58.9Z',
    'M34.1,-38.8C41.4,-34.5,42.7,-21.1,49.7,-5.3C56.7,10.6,69.3,28.9,64.7,37.9C60.2,46.8,38.4,46.4,22.2,45.7C5.9,45,-4.9,44.1,-15.7,41C-26.4,38,-37.2,32.8,-41.7,24.4C-46.2,15.9,-44.6,4.2,-41.9,-6.7C-39.1,-17.5,-35.3,-27.5,-28.1,-31.8C-20.9,-36.2,-10.5,-35,1.5,-36.7C13.4,-38.5,26.8,-43.1,34.1,-38.8Z',
    'M43.3,-47C53.9,-42.7,58.9,-27,57.5,-13.3C56,0.3,48.2,11.8,40.9,22.9C33.7,33.9,26.9,44.5,16.9,49.5C6.9,54.5,-6.3,53.9,-19.6,50.5C-32.9,47.1,-46.4,40.8,-55,29.9C-63.6,18.9,-67.3,3.2,-64.9,-11.6C-62.4,-26.3,-53.9,-40.1,-42,-44.3C-30.2,-48.4,-15.1,-42.9,0.6,-43.7C16.3,-44.4,32.7,-51.4,43.3,-47Z'
]

class Projects extends Component {
    constructor(props){
        super(props)
        this.sliderWrapper=React.createRef()
        this.descDom=React.createRef()
        this.titleDom=React.createRef()
        this.ctxDom=React.createRef()
        this.state={
            isMoving:null,
            nbImg:data.length,
            curIndex:0,
            incrMobile:0,
            tag:data[0].tag,
            year:data[0].year,
            title:data[0].title,
            img:data[0].img,
            desc:data[0].desc,
            url:data[0].url,
            prevPath:paths[0],
            targetPath:paths[0],
            prevColor:data[0].color,
            targetColor:data[0].color,
        }
    }
    componentDidMount(){
        window.addEventListener('resize',this.seekSlide,true)
        window.addEventListener('wheel', this.handleScroll,true);
        document.addEventListener('touchstart', handleTouchStart, false);        
        document.addEventListener('touchmove', handleTouchMove.bind(this), false);
        
        var xDown = null;                                                        
        var yDown = null;
        
        function getTouches(evt) {
          return evt.touches ||             // browser API
                 evt.originalEvent.touches; // jQuery
        }                                                     
        
        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];                                      
            xDown = firstTouch.clientX;                                      
            yDown = firstTouch.clientY;                                      
        };                                                
        
        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }
        
            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;
        
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
        
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */ 
                    this.seekSlide(this.state.curIndex+1)
                } else {
                    /* right swipe */
                    this.seekSlide(this.state.curIndex-1)
                }                       
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */ 
                } else { 
                    /* down swipe */
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;                                             
        };
    }  
    componentWillUnmount(){
        window.removeEventListener('resize',this.seekSlide,true)
        window.removeEventListener('wheel', this.handleScroll,true);
    }
    handleScroll=(event)=>{
        if(Scroll){
            if (event.deltaY*100 < 0)
            {
            this.seekSlide(this.state.curIndex-1)
            }
            else if (event.deltaY*100 > 0)
            {
            this.seekSlide(this.state.curIndex+1)
            }
            console.log("fire")
            Scroll=false
            setTimeout(()=>{Scroll=true},1000)
        }
    }
    seekSlide = async (target) => {
        // Handle incorrect target
        if(target > data.length-1 || target < 0){
            target = this.state.curIndex
        }
        else{
            this.descDom.current.classList.add('ismoving')
            this.ctxDom.current.classList.add('ismoving')
            this.titleDom.current.classList.add('ismoving')
            target = typeof(target)!="number" ? this.state.curIndex : target
            let incr = (100/this.state.nbImg)*(target)
            if(document.body.offsetWidth < 960){
                this.sliderWrapper.current.style.transform="translateX(-"+incr+"%)"
            }
            else {
                this.sliderWrapper.current.style.transform="translateY(calc(100%/"+this.state.nbImg+"*-"+target+"))"
            }
            await delay(400)
            this.setState({
                tag:data[target].tag,
                year:data[target].year,
                title:data[target].title,
                desc:data[target].desc,
                img:data[target].img,
                url:data[target].url,
                curIndex:target,
                incrMobile:incr,
                prevPath:paths[this.state.curIndex],
                targetPath:paths[target],
                prevColor:data[this.state.curIndex].color,
                targetColor:data[target].color
            })
            // this.setState({isMoving:"null"})
            this.descDom.current.classList.remove('ismoving')
            this.ctxDom.current.classList.remove('ismoving')
            this.titleDom.current.classList.remove('ismoving')
        }
    }
    render() {
        return (
            <PageWrapper>
                <ScrollBar index={this.state.curIndex} nb={100/(this.state.nbImg-1)}>
                    <div className="bar"></div>
                </ScrollBar>
                <SvgBox>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%"  viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
                    <Spring
                    reset
                    native
                    from={{
                        t: this.state.prevPath,
                        color:this.state.prevColor
                    }}
                    to={{
                        t:this.state.targetPath,
                        color:this.state.targetColor
                    }}
                    >
                    {(props) => <animated.path fill={props.color} d={props.t} transform="translate(500 500) scale(4)"/>}
                    </Spring>
                </svg>
                </SvgBox>
                <DesktopWrapper id="wrapper">
                    <Slide id="slide">
                        <SliderNav>
                            <span>0{this.state.curIndex+1}</span> 
                            <span>0{data.length}</span>
                        </SliderNav>
                        <SlidesContainer ref={this.sliderWrapper} nbimg={this.state.nbImg} curindex={this.state.curIndex}>
                        {data.map((item, index) => {
                            let curIndex = this.state.curIndex
                            return(
                            <SlideImg className={index === curIndex? "active" : null} nbimg={this.state.nbImg} key={index} to={"/projects/"+this.state.url}>
                                <img src={"post-images/"+data[index].img} alt="" />
                            </SlideImg>
                            )
                        })}
                        </SlidesContainer>
                        <Info>
                            <Headline>
                                <div id="context" ref={this.ctxDom}>
                                    <span id="tag">#{this.state.tag} - </span>
                                    <span id="year">{this.state.year}</span>
                                </div>
                                <h2 ref={this.titleDom}>{this.state.title}</h2>
                            </Headline>
                            <Desc ref={this.descDom}>{this.state.desc}</Desc>
                            <StyledBtn to={"/projects/"+this.state.url}>See project</StyledBtn>
                        </Info>
                    </Slide>
                </DesktopWrapper>
            </PageWrapper>
        )
    }
}

export default Projects
