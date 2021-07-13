import { Required, Validate } from './Decorators/ParameterValidator'
import TokenValidator from './Decorators/TokenValidator'
import Repository, { IRepository } from './query/Repository'
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
    async getUser(@Required() username: string): Promise<IUserStats> {
        const result = await this.__fetch<GithubStats<{ user: IUserStats }>>(User(), { login: username })
        if (!result.data.user) throw new Error(`Invalid Username: ${username}`)
        return result.data.user
    }

    @Validate()
    async getRepository(
        @Required() { owner, repository }: { owner: string; repository: string }
    ): Promise<IRepository> {
        const result = await this.__fetch<GithubStats<{ repository: IRepository }>>(Repository(), { owner, repository })
        if (!result.data.repository) throw new Error(`No valid repository found`)
        return result.data.repository
    }
}
