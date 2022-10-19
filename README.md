# oko-press-task
## Getting Started
* `npm install` to install all dependencies
* `npm run start` to start the app, application runs on port 3000 (http://localhost:3000)
* `npm run test` to start unit tests

## API methods
`/transactions`
[POST] request.body:
```js
{
    "userId": string,
    "date": string, // dateString example: "2022-10-18T12:00:13.354Z"
    "txStatus": boolean
}
```

[GET] query params:
* `page`
*`limit`
