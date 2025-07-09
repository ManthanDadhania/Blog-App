import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='inline-block w-full lg:w-auto px-6 text-lg font-medium py-2 duration-200 hover:bg-blue-100 rounded-full text-left lg:text-center'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
