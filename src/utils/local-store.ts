export class LocalStorage {
    private static getItem(key: string) {
        let result: string | null = null
        try {
            const val = localStorage.getItem(key)
            result = val ? JSON.parse(val) : null
        } catch (err) {
            /* tslint:disable */
            console.log('Invalid token in local store or localStorage inaccessible for the key: ' + key)
            console.log('Encountered an error: ' + err)
            /* tslint:enable */
        }
        return result
    }
    
    public static get(key: string) {
        const val = LocalStorage.getItem(key)
        return val ? JSON.parse(val) : null
    }

    public static set(key: string, value: string) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            /* tslint:disable */
            console.log('LocalStore inaccessible')
            /* tslint:enable */
        }
    }

    public static remove(key: string) {
        localStorage.removeItem(key)
    }
}
