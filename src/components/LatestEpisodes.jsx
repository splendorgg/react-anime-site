import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { Popper } from './Popper';


function LatestEpisodes({ latestAnimeDetails }) {
    const [showPopper, setShowPopper] = useState(false); // Popper kontrol state'i
    const [currentAnime, setCurrentAnime] = useState(null); // Hover edilen anime bilgileri
    const animeImgRef = useRef(null); // anime-img referansı


    // Hover başladığında anime bilgilerini ve referansı ayarlıyoruz
    const handleMouseEnter = (anime, ref) => {
        setCurrentAnime(anime);
        animeImgRef.current = ref; // Hover edilen elementin referansı
        setShowPopper(true); // Popper'ı göster
    };

    const handleMouseLeave = () => {
        setShowPopper(false); // Popper'ı gizle
        setCurrentAnime(null); // Bilgileri temizle
    };


    const formatDuration = (duration) => {
        return duration.replace(' per ep', ''); // Trim the unnecessary information
    };

    const navigate = useNavigate()
    const handleClick = (anime) => {
        navigate(`/anime/${anime.mal_id}`, { state: { anime } })
    }


    const colorList = ["#d8b2a", "#ffbade", "#fc887b", "#ccabda", "#abccd8", "#86e3ce", "#d0e6a5"]
    const animeGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Game", "Horror", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller", "Ecchi", "Mecha", "Military", "Music", "Parody", "School", "Shoujo", "Shounen", "Josei", "Seinen", "Harem", "Isekai", "Historical", "Police", "Samurai", "Super Power", "Space", "Vampire"];

    return (
        <>
            <div className="recent-sub-container">
                <div className="recent-animes-container">
                    <h1>Latest Episode</h1>
                    <div className="recent-animes">
                        {latestAnimeDetails.map((latest) => {
                            const imageUrl = latest.images.jpg.image_url;

                            if (imageUrl === 'https://cdn.myanimelist.net/images/icon-banned-youtube-rect.png') {
                                return null;
                            }
                            return (
                                <div className="recent-anime" key={latest.mal_id} onMouseEnter={(e) => handleMouseEnter(latest, e.currentTarget)} // Mouse hover
                                    onMouseLeave={handleMouseLeave} onClick={() => handleClick(latest)}>
                                    <div className="anime-img">
                                        <img src={imageUrl} alt="" />
                                        <FaPlay size={30} className="recent-play" />
                                    </div>
                                    <div className="recent-anime-info">
                                        <div className="recent-anime-title">
                                            {latest.title}
                                        </div>
                                        <div className="recent-anime-type">
                                            <span>{latest.type}</span>
                                            <span className="dot"></span>
                                            <span>{formatDuration(latest.duration)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {showPopper && currentAnime && (
                            <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                        )}
                    </div>
                </div>


                <div className="sidebar">
                    <h1>Genres</h1>
                    <div className="genres-container">
                        <ul className="genres-list">
                            {animeGenres.map((item, index) => (
                                <li key={index} style={{ color: colorList[index % colorList.length] }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestEpisodes