import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/'>
            <Logo width='65px' className='flex items-center gap-5' />
          </Link>

          {/* Mobile menu button */}
          <div className='lg:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300'
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Nav Items */}
          <ul className={`flex-col lg:flex-row lg:flex ml-auto gap-3 items-center absolute lg:static bg-gray-500 lg:bg-transparent w-full lg:w-auto left-0 px-4 lg:px-0 transition-all duration-300 ease-in-out ${menuOpen ? 'top-16 opacity-100' : 'top-[-490px] lg:top-auto opacity-0 lg:opacity-100'} z-50`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      navigate(item.slug)
                    }}
                    className='inline-block text-lg px-6 py-2 font-medium duration-200 cursor-pointer hover:bg-blue-100 rounded-full w-full text-left lg:w-auto lg:text-center'
                  >
                    {item.name}
                  </button>
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
  )
}

export default Header
