import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { FaPlayCircle } from "react-icons/fa";
import Navbar from './Navbar';
import { PlusOutlined } from '@ant-design/icons';

function AnimeDetailPage() {
    const location = useLocation();
    const animeDetails = location.state?.anime;



    const formatDuration = (duration) => {
        return duration.replace(' per ep', ''); // Trim the unnecessary information
    };


    if (!animeDetails) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="anime-detail-page">
                <div className="anime-detail">
                    <div className="anime-container">
                        <div className="ani-img">
                            <img src={animeDetails.images.jpg.image_url} />
                        </div>

                        <div className="ani-detail">
                            <div className="ani-title">
                                <h1>{animeDetails.title}</h1>
                            </div>
                            <div className="ani-info">
                                <span>Episodes {animeDetails.episodes}</span>
                                <span className='dot'></span>
                                <span>{animeDetails.type}</span>
                                <span className='dot'></span>
                                <span>{animeDetails.duration}</span>
                            </div>
                            <div className="ani-buttons">
                                <Button type="primary" size="large" className='watch-button'><FaPlayCircle />Watch Now</Button>
                                <Button type="primary" size="large" className='add-button' ><PlusOutlined /> Add to List</Button>
                            </div>
                            <div className="ani-synopsis">
                                {animeDetails.synopsis}
                            </div>
                        </div>

                        <div className="ani-side-info-wrap">
                            <div className="ani-side-info">
                                <div className="info-element">
                                    <span className='info-title'>Japanese: </span>
                                    <span className='info-value'>{animeDetails.title}</span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>Synonyms: </span>
                                    <span className='info-value'>{animeDetails.title_synonyms.join(', ')}</span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>Aired: </span>
                                    <span className='info-value'>{animeDetails.aired.string}</span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>Duration: </span>
                                    <span className='info-value'>{formatDuration(animeDetails.duration)}</span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>Status: </span>
                                    <span className='info-value'>{animeDetails.status}</span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>MAL Score: </span>
                                    <span className='info-value'>{animeDetails.score}</span>
                                </div>
                                <div className="info-genres">
                                    <span className='info-title'>Genres: </span>
                                    <span className='info-genre-value'>
                                        {animeDetails.genres.map((genre) => (
                                            <span key={genre.mal_id} className='genre-item'>
                                                {genre.name}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>Studios: </span>
                                    <span className='info-value'>{animeDetails.studios.map((studio) => studio.name).join(', ')}</span>
                                </div>
                                <div className="info-element">
                                    <span className='info-title'>Producers: </span>
                                    <span className='info-value'>{animeDetails.producers.map((producer) => producer.name).join(', ')}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default AnimeDetailPage