import Validate from './Decorators/Validate'
export class GithubClient {
    @Validate()
    token: string

    constructor(token: string) {
        this.token = token
    }
}
