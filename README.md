# Contact Query AppLink App

A stripped-down Heroku AppLink application that retrieves Salesforce contacts using the Salesforce REST API.

## Overview

This is a simplified version of the [Heroku AppLink Sample App](https://github.com/heroku-reference-apps/applink-getting-started-nodejs) that focuses solely on querying Salesforce contacts. The app uses Fastify as the web framework and integrates with Salesforce through Heroku AppLink.

## Features

- **GET /contacts** - Retrieves Salesforce contacts (Id, Name) using AppLink SDK
- **GET /health** - Health check endpoint
- Built with Fastify for high performance
- Heroku AppLink SDK integration with `request.sdk` pattern

## Quick Start

### Prerequisites

- Node.js 20.x or later
- npm
- Heroku CLI (for deployment)
- Salesforce org (for AppLink integration)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Test the endpoints:**
   - Health check: `http://localhost:3000/health`
   - Contacts: `http://localhost:3000/contacts` (requires AppLink SDK context)

## Heroku Deployment

### 1. Create Heroku App

```bash
heroku create your-app-name
```

### 2. Add Required Buildpacks

```bash
# Add the AppLink Service Mesh buildpack first
heroku buildpacks:add heroku/heroku-applink-service-mesh

# Add the Node.js buildpack second
heroku buildpacks:add heroku/nodejs
```

### 3. Provision the AppLink Add-on

```bash
# Provision the Heroku AppLink add-on
heroku addons:create heroku-applink

# Set the required HEROKU_APP_ID config var
heroku config:set HEROKU_APP_ID="$(heroku apps:info --json | jq -r '.app.id')"
```

### 4. Deploy

```bash
git push heroku main
heroku ps:scale web=1
```

## Heroku AppLink Setup

### 1. Install AppLink CLI Plugin

```bash
heroku plugins:install @heroku-cli/plugin-applink
```

### 2. Connect to Salesforce Org

```bash
# Connect to a production org
heroku salesforce:connect production-org --addon your-addon-name -a your-app-name

# Connect to a sandbox org
heroku salesforce:connect sandbox-org --addon your-addon-name -a your-app-name --login-url https://test.salesforce.com
```

### 3. Authorize a User

```bash
heroku salesforce:authorizations:add auth-user --addon your-addon-name -a your-app-name
```

### 4. Publish Your App

```bash
# Publish the app to Salesforce as an External Service
heroku salesforce:publish api-spec.yaml \
  --client-name ContactQueryAPI \
  --connection-name production-org \
  --authorization-connected-app-name ContactQueryConnectedApp \
  --authorization-permission-set-name ContactQueryPermissions \
  --addon your-addon-name
```

## API Specification

The `api-spec.yaml` file contains the OpenAPI 3.0.3 specification that defines:

- **GET /contacts** - Returns an array of Salesforce contacts with Id and Name fields
- **GET /health** - Health check endpoint
- **Contact Schema** - Defines the structure of contact objects
- Security schemes for Heroku AppLink authentication
- Response schemas and error handling

This specification is used by Heroku AppLink to:
- Generate Salesforce External Service definitions
- Provide API documentation
- Validate requests and responses
- Enable integration with Salesforce, Data Cloud, and Agentforce

## API Endpoints

### GET /contacts

Retrieves Salesforce contacts from the connected org using AppLink SDK.

**Query:** `SELECT Id, Name FROM Contact`

**Response:**
```json
[
  {
    "Id": "003000000000001",
    "Name": "John Doe"
  },
  {
    "Id": "003000000000002", 
    "Name": "Jane Smith"
  }
]
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Project Structure

```
├── src/
│   └── server.js          # Main Fastify server
├── api-spec.yaml         # OpenAPI specification for AppLink
├── package.json           # Dependencies and scripts
├── Procfile              # Heroku process definition
├── test.sh               # Test script
└── README.md             # This file
```

## Testing Locally

This app uses the AppLink SDK pattern with `request.sdk`, so local testing requires the AppLink service mesh. For full testing:

1. **Deploy to Heroku** with AppLink add-on (recommended)
2. **Use Heroku AppLink CLI tools** for local testing
3. **Test through Salesforce External Services** after publishing

The health endpoint can be tested locally:
```bash
curl http://localhost:3000/health
```

## Error Handling

The app includes comprehensive error handling for:
- AppLink SDK context issues
- Salesforce API errors
- Query execution failures
- Internal server errors

## License

Apache-2.0

## Based On

This app is based on the [Heroku AppLink Sample App](https://github.com/heroku-reference-apps/applink-getting-started-nodejs) but stripped down to focus only on contact queries.
