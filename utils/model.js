export const generateKeysValues = (object) => {
    const keys = Object.keys(object)
    const values = Object.values(object)
    return { keys, values }
}