const useObjToQuery = () => {
    const go = (obj) => {
        const keys = Object.keys(obj)

        let queryString = ''

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = obj[key]

            if (i === 0) {
                queryString += '?'
            } else {
                queryString += '&'
            }

            queryString += `${key}=${value}`
        }

        return queryString
    }

    return go
}

export default useObjToQuery
