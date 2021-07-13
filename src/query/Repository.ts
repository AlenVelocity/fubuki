export default (): string => `query repoInfo($owner: String!, $repository: String!) {
      repository(name: $repository, owner: $owner) {
        description
        forks {
          totalCount
        }
        issues {
          totalCount
        }
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
        pullRequests {
          totalCount
        }
        labels(first:10) {
          edges {
            node {
              name
            }
          }
        }
        milestones(first:10) {
          edges {
            node {
              title
            }
          }
        }
      }
    }`

// Created using Github Copilot
export interface IRepository {
    description: string
    forks: RepositoryForks
    issues: RepositoryIssues
    stargazers: RepositoryStargazers
    watchers: RepositoryWatchers
    pullRequests: RepositoryPullRequests
    labels: RepositoryLabels
    milestones: RepositoryMilestones
}

interface RepositoryForks {
    totalCount: number
}

interface RepositoryIssues {
    totalCount: number
}

interface RepositoryStargazers {
    totalCount: number
}

interface RepositoryWatchers {
    totalCount: number
}

interface RepositoryPullRequests {
    totalCount: number
}

interface RepositoryLabels {
    edges: RepositoryLabelsEdge[]
}

interface RepositoryLabelsEdge {
    node: RepositoryLabelsNode
}

interface RepositoryLabelsNode {
    name: string
}

interface RepositoryMilestones {
    edges: RepositoryMilestonesEdge[]
}

interface RepositoryMilestonesEdge {
    node: RepositoryMilestonesNode
}

interface RepositoryMilestonesNode {
    title: string
}
