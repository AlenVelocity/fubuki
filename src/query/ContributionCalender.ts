// Taken from https://github.com/kawarimidoll/deno-github-contributions-api/blob/d575a55bd7920961ea82ba3a5f317a9fdd4e8655/contributions.ts#L34
export default (): string => `query($username:String!) {
    user(login: $username){
        contributionsCollection {
            contributionCalendar {
                totalContributions
                weeks {
                    contributionDays {
                    color
                    contributionCount
                    contributionLevel
                    date
                    }
                }
            }
        }
    }
}`

export interface IContributionsCalender {
    totalContributions: number
    weeks: {
        contributionDays: {
            color: string
            contributionCount: number
            contributionLevel: string
            date: string
        }[]
    }[]
}
