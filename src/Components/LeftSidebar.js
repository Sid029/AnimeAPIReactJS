import React from 'react'
import { styled } from 'styled-components';
import { useGlobalContext } from '../Context/global';
import { Link } from 'react-router-dom'

function LeftSidebar() {

    const { airing } = useGlobalContext();
    const sorted = airing?.sort((a, b) => {
        return b.score - a.score;
    })


    return (
        <LeftSidebarStyled>
            <h3>Top Airing Anime:</h3>
            <div className='anime-leftsidebar'>
                {sorted?.slice(0, 5).map((anime) => {
                    if (anime.airing === true) {
                        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <div className='test'>
                                <img src={anime.images.jpg.large_image_url} alt="" />
                                <h5>{anime.title}</h5> <br></br>
                            </div>
                        </Link>
                    }
                })}
            </div>
        </LeftSidebarStyled>
    )
}

const LeftSidebarStyled = styled.div`
h3{
    color:gold;
    font-weight:bolder;
    font-size:20px;
    display:flex;
    justify-content:center;
    font-align:center;
    padding:1rem;
}
margin-top:2rem;
background-color:#222831;
border:5px solid black;
padding-right:1rem;
padding-left:2rem;
padding-top:2rem;

.anime-sidebar .test:hover{
    img{
        border:2px solid gold;
        filter: brightness(1.1);
    }
    h5{
        color:gold;
    }
}
.anime-leftsidebar .test{
    display:flex;
    flex-direction:column;
    width:150px;
    img{
        weight:100%;
        border-radius:10px;
        border:2px solid black;
    }
    // img:hover{
    //     border:2px solid gold;
    //     transition: 0.2s ease-in-out;
        
    // }
    a{
        margin-top:2rem;
        display:flex;
        flex-direction:column;
        gap:.8rem;
        display:flex;
        justify-content:center;
        font-align:center;
        color: beige;
    }
    h5{
        margin-top:2rem;
        display:flex;
        flex-direction:column;
        gap:.8rem;
        display:flex;
        justify-content:center;
        font-align:center;
        color: beige;
    }
}

`;

export default LeftSidebar