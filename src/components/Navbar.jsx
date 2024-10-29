import { Dropdown, Input } from 'antd';
import { IoMenu } from "react-icons/io5";
import { useEffect, useRef } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                3rd menu item
            </a>
        ),
    },
];
function Navbar(props) {
    const navRef = useRef()

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/`)
    }

    const formatDuration = (duration) => {
        return duration.replace(' per ep', ''); // Trim the unnecessary information
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80)
                navRef.current?.classList.add('nav-scrolled')
            else
                navRef.current?.classList.remove('nav-scrolled')
        })
    }, [])

    return (
        <>
            <div ref={navRef} className="navbar"   >
                <div className="navbar-left flex items-center gap-5 ">
                    <div className="menu-button">
                        <Dropdown menu={{ items, }} placement='bottom'>
                            <IoMenu size={32} color='white' />
                        </Dropdown>
                    </div>
                    <div className="logo text-red-50">
                        <p onClick={() => handleClick()} style={{ cursor: 'pointer' }}>MANYAK ANIME SITESI</p>
                    </div>
                    <form className="searchbar" onSubmit={props.HandleSearch}>
                        <Input placeholder='Search anime' style={{ width: 360 }} required
                            value={props.search} onChange={props.HandleSearch}
                        />

                        <div className="search-list">
                            {props.searchedAnime?.map(anime => (
                                <div className="search-card" key={anime.mal_id}>
                                    <a href="" >
                                        <div className="search-poster">
                                            <img src={anime.images.jpg.image_url} alt="" />
                                        </div>
                                        <div className="search-detail">
                                            <h3>{anime.title}</h3>
                                            <div className="search-japanese">
                                                {anime.title_japanese}
                                            </div>
                                            <div className="search-info">
                                                <span>{anime.aired.from ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(anime.aired.from)) : "Unknown"}</span>
                                                <span className='dot'></span>
                                                <span style={{ color: 'white' }}>{anime.type}</span>
                                                <span className='dot'></span>
                                                <span>{formatDuration(anime.duration)}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))

                            }
                            {props.searchedAnime?.length > 2 &&
                                <div className="search-all">
                                    <a href=""> View All Results <FaChevronRight size={12} /></a>
                                </div>
                            }
                        </div>

                    </form>
                </div>
                <div className="navbar-right ">
                    <button className='bg-pink-300 px-2 py-1 rounded-md text-white'>Login</button>
                </div>

            </div>
        </>
    )
}


export default Navbar