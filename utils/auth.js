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