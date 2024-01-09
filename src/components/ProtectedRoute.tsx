import { FC } from 'react'
import { FaLock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
	children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth()
	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className='flex flex-col justify-center items-center mt-40 gap-20'>
					<h1 className='text-2xl'>
						Please login or register for viewing this page
					</h1>
					<FaLock size={300} />
					<Link
						to='/'
						className='bg-cyan-500 rounded-md px-6 py-2 hover:bg-sky-600'
					>
						Back
					</Link>
				</div>
			)}
		</>
	)
}

export default ProtectedRoute
