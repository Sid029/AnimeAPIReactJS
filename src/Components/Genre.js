import React from 'react'
import { useGlobalContext } from '../Context/global'
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

function Genre({ rendered }) {
  const { genres, search } = useGlobalContext();
  const message = "\n";
  const conditionalRender = () => {
    if (!search && rendered === 'genres') {
      return genres.map((genre) => {
        return (
          <div>
            <Link to={`/genre/${genre.mal_id}/${genre.name}`} key={genre.mal_id}>
              <div className='genre-listing' key={genre.mal_id}>
                <h1>{genre.name}</h1>
                <div className='count' style={{ marginTop: "2rem" }}>
                  <h3 style={{ color: "gold" }}>{genre.count}</h3>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  };


  return (
    <div>
      <GenresStyled>
        <div className='genre'>
          {conditionalRender()}
        </div>
      </GenresStyled>
    </div>
  )
}

const GenresStyled = styled.div`
.genre {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.genre-listing {
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  width: 295px;
  height: 100px;
  background-color: #222831;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  border:1px solid transparent;

}

.genre-listing:hover{
  transition:0.2s ease-in-out;
  border-color:gold;
  h1{
    color:gold;
    font-weight:1000;
  }
}

.genre-listing h1 {
  text-decoration: none!important;
  underline:none;
  color: beige;
  font-size: 18px;
  font-weight: bold;
}
`;


export default Genre

 // return ( <Link to={`/genre/${genres.mal_id}`} key={genres.mal_id}>
      //   <div className='genre-listing-container'>
      //     {genres.map((genre) => (
      //       <div className='genre-listing' key={genre.mal_id}>
      //         <h1>{genre.name}</h1>
      //       </div>
      //     ))}
      //   </div>
      // </Link>
      // );