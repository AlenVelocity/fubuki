export default (): string => `query userInfo($login: String!) {
        user(login: $login) {
          avatarUrl
          name
          login
          location
          bio
          isDeveloperProgramMember
          isHireable
          issues {
            totalCount
          }
          repositories(first: 100) {
            totalCount
            nodes {
              isFork
              name
              isLocked
              isTemplate
              issues {
                totalCount
              }
            }
          }
          contributionsCollection {
            firstIssueContribution {
              ... on CreatedIssueContribution {
                __typename
                url
              }
            }
            firstPullRequestContribution {
              ... on CreatedPullRequestContribution {
                __typename
                url
              }
            }
          }
          followers {
            totalCount
          }
          following {
            totalCount
          }
          gists {
            totalCount
          }
          projects(first: 100) {
            totalCount
            nodes {
              name
              url
            }
          }
        }
      }
      `

export interface IUser {
    avatarUrl: string
    name: string
    login: string
    location: string
    bio: string
    isDeveloperProgramMember: boolean
    isHireable: boolean
    issues: Issues
    repositories: Repositories
    contributionsCollection: ContributionsCollection
    followers: Followers
    following: Following
    gists: Gists
    projects: Projects
}

interface Issues {
    totalCount: number
}

interface Node {
    isFork: boolean
    name: string
    isLocked: boolean
    isTemplate: boolean
    issues: Issues
}

interface Repositories {
    totalCount: number
    nodes: Node[]
}

interface FirstIssueContribution {
    __typename: string
    url: string
}

interface FirstPullRequestContribution {
    __typename: string
    url: string
}

interface ContributionsCollection {
    firstIssueContribution: FirstIssueContribution
    firstPullRequestContribution: FirstPullRequestContribution
}

interface Followers {
    totalCount: number
}

interface Following {
    totalCount: number
}

interface Gists {
    totalCount: number
}

interface Node2 {
    name: string
    url: string
}

interface Projects {
    totalCount: number
    nodes: Node2[]
}
