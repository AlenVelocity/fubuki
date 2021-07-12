import { GithubClient } from '../GithubClient'

const TokenValidator = () => {
    return (target: GithubClient, key: keyof GithubClient): void => {
        let value = target[key]
        const get = () => value

        const set = (token: string) => {
            value = token.trim()
        }

        Object.defineProperty(target, key, {
            get,
            set,
            enumerable: true,
            configurable: true
        })
    }
}

export default TokenValidator
