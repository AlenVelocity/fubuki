import { Required } from './Decorators/ParameterValidator'
import TokenValidator from './Decorators/TokenValidator'
import fetcher from './Utils/fetcher'
export class GithubClient {

    BASE_URL = 'https://api.github.com/graphql'

    @TokenValidator()
    token: string

    constructor(@Required() token: string) {
        this.token = token
    }

    private __fetch = async <R>(query: string, variables: { [key: string]: string }): Promise<R> => {
        const data = JSON.stringify({
            query,
            variables
        })
        const method = fetcher('post')
        return await method<R>(this.BASE_URL, data, {
            Authorization: `Bearer ${this.token}`
        })
    }
}
