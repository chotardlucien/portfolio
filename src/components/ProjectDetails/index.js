import React from 'react'
import { useParams } from "react-router"
import styled from 'styled-components'
import data from '../../assets/data.js'




const Wrapper = styled.div`
  width:80%;
  margin:0 auto;
  color:white;
`
const CoverImg = styled.div`
  width:100%;
  height:350px;
  margin:0 auto;
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
            <CoverImg style={{backgroundImage:"url(../post-images/"+post.img+")"}}></CoverImg>
            <h1>{post.title}</h1>
        </Wrapper>
    )
}

export default ProjectDetails
