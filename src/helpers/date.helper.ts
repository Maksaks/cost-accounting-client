export const formateDate = (dateIn: string): string => {
	const date = new Date(dateIn)
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleDateString('us-US', options)
}
