import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/router'
const Header = () => {
    const router = useRouter()
    const [toggleMobileMenu, setToggleMobileMenu] = useState(false)
    return (
        <>
        <header className="fixed top-0 w-full px-8 py-4 text-white bg-zinc-500">
            <AiOutlineMenu 
                onClick={() => setToggleMobileMenu(prev => !prev)}
                className='w-8 h-8 cursor-pointer sm:hidden'/>
            {
                toggleMobileMenu && 
                <div className='mt-2 bg-zinc-500 sm:hidden'>
                    <nav>
                        <ul className='flex flex-col gap-2'>
                            <li onClick={() => router.push('/forum')}>
                                Forum
                            </li>
                            <li>
                                Profile
                            </li>
                            <li onClick={() => router.push('/auth/login')}>
                                Logout
                            </li>
                        </ul>
                    </nav>
                </div>
            }    
            
            <div className='justify-between hidden w-8 h-8 sm:flex'>
                    <a>Profile</a>
                    <a>Forum</a>
                    <a>Logout</a>
            </div>
        </header>
        <div className='mb-16'>
        </div>
        </>
    )
}

export default Header
