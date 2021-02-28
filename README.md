# Mercado Libre Challenge

## Project setup
```
npm install
```

## Environment setup
```
Edit .env file to setup your environment

PORT={{port}}
WOLFRAM_ID={{wolfram_id}}
APP_NAME={{app_name}}
APP_API_KEY={{app_api_key}}
APP_AUTHENTICATION={{app_authentication}}
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Entry point will be according to your environment setup
```
Host: localhost:{{PORT}}/api/{{APP_NAME}}

Headers for authenticated endpoints: {
  api-key: {{APP_API_KEY}},
  authentication: {{APP_AUTHENTICATION}}
}
```
