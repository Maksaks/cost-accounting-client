import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'

const Transaction: FC = () => {
	return (
		<>
			<div className='grid grid-cols-3 gap-4 mt-4 items-start'>
				<div className='grid col-span-2'>
					<TransactionForm />
				</div>
				<div className='rounded-md bg-slate-800 p-3'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='uppercase text-md font-bold text-center'>
								Total income:
							</p>
							<p className='bg-green-600 p-1 rounded-sm text-center mt-2'>
								1000$
							</p>
						</div>
						<div>
							<p className='uppercase text-md font-bold text-center'>
								Total expense:
							</p>
							<p className='bg-red-500 p-1 rounded-sm text-center mt-2'>
								1000$
							</p>
						</div>
					</div>
					<>Chart</>
				</div>
				<h1 className='my-5'>Table</h1>
			</div>
		</>
	)
}

export default Transaction
