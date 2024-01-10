import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const [isVisibleModal, setIsVisibleModal] = useState(false)
	const { categories } = useLoaderData() as IResponseTransactionLoader
	return (
		<div className='rounded-md bg-slate-800 p-4'>
			<Form className='grid gap-2' action='/transactions' method='post'>
				<label className='grid' htmlFor='title'>
					<span>Title</span>
					<input
						type='text'
						className='input'
						placeholder='Title...'
						name='title'
						required
					/>
				</label>
				<label className='grid' htmlFor='amount'>
					<span>Amount</span>
					<input
						type='number'
						className='input'
						placeholder='Amount...'
						name='amount'
						required
					/>
				</label>
				{categories.length ? (
					<label htmlFor='category' className='grid'>
						<span>Category</span>
						<select className='input' name='category' required>
							{categories.map((category, index) => (
								<option key={index} value={category.id}>
									{category.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className='mt-1 text-red-300'>
						To continue create a category...
					</h1>
				)}
				<button
					className='max-w-fit flex items-center gap-2 text-white/50 hover:text-white'
					onClick={() => setIsVisibleModal(true)}
				>
					<FaPlus />
					<span>Manage Categories:</span>
				</button>
				<div className='flex gap-4 items-center'>
					<label className='cursor-pointer flex items-center gap-2'>
						<input
							type='radio'
							name='type'
							value={'income'}
							className='form-radio text-cyan-600'
						/>
						<span>Income</span>
					</label>
					<label className='cursor-pointer flex items-center gap-2'>
						<input
							type='radio'
							name='type'
							value={'expense'}
							className='form-radio text-cyan-600'
						/>
						<span>Expense</span>
					</label>
				</div>
				<button className='btn btn-green max-w-fit mt-2'>Submit</button>
			</Form>
			{isVisibleModal && (
				<CategoryModal type='post' setVisibleModal={setIsVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
