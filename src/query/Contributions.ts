export default (): string => `query($userName:String!) {
    user(login: $userName){
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
