import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import { styled } from 'styled-components'

function Random({ rendered }) {

    const { search, random } = useGlobalContext();
    const { mal_id, title, images, source, score } = random;
    // const [anime_name, setAnimeName] = useState("");
    // const [anime_rev, setAnimeReview] = useState("");

    // const submitReview = () => {
    //     axios.post('http://localhost:3001/api/insert', {
    //         anime_name: anime_name,
    //         anime_rev: anime_rev,
    //     }).then(() => {
    //         alert("successful insert")
    //     })
    // }

    const conditionalRender = () => {

        if (!search && rendered === 'random') {
            return <div>
                <Link to={`anime/${mal_id}`}>

                    <div className='random'>
                        <img src={images?.jpg.image_url} alt=''></img>
                        <h1>
                            {title}
                        </h1>
                        <div className='infoabtanime'>
                            <h3>Adaptation:{source}</h3>
                            <h3>Score:<span className='score' style={{
                                color: { score } >= 9.0 ? "Gold" : "beige",
                            }}>{score}</span></h3>
                            <div className='genre'>
                                <h3>Genres:</h3>
                                {random.genres && random.genres.map((genre) => (
                                    <h5 key={genre.mal_id}>
                                        <Link to={`genre/${genre.mal_id}/${genre.name}`}>
                                            {genre.name}
                                        </Link>
                                    </h5>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        }

    }

    return (
        <RandomStyled>
            <div className='random-anime'>
                {conditionalRender()}
            </div>
        </RandomStyled>
    )
}

const RandomStyled = styled.div`

.form{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:left;
    input{
        width:100px;
        height:60px;
        margin:10px;
    }
    label{
        font-size:20px;
        color:gold;
    }
}


display:flex;
.genre{
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


.random-anime{
    margin-top: 2rem;
    margin-left: 3rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    padding-right:0;
    width:100%;
    display:grid;
    grid-template-columns: repeat(auto-fill,minmax(420px,2fr));
    grid-gap: 1rem;
    background-color: black;
    border-top: 5px solid;
    .random{
        height:820px;
        border-radius: 7px;
        border: 2px solid #222831; 
        padding:2rem;
        opacity:0.95;
        background:#222831;
        h1{
            text-decoration:none;
            color:gold;
            font-size:20px;
            text-align:center;
            font-weight:1000;    
        }
          img{
              width:100%;
              height:75%;
              object-fit: cover;
              border-radius:5px;
          }
    }        
    
    .random:hover{
        cursor-pointer;
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

export default Random