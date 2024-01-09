/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { AuthService } from '../services/auth.service'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/user.slice'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Account has been created!')
				setIsLogin(isLog => !isLog)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error ? error.toString() : 'Uncaught error')
		}
	}
	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage(data.token)
				dispatch(login(data))
				toast.success('You are successfully logged in')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error ? error.toString() : 'Uncaught error')
		}
	}
	return (
		<div className='mt-40 flex flex-col justify-center items-center bg-slate-900'>
			<h1 className='text-center text-xl mb-10 uppercase'>
				{isLogin ? 'Registration' : 'Login'}
			</h1>
			<form
				onSubmit={isLogin ? registrationHandler : loginHandler}
				className='flex w-1/3 flex-col mx-auto gap-5'
			>
				<input
					className='input'
					type='text'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					className='input'
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit' className='btn btn-green mx-auto'>
					Submit
				</button>
			</form>
			<div className='flex justify-center mt-5'>
				{!isLogin ? (
					<button
						onClick={() => setIsLogin(isLogin => !isLogin)}
						className='text-slate-300 hover:text-white'
					>
						You don`t have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(isLogin => !isLogin)}
						className='text-slate-300 hover:text-white'
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
