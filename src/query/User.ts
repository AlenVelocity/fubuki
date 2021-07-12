export default (): string => `query userInfo($login: String!) {
        user(login: $login) {
            name
            login
            pullRequests(first: 1) {
                totalCount
            }
            issues(first: 1) {
                totalCount
            }   
            followers {
                totalCount
            }
            contributionsCollection {
                totalCommitContributions
                restrictedContributionsCount
            }
            repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
                totalCount
            }
            repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
                totalCount
            nodes {
                stargazers {
                    totalCount
                }
            }
        }
    }
}`
