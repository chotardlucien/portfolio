import React from 'react'
import { useParams } from "react-router"
import styled from 'styled-components'
import data from '../../assets/data.js'
import {StyledBtn,StyledIconLink} from '../shared_components.js'
import theme from '../../assets/theme.js'

const Wrapper = styled.div`
  margin:0 auto;
  color:white;
  display:flex;
  flex-direction:column;
  a{
    width:max-content;
    margin-bottom:20px;
  }
  @media screen and (min-width: 1260px){
    max-width:1220px;
  }
`
const Landing = styled.div`
margin-top:20px;
display:flex;
flex-direction:column;
padding: 50px 4%;
border-bottom: solid #ffffff47 2px;
margin-bottom: 50px;
@media screen and (min-width: 960px){
  flex-direction:row;
  justify-content: space-between;
}
`
const Links = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style:none;
  .link-icon{
    width:20px;
    color:${theme.textColor};
  }
  @media screen and (min-width: 960px){
    flex-direction:column;
    align-items:flex-end;
  }
`
const ProjectInfo = styled.div`
  display:flex;
  flex-direction:column;
  h1{
    font-family:AvenirBlack;
  }
  @media screen and (min-width: 960px){
    width:80%;
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
font-family: AvenirBook;
font-size: 16px;
position: relative;
color: ${theme.textColor};
text-align:right;
padding:20px 0;
`

const Project = styled.div`
img{
  width:100%;
  padding:40px;
}
`

function findPostBySlug(slug) {
    return data.find(o => o.url === slug);
  }

function ProjectDetails() {
    let  {url} = useParams()
    let post = findPostBySlug(url);
    console.log(post)
    return (
        <Wrapper>
          <StyledBtn to="/">Back</StyledBtn>
          <Landing>
            <ProjectInfo>
              <Headline>
                  <div id="context">
                      <span id="tag">#{post.tag} - </span>
                      <span id="year">{post.year}</span>
                  </div>
                  <h2>{post.title}</h2>
              </Headline>
            <Desc>{post.desc}</Desc>
            </ProjectInfo>
            <Links>
            {post.links.map((item,key)=>{
              return(
                <StyledIconLink key={key}>
                  <a href={item[1]}>
                    <img className="link-icon" src={"../links-icons/"+item[2]} alt={post[0]}></img>
                    {item[0]}
                  </a>
                </StyledIconLink>
              )
            })}
            </Links>
          </Landing>
          <Project>
            {post.project.map((item,key)=>{
              if(item[0]==="img"){
                return(
                  <img key={key}  alt="Project" src={"../post-images/"+item[1]}></img>
                )
              }
              return null;
            })}
          </Project>
        </Wrapper>
    )
}

export default ProjectDetails
