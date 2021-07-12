import { GithubClient } from '../GithubClient'

const Validate = () => {
    return (target: GithubClient, key: keyof GithubClient): void => {
        let value = target[key]
        if (!value) throw new Error(`Empty Token Recived`)
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

export default Validate
