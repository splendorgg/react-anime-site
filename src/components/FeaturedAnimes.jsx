import { FaStar } from "react-icons/fa";

function FeaturedAnimes({ topairing, mostpopular, mostfavorite, completed }) {
    return (
        <>
            <div className="featured">
                <div className="sections">
                    <div className="topairing-section section">
                        <div className="section1 subsection">
                            <h2>Top Airing</h2>
                            <div className="anime-block">
                                <ul>
                                    {topairing.slice(0, 5).map((topairinganime, index) => (
                                        <li key={index}>
                                            <div className="list-image">
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
                                            <div className="list-image">
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

                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="mostfavorite-section section">
                        <div className="section3 subsection">
                            <h2>Most Favorite</h2>
                            <div className="anime-block">
                                <ul>
                                    {mostfavorite.slice(0, 5).map((mastfavoriteanime, index) => (
                                        <li key={index}>
                                            <div className="list-image">
                                                <img src={mastfavoriteanime.images.jpg.image_url} alt="" />
                                            </div>
                                            <div className="list-detail">
                                                <h3 className="list-title">{mastfavoriteanime.title_english}</h3>
                                                <div className="list-info">
                                                    <div className="list-score">
                                                        <FaStar fill='yellow' />
                                                        {mastfavoriteanime.score}
                                                    </div>
                                                    <span className="dot"></span>
                                                    <div className="list-episode">
                                                        {mastfavoriteanime.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}

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
                                            <div className="list-image">
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