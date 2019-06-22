function fetchWithTimeout(url: string, params: RequestInit, ms: number) {
    return new Promise<Response>(async (resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error('promise timeout'))
        }, ms)

        try {
            const res = await fetch(url, params)
            clearTimeout(timeoutId)
            resolve(res)
        } catch (err) {
            clearTimeout(timeoutId)
            reject(err)
        }
    })
}

export const REQUEST_TIMEOUT = 30000

export async function requestPost(svcUrl: string, path: string, reqBody: Object, timeout = REQUEST_TIMEOUT) {
    const serviceUrl = svcUrl
    const body = reqBody ? JSON.stringify(reqBody) : ''
    try {
        const res = await fetchWithTimeout(
            serviceUrl + path,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body,
            },
            timeout
        )

        if (res.status === 200) {
            return res.json()
        } else {
            throw { code: res.status.toString() }
        }
    } catch (err) {
        console.log(`HTTP POST to ${serviceUrl + path} WITH BODY ${body}`, err)
        throw err
    }
}

function objectToRequestUrl(params: any) {
    return params ? 
        Object
            .keys(params)
            .map(key => `${key}=${params[key]}`)
            .reduce((prev, next, i) => `${prev}${!i ? '' : '&'}${next}`, '?') : ''
}

export async function requestGet(svcUrl: string, path: string, params?: any, timeout = REQUEST_TIMEOUT) {
    const url = `${svcUrl}${path}${objectToRequestUrl(params)}`
    try {
        const res = await fetchWithTimeout(
            url,
            {
                method: 'get'
            },
            timeout
        )

        if (res.status === 200) {
            return res.json()
        } else {
            throw { code: res.status.toString() }
        }
    } catch (err) {
        console.log(`HTTP GET to ${url}`, err)
        throw err
    }
}