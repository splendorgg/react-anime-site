import { Button, Dropdown, Space, Input } from 'antd';
import { IoMenu } from "react-icons/io5";
import { useEffect, useRef } from 'react';
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
function Navbar() {
    const navRef = useRef()
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80)
                navRef.current.classList.add('nav-scrolled')
            else
                navRef.current.classList.remove('nav-scrolled')
        })
    }, [])



    return (
        <>
            <div ref={navRef} className="navbar   "   >
                <div className="navbar-left flex items-center gap-2 ">
                    <div className="menu-button">
                        <Space direction='vertical'>
                            <Space wrap>
                                <Dropdown menu={{ items, }} placement='bottom'>
                                    <Button><IoMenu />
                                    </Button>
                                </Dropdown>
                            </Space>
                        </Space>
                    </div>
                    <div className="logo text-red-50">
                        <p >MANYAK ANIME SITESI</p>
                    </div>
                    <div className="searchbar">
                        <Input placeholder='Search anime' style={{ width: 200 }} />
                    </div>
                </div>
                <div className="navbar-right ">
                    <button className='bg-pink-300 px-2 py-1 rounded-md text-white'>Login</button>
                </div>

            </div>
        </>
    )
}


export default Navbar