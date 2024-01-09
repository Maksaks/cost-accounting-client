/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { instance } from '../api/axios.api'
import CategoryModal from '../components/CategoryModal'
import { ICategory } from '../types/types'

export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newCategory = {
				title: formData.get('title'),
			}
			await instance.post('/categories', newCategory)
			return null
		}
		case 'PATCH': {
			const formData = await request.formData()
			const categoryID = formData.get('id')
			const updatedCategory = {
				title: formData.get('title'),
			}
			await instance.patch(
				`/categories/category/${categoryID}`,
				updatedCategory
			)
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const categoryID = formData.get('id')
			await instance.delete(`/categories/category/${categoryID}`)
			return null
		}
	}
}

export const categorieLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [updatedCategoryID, setUpdatedCategoryID] = useState<number>(0)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
	return (
		<>
			<div className='mt-10 p-4 rounded-md bg-slate-800'>
				<h1>Your category list</h1>
				<div className='flex mt-2 items-center flex-wrap gap-2'>
					{categories.map((category, index) => (
						<div
							className='group py-2 px-4 rounded-lg bg-cyan-600 flex items-center relative gap-2'
							key={index}
						>
							{category.title}
							<div className='absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex'>
								<button
									onClick={() => {
										setIsVisibleModal(true)
										setUpdatedCategoryID(category.id)
										setIsEdit(true)
									}}
								>
									<AiFillEdit />
								</button>
								<Form className='flex' method='delete' action='/categories'>
									<input name='id' type='hidden' value={category.id} />
									<button type='submit'>
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>
				<button
					onClick={() => setIsVisibleModal(true)}
					className='max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white'
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>
			{isVisibleModal && (
				<CategoryModal type='post' setVisibleModal={setIsVisibleModal} />
			)}
			{isVisibleModal && isEdit && (
				<CategoryModal
					type='patch'
					id={updatedCategoryID}
					setVisibleModal={(state: boolean) => {
						setIsEdit(state)
						setIsVisibleModal(state)
					}}
				/>
			)}
		</>
	)
}

export default Categories
