import { Required, Validate } from './Decorators/ParameterValidator'
import TokenValidator from './Decorators/TokenValidator'
import User, { IUserStats } from './query/User'
import fetcher from './Utils/fetcher'

export interface GithubStats<IStats> {
    data: IStats
}
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

    @Validate()
    async userStats(@Required() username: string): Promise<IUserStats> {
        return (await this.__fetch<GithubStats<{ user: IUserStats }>>(User(), { login: username })).data.user
    }
}

//convert stats to an interface
