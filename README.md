## Carcare

### Prerequisites

- Npm
- Go
- MongoDB

### Configuration

- The port to be used can be customized from `/server/main.go`
- The mongodb connection url is to be updated in `/server/middleware/middleware.go:21`

### How to run?

```
  npm run build
  cd server
  go main.go
```

You can see your application at `htttp://localhost:{port-number}/` by default it's `3200`.

### Postman collection

Postman collection can be found at `postman/Carcare-API.postman_collection.json`
