# Data structure [In Progress]
## Aggregations

source
- https://api.pikespeak.ai/network/active-accounts?period=day
- https://api.pikespeak.ai/network/last-week-total-tx
  
Input
```
{
  period: "day" // day, week, month
}
```

Output
```
{
  accounts: 10,
  transactions: 100,
  daily_change: {
    accounts: 5,
    transactions: -100
  },
  weekly_change: {
    accounts: 1,
    transactions: 10
  },
  monthly_change: {
    accounts: 10,
    transactions: 100
  }
}
```

## Account retention:

### Account history for a given Time period

Input
```js
{
  start_date: "2024-01-04T19:43:01.198Z",
  end_date: "2024-01-04T19:43:01.198Z",
  type: "NEAR" // NEAR, Stable, Bridge
}
```

Output:
```js
[
  {
    transaction_id: "...",
    sender: "sender.near",
    receiver: "receiver.near",
    type: "NEAR",
    timestamp: "2024-01-04T19:43:01.198Z",
    amount: 0.18810000000000000000000
  }
]
```

### Richest Accounts [OPTIONAL]
  
data source:
- https://api.pikespeak.ai/hot-wallets/near
- https://api.pikespeak.ai/hot-wallets/stable
- https://api.pikespeak.ai/hot-wallets/fungible

Input
```js
{
  type: "Near" // Near, Stable, Ft
}
```

Output:
```js
{
  "totalAmount": "16390635.927077794922735018557942",
  "totalUSDValue": "59498008.41529239556952811736532946",
  "topAccounts": [
    {
      "account": "5c33c6218d47e00ef229f60da78d0897e1ee9665312550b8afd5f9c7bc6957d2",
      "amount": "3268264.05876080000000000000000",
      "txCount": "402",
      "usdValue": "11863798.533301704"
    },
  ]
}
```

### TOP N Active Accounts for a given Time period

Input
```js
{
  start_date: "2024-01-04T19:43:01.198Z",
  end_date: "2025-01-04T19:43:01.198Z",
  type: "NEAR", // NEAR, Stable, Bridge
  size: 10 // to display TOP 10 accounts
}
```

Output:
```js
[
  {
    account_id: "account.near",
    type: "NEAR",
    amount_received: 0.18810000000000000000000,
    amount_spent: 200
  }
]
```

 ## Funded initiatives (DAO's)

 ### Funded accoounts from given dao

 Input
```js
{
  account_id: "Dao Name",
}
```

Output
```
[
  {
    account_id: "account.near",
    type: "NEAR", // near, usdc.e
    amount_received: 1000,
  }
]
```

 ## dApps activity

 ### Funded accoounts from given dao

 Input
```js
{
  account_id: "DApp name",
  start_date: "2024-01-04T19:43:01.198Z",
  end_date: "2025-01-04T19:43:01.198Z",
}
```

Output
```
[
  {
    account_id: "account.near",
    type: "NEAR", // near, usdc.e
    amount_received: 1000,
  }
]
```

 ### TOP proposers for a given dao

 Input
```js
{
  account_id: "dao name",
  size: 10
}
```

Output
```
[
  {
    account_id: "account.near",
    proposals_count: 3
  }
]
```

 ## User statistics

 ### TOP accounts that uses N Dapps for period

 Input
```js
{
  min_dapps_size: 3,
  start_date: "2024-01-04T19:43:01.198Z",
  end_date: "2025-01-04T19:43:01.198Z",
}
```

Output
```
[
  {
    account_id: "account.near",
    transactions: 100,
    dapps: 10, // could be array of dapps obects
    // dapps: [
    //  { account_id: "dapp name", transactions: 10 }
    // ]
  }
]
```
