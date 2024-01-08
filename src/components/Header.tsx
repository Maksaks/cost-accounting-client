import { FC } from 'react'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const Header: FC = () => {
	const isAuth = false
	return (
		<header className='flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm'>
			<Link to='/'>
				<FaBtc size={30} />
			</Link>
			{isAuth && (
				<nav className='ml-auto mr-10'>
					<ul className='flex items-center gap-5'>
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) => {
									return isActive ? 'text-white' : 'text-white/50'
								}}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/categories'}
								className={({ isActive }) => {
									return isActive ? 'text-white' : 'text-white/50'
								}}
							>
								Categories
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/transactions'}
								className={({ isActive }) => {
									return isActive ? 'text-white' : 'text-white/50'
								}}
							>
								Transactions
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
			{isAuth ? (
				<button className='btn btn-red'>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className='py-2 text-white/50 hover:text-white ml-auto'
					to={'/auth'}
				>
					Log In / Sign In
				</Link>
			)}
		</header>
	)
}

export default Header
