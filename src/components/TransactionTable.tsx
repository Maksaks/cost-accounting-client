import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import ReactPaginate from 'react-paginate'
import { Form, useLoaderData } from 'react-router-dom'
import { instance } from '../api/axios.api'
import { formatToUSD } from '../helpers/currency.helper'
import { formateDate } from '../helpers/date.helper'
import { IResponseTransactionLoader, ITransaction } from '../types/types'

interface Props {
	limit: number
}

const TransactionTable: FC<Props> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader

	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination?page=${page}&limit=${limit}`
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	const pageChangeHandler = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, transactions])

	return (
		<>
			<ReactPaginate
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={pageChangeHandler}
				className='flex gap-3 justify-end mt-4 items-center'
				activeClassName='bg-cyan-600 rounded-sm'
				pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
				previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				disabledClassName='text-white/50 cursor-not-allowed'
				disabledLinkClassName='text-slate-600 cursor-not-allowed'
			/>
			<div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Title</td>
							<td className='font-bold'>Amount</td>
							<td className='font-bold'>Category</td>
							<td className='font-bold'>Date</td>
							<td className='text-right'>Action</td>
						</tr>
					</thead>
					<tbody>
						{data.map((trans, ind) => (
							<tr key={ind}>
								<td>{trans.id + 1}</td>
								<td>{trans.title}</td>
								<td
									className={
										trans.type === 'income' ? 'text-green-500' : 'text-red-500'
									}
								>
									{trans.type === 'income'
										? `+ ${formatToUSD.format(trans.amount)}`
										: `- ${formatToUSD.format(trans.amount)}`}
								</td>
								<td>{trans.category?.title || 'Other'}</td>
								<td>{formateDate(trans.createdAt)}</td>
								<td>
									<Form method='delete' action='/transactions'>
										<input type='hidden' name='id' value={trans.id} />
										<button className='btn ml-auto hover:btn-red'>
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable
