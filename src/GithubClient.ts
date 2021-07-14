import { Required, Validate } from './Decorators/ParameterValidator'
import TokenValidator from './Decorators/TokenValidator'
import Contributions, { IContributionsCalender } from './query/ContributionCalender'
import Repository, { IRepository } from './query/Repository'
import User, { IUser } from './query/User'
import fetcher from './Utils/fetcher'

export interface GithubStats<IStats> {
    data: IStats
}

/*
 * Github Client
 */
export class GithubClient {
    BASE_URL = 'https://api.github.com/graphql'

    @TokenValidator()
    /**
     * Github acess token
     * @type {string}
     */
    token: string

    /**
     * @param {string} token - github acess token | [Generate Here](https://github.com/settings/tokens)
     */
    constructor(@Required() token: string) {
        if (!token) throw new Error('No acess token provided')
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

    /**
     * Fetches the user's github stats
     * @param {string} username - username of the user
     * @returns {Promise<IUserStats>} - User stats
     */
    @Validate()
    async getUser(@Required() username: string): Promise<IUser> {
        const result = await this.__fetch<GithubStats<{ user: IUser }>>(User(), { login: username })
        if (!result.data.user) throw new Error(`Invalid Username: ${username}`)
        return result.data.user
    }

    /**
     * Fecthes repositories
     * @param {Object<{ owner: string, repository: string }>} - Object containing owner and repository
     * @returns {Promise<IRepository>} - Repository stats
     */
    @Validate()
    async getRepository(
        @Required() { owner, repository }: { owner: string; repository: string }
    ): Promise<IRepository> {
        const result = await this.__fetch<GithubStats<{ repository: IRepository }>>(Repository(), { owner, repository })
        if (!result.data.repository) throw new Error(`No valid repository found`)
        return result.data.repository
    }

    /**
     * Fetches users' contributions calender
     * @param {string}username - username o the user
     * @returns {Promise<IContributionsCalender>} - Contributions Calender
     */
    @Validate()
    async getContributionsCalender(@Required() username: string): Promise<IContributionsCalender> {
        const result = await this.__fetch<
            GithubStats<{ user: { contributionsCollection: { contributionCalendar: IContributionsCalender } } }>
        >(Contributions(), { username })
        if (!result.data?.user?.contributionsCollection?.contributionCalendar) throw new Error(`Invalid Input`)
        return result.data.user.contributionsCollection?.contributionCalendar
    }

    /**
     * Fetches the Github GQL API Using your query
     * @param {string}query - gql query to fetch
     * @param {Object<{ [key: string]: string }>}variables - variables to pass to the query
     * @returns {Promise<{ data: any, errors: any }>} - Promise of the result
     */
    @Validate()
    async customQuery<T>(
        @Required() query: string,
        @Required() variables: { [key: string]: string }
    ): Promise<{ data: T | null; errors: unknown | null }> {
        return await this.__fetch(query, variables)
    }
}
