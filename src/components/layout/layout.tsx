import { SideBar } from '@/modules/sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => (
    <div className="flex">
        <SideBar />
        <main className="w-full bg-[#F5F7FB] text-center">
            <Outlet />
        </main>
    </div>
)
