import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/global';

function Gallery() {
  const { getAnimeCharacter, pics } = useGlobalContext()
  const { id } = useParams();
  const [index2, setIndex] = React.useState(0);
  const navigate = useNavigate();
  
  const handleImageClick = (i) => {
    setIndex(i);
  }
  const handleBackClick = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    getAnimeCharacter(id)
  }, [id])

  return (
    <GalleryStyled>
      <div className='back'>
        <Link onClick={handleBackClick}>
          Back
        </Link>
      </div>
      <div className='big-pic'>
        <img src={pics[index2]?.jpg.image_url}></img>
      </div>
      <div className='small-pic'>
        {pics?.map((pics, index) => {
          return <div className='image-container' onClick={() => {
            handleImageClick(index);
          }} key={index}>
            <img
              src={pics.jpg.image_url} style={{
                border: index === index2 ? "3px solid gold" : "3px solid white",
                opacity: index === index2 ? "1" : "0.6",
                transform: index === index2 ? "scale(1.2)" : "scale(1)",
                transition: index === index2 ? "0.2s ease-in-out" : "none",


              }} alt="" />
          </div>
        })}
      </div>
    </GalleryStyled>
  )
}

const GalleryStyled = styled.div`
background-color: black;
min-height:100vh;
display:flex;
flex-direction:column;
align-items:center;

.back{
  position:absolute;
  top:2rem;
  left:3rem;
  a{
    text-decoration:none;
    font-size:20px;
    font-weight:400;
    color:gold;
  }
}

.back:hover{
  cursor:pointer;
  transition:0.5s ease-in-out;
  color:gold;
}

.big-pic{

  display:inline-block;
  padding:3rem;
  margin:2rem;
  background-color:#222831;
  border-radius:10px;
  border:5px solid gold;
  position relative;
  img{
    height:500px;
    width:300px;
  }
}

.small-pic{
  display:flex;
  flex-wrap:wrap;
  bottom:2rem;
  gap:5rem;
  padding:2rem;
  width:100%;
  background-color:#222831;
  img{
    width:10rem;
    height:10rem;
    object-fit:cover;
    cursor:pointer;
    border-radius:5px;
  }
}


`;


export default Gallery