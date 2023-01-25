# sql-proxy

Run sql queries via HTTP.

## Example

Send a query string to be executed against your postgres DB.

```
curl -X "POST" "http://127.0.0.1:3000/v1/query" \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d $'{
  "query_string": "SELECT * from accounts_user;"
}'
```

Returns
```json
{
  "query_string": "SELECT * from accounts_user;",
  "metadata": {
    "id": "text",
    "name": "text",
    "email": "text",
    "email_verified": "timestamptz",
    "image": "text",
    "created_at": "timestamptz",
    "updated_at": "timestamptz"
  },
    "data": [
    [
      "usr_1234",
      "Ken Masters",
      "ken@example.com",
      "2023-01-25T06:21:53.161Z",
      "test",
      "2023-01-25T06:21:53.161Z",
      "2023-01-25T06:21:53.161Z"
    ]
  ]
}
```
