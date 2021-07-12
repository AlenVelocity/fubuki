export default (): string => `fragment RepoInfo on Repository {
        name
        nameWithOwner
        isPrivate
        isArchived
        isTemplate
        stargazers {
            totalCount
        }
        description
        primaryLanguage {
            color
            id
            name
        }
        forkCount
    }
query getRepo($login: String!, $repo: String!) {
    user(login: $login) {
        repository(name: $repo) {
        ...RepoInfo
        }
    }
    organization(login: $login) {
        repository(name: $repo) {
        ...RepoInfo
        }
    }
}
`
