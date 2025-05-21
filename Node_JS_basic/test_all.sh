#!/bin/bash

echo "===== Test 5-http.js ====="
node 5-http.js database.csv &
PID=$!
sleep 1
curl -s localhost:1245 && echo ""
curl -s localhost:1245/students && echo ""
kill $PID

echo -e "\n===== Test 6-http_express.js ====="
node 6-http_express.js &
PID=$!
sleep 1
curl -s localhost:1245 && echo ""
curl -s localhost:1245/unknown && echo ""
kill $PID

echo -e "\n===== Test 7-http_express.js ====="
node 7-http_express.js database.csv &
PID=$!
sleep 1
curl -s localhost:1245 && echo ""
curl -s localhost:1245/students && echo ""
kill $PID
