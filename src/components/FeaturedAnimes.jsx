import { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Popper } from "./Popper";


function FeaturedAnimes({ topairing, mostpopular, mostfavorite, completed }) {
    const [showPopper, setShowPopper] = useState(false);
    const [currentAnime, setCurrentAnime] = useState(null);
    const animeImgRef = useRef(null);

    const handleMouseEnter = (anime, ref) => {
        setCurrentAnime(anime);
        animeImgRef.current = ref;
        setShowPopper(true);
    };

    const handleMouseLeave = () => {
        setShowPopper(false);
        setCurrentAnime(null);
    };

    const navigate = useNavigate()
    const handleClick = (anime) => {
        navigate(`/anime/${anime.mal_id}`, { state: { anime } })
    }
    return (
        <>
            <div className="featured">
                <div className="sections">
                    <div className="topairing-section section">
                        <div className="section1 subsection">
                            <h2>Top Airing</h2>
                            <div className="anime-block">
                                <ul>
                                    {topairing.slice(0, 5).map((topairinganime) => (
                                        <li key={topairinganime.mal_id} >
                                            <div className="list-image" onMouseEnter={(e) => handleMouseEnter(topairinganime, e.currentTarget)} // Mouse hover
                                                onMouseLeave={handleMouseLeave} onClick={() => handleClick(topairinganime)}>
                                                <img src={topairinganime.images.jpg.image_url} alt="" />
                                            </div>
                                            <div className="list-detail">
                                                <h3 className="list-title">{topairinganime.title_english}</h3>
                                                <div className="list-info">
                                                    <div className="list-score">
                                                        <FaStar fill='yellow' />
                                                        {topairinganime.score}
                                                    </div>
                                                    <span className="dot"></span>
                                                    <div className="list-episode">
                                                        {topairinganime.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {showPopper && currentAnime && (
                                        <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mostpopular-section section">
                        <div className="section2 subsection">
                            <h2>Most Popular</h2>
                            <div className="anime-block">
                                <ul>
                                    {mostpopular.slice(0, 5).map((mostpopularanime, index) => (
                                        <li key={index}>
                                            <div className="list-image" onMouseEnter={(e) => handleMouseEnter(mostpopularanime, e.currentTarget)} // Mouse hover
                                                onMouseLeave={handleMouseLeave} onClick={() => handleClick(mostpopularanime)}>
                                                <img src={mostpopularanime.images.jpg.image_url} alt="" />
                                            </div>
                                            <div className="list-detail">
                                                <h3 className="list-title">{mostpopularanime.title_english}</h3>
                                                <div className="list-info">
                                                    <div className="list-score">
                                                        <FaStar fill='yellow' />
                                                        {mostpopularanime.score}
                                                    </div>
                                                    <span className="dot"></span>
                                                    <div className="list-episode">
                                                        {mostpopularanime.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {showPopper && currentAnime && (
                                        <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                                    )}

                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="mostfavorite-section section">
                        <div className="section3 subsection">
                            <h2>Most Favorite</h2>
                            <div className="anime-block">
                                <ul>
                                    {mostfavorite.slice(0, 5).map((mostfavoriteanime, index) => (
                                        <li key={index}>
                                            <div className="list-image" onMouseEnter={(e) => handleMouseEnter(mostfavoriteanime, e.currentTarget)} // Mouse hover
                                                onMouseLeave={handleMouseLeave} onClick={() => handleClick(mostfavoriteanime)}>
                                                <img src={mostfavoriteanime.images.jpg.image_url} alt="" />
                                            </div>
                                            <div className="list-detail">
                                                <h3 className="list-title">{mostfavoriteanime.title_english}</h3>
                                                <div className="list-info">
                                                    <div className="list-score">
                                                        <FaStar fill='yellow' />
                                                        {mostfavoriteanime.score}
                                                    </div>
                                                    <span className="dot"></span>
                                                    <div className="list-episode">
                                                        {mostfavoriteanime.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {showPopper && currentAnime && (
                                        <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                                    )}

                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="latestcompleted-section section">
                        <div className="section4 subsection">
                            <h2>Latest Completed</h2>
                            <div className="anime-block">
                                <ul>
                                    {completed.slice(0, 5).map((completedanime, index) => (
                                        <li key={index}>
                                            <div className="list-image" onMouseEnter={(e) => handleMouseEnter(completedanime, e.currentTarget)} // Mouse hover
                                                onMouseLeave={handleMouseLeave} onClick={() => handleClick(completedanime)}>
                                                <img src={completedanime.images.jpg.image_url} alt="" />
                                            </div>
                                            <div className="list-detail">
                                                <h3 className="list-title">{completedanime.title_english}</h3>
                                                <div className="list-info">
                                                    <div className="list-score">
                                                        <FaStar fill='yellow' />
                                                        {completedanime.score}
                                                    </div>
                                                    <span className="dot"></span>
                                                    <div className="list-episode">
                                                        {completedanime.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {showPopper && currentAnime && (
                                        <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedAnimes