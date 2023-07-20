import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import { styled } from 'styled-components'
import Sidebar from './Sidebar'
import LeftSidebar from './LeftSidebar'
function Upcoming({ rendered }) {
    const { upcoming, search, searchResults } = useGlobalContext()
    const conditionalRender = () => {
        if (!search && rendered === 'upcoming') {
            return upcoming.map((anime, index) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.image_url} alt="" />
                    <h1>{anime.title}</h1>
                    <div className='infoabtanime'>
                        <h3>Adaptation:{anime.source}</h3>
                    </div>
                    <div className='genre'>
                        <h3>Genres:</h3>
                        {anime.genres.map((genre) => (
                            <h5 key={genre.mal_id}>
                                <Link to={`genre/${genre.mal_id}/${genre.name}`}>
                                    {genre.name}
                                </Link>
                            </h5>
                        ))}
                    </div>
                </Link>
            })
        }
        else {
            return searchResults.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.image_url} alt="" />
                    <h1>{anime.title}</h1>
                </Link>
            })
        }
    }
    return (
        <div>
            <UpcomingStyled>
                <div className='upcoming-anime'>
                    {conditionalRender()}
                </div>
                <div>
                    <LeftSidebar />
                </div>
            </UpcomingStyled>
        </div>
    )
}

const UpcomingStyled = styled.div`
display:flex;
  

.genre {
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    margin-top: 5px;
  }

  .genre h3 {
    margin: 15px;
    color: beige;
  }

  .genre h5 a {
    text-decoration:none;
    padding: 6px;
    margin: 3px;
    color:gold;
    text-aling:center;
    background-color: #222401;
    font-size: 15px;
    border-radius: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border:2px solid transparent;
  }

  .genre h5 a:hover{
    opacity:1;
    transition:0.6s;    
    border:2px solid gold;
    filter:brightness(1.1);
}

.upcoming-anime{
    margin-top: 2rem;
    margin-left: 3rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    padding-right:0;
    width:100%;
    display:grid;
    grid-template-columns: repeat(auto-fill,minmax(320px,2fr));
    grid-gap: 1rem;
    background-color: black;
    border-top: 5px solid;
    a{
        height:720px;
        border-radius: 7px;
        border: 2px solid #222831; 
        padding:2rem;
        opacity:0.95;
        background:#222831;
    }        
    
    a img{
        width:100%;
        height:75%;
        object-fit: cover;
        border-radius:5px;
    }
    a:hover{
        opacity:1;
        transition:0.6s;    
        border:2px solid gold;
        filter:brightness(1.1);
    }
    .infoabtanime{
        display:grid;
        color:beige;
        font-size:15px;
        clear:right;
        font-weight:1000;
        grid-template-columns: repeat(1,1fr);
        h3{
            text-decoration:none;
            display:flex;
            justify-content:center;
      }

        .score{
            color:red;
            font-size:20px;
        }
    }
    a h1{
        text-decoration:none;
      color:gold;
      font-size:20px;
      text-align:center;
      font-weight:1000;
    }
    
    
}
`;

export default Upcoming