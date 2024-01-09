import { FC } from 'react'
import { Form } from 'react-router-dom'

interface Props {
	type: 'post' | 'patch'
	id?: number
	setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
	return (
		<div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center'>
			<Form
				action='/categories'
				method={type}
				className='grid gap-2 w-[300px] p-5 rounded-md bg-slate-900'
				onSubmit={() => setVisibleModal(false)}
			>
				<input value={id} name='id' type='hidden' />
				<label htmlFor='title'>
					<small>Title</small>
					<input
						type='text'
						name='title'
						placeholder='Title...'
						className='input w-full'
					/>
				</label>
				<div className='flex items-center gap-2'>
					<button className='btn btn-green' type='submit'>
						{type === 'post' ? 'Create' : 'Save'}
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						className='btn btn-red'
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
