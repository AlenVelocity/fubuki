export default (): string => `query {
    repositoryOwner (login: $login) {
      repositories {
        totalCount
      }
      repository(name: $repository) {
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
    }
  }`
