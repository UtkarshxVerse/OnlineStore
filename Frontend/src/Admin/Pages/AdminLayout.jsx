import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../Components/SideMenu'
import Header from '../Components/Header'

export default function AdminLayout() {
    return (
        <div className='w-screen grid grid-cols-5'>
            <div className='col-span-1'>
                <SideMenu />
            </div>
            <div className='col-span-4'>
                <Header/>
                <Outlet />
            </div>
        </div>
    )
}
