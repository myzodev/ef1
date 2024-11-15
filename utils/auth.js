export const checkRequiredFields = (data, requiredFields) => {
	const missingFields = requiredFields.filter((field) => !data[field])

	if (missingFields.length > 0) {
		return false
	}

	return true
}

export const generateResponse = (error, message, data) => {
    return {
        error,
        message,
        data
    }
}

export const slugify = (text) => {
	return text
		.normalize('NFD') // Normalize to NFD form
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.trim() // Trim leading/trailing spaces
		.replace(/\s+/g, '-'); // Replace spaces with dashes
};