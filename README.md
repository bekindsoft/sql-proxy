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
