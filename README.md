# Fubuki
<img src="https://images.squarespace-cdn.com/content/v1/5ac8997aaa49a16d3b6dfe3a/1619053326745-M9PXMA5534IJJJXGF67B/Shirakami+Fubuki.png?format=200" align=right />

## Github GraphQL API Client
-------------------------------

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

### This package refers the following:
### - [Github GraphQL API](https://developer.github.com/v4/)
### - [GraphQL Schema](https://github.com/graphql/graphql-js/blob/master/src/__tests__/schema/schema.js)

-------------------------
## Install
```
npm install --save fubuki
```
## Usage
```js
const { GithubClient } = require('fubuki')
// import { GithubClient } from 'fubuki'

const fubuki = new GithubClient(github_accessToken)
```

### Get a user
```js
const data = await fubuki.getUser('alensaito1')

console.log(data) /* {
    name: 'Alen Yohannan'
    login: 'alensaito1'
    pullRequests: {
        totalCount: 1400
    }...*/
```
### Get a Repository 
```js
const data = await fubuki.getRepository({
    owner: 'alensaito1',
    repository: 'fubuki'
})

console.log(data) /* {
    description: 'Github GQL API Client'
    forks: {
         totalCount: 0
    }...*/
```

### Get the contributions calender of a user
```js
const data = await fubuki.getContributionsCalendar('alensaito1')

console.log(data) /*{
    weeks: {
        [contributionDays: [{
            color: '#ebedf0'
            contributionCount: 9
            contributionLevel:'FIRST_QUARTILE'
            date: '2021-07-13'
        }...]
    }...]
}*/
```

