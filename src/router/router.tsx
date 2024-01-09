import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Auth from '../pages/Auth'
import Categories, {
	categorieLoader,
	categoriesAction,
} from '../pages/Categories'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Transaction from '../pages/Transaction'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/transactions',
				element: (
					<ProtectedRoute>
						<Transaction />
					</ProtectedRoute>
				),
			},
			{
				path: '/categories',
				action: categoriesAction,
				loader: categorieLoader,
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: '/auth',
				element: <Auth />,
			},
		],
	},
])
