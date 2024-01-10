/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import Chart from '../components/Chart'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import { formatToUSD } from '../helpers/currency.helper'
import { ICategory, IResponseTransactionLoader } from '../types/types'

export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get('/transactions')
	const totalIncome = await instance.get<number>('/transactions/income/find')
	const totalExpense = await instance.get<number>('/transactions/expense/find')

	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	}
	return data
}

export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}
			await instance.post('/transactions', newTransaction)
			toast.success('Transaction added')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionID = formData.get('id')
			await instance.delete(`/transactions/transaction/${transactionID}`)
			toast.success('Transaction deleted')
			return null
		}
	}
}

const Transaction: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader
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
								{formatToUSD.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className='uppercase text-md font-bold text-center'>
								Total expense:
							</p>
							<p className='bg-red-500 p-1 rounded-sm text-center mt-2'>
								{formatToUSD.format(totalExpense)}
							</p>
						</div>
					</div>
					<>
						<Chart totalExpense={totalExpense} totalIncome={totalIncome} />
					</>
				</div>
			</div>
			<h1 className='my-5'>
				<TransactionTable limit={5} />
			</h1>
		</>
	)
}

export default Transaction
