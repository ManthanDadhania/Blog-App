import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import Searchbar from '../Searchbar'
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  // const [searchbarStatus, setSearchbarStatus] = useState(false)
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ]
  // const searchbar = () => {
  //   setSearchbarStatus(prev => !prev)
  // }
  return (
    <>
      <header className='py-3 shadow bg-gray-500'>
        <Container>
          {/* <button
            className="p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Open menu"
            onClick={searchbar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
              <path d="M17 17L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button> */}
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='65px' className='flex justify-center items-center gap-5' />
              </Link>
            </div>
            <ul className='flex ml-auto gap-3 items-center'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-bock text-lg px-6 py-2 font-medium duration-200 cursor-pointer hover:bg-blue-100 rounded-full'
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
      {/* {searchbarStatus && <Searchbar />} */}
    </>
  )
}

export default Header
