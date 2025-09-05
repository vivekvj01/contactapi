#!/bin/bash

# Simple test script for the Contact Query AppLink app
# Note: This app uses the AppLink SDK pattern, so testing requires
# the AppLink service mesh to be running locally or deployed to Heroku

BASE_URL="http://localhost:3000"

echo "Testing Contact Query AppLink App"
echo "================================="
echo ""
echo "Note: This app uses the AppLink SDK pattern with request.sdk"
echo "For full testing, deploy to Heroku with AppLink add-on or use"
echo "the Heroku AppLink CLI tools for local testing."
echo ""

# Test health endpoint
echo "1. Testing health endpoint..."
curl -s "$BASE_URL/health" | jq '.' 2>/dev/null || curl -s "$BASE_URL/health"
echo ""
echo ""

# Test contacts endpoint (will fail locally without AppLink service mesh)
echo "2. Testing contacts endpoint..."
echo "Note: This will likely fail locally as it requires AppLink SDK context"
echo ""

curl -s -X GET "$BASE_URL/contacts" | jq '.' 2>/dev/null || curl -s -X GET "$BASE_URL/contacts"

echo ""
echo ""
echo "Test completed!"
echo ""
echo "For proper testing:"
echo "1. Deploy to Heroku with AppLink add-on"
echo "2. Use Heroku AppLink CLI tools"
echo "3. Test through Salesforce External Services"
