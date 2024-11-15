export const generateKeysValues = (object) => {
    const keys = Object.keys(object)
    const values = Object.values(object)
    return { keys, values }
}

export const slugify = (text) => {
	return text
		.normalize('NFD') // Normalize to NFD form
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.trim() // Trim leading/trailing spaces
		.replace(/\s+/g, '-') // Replace spaces with dashes
}