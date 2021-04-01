#!/usr/bin/env bash
rm -rf dist
tsc
echo '{ "multerDest": "uploads/", "uploads": "/../uploads", "assets": "/../assets", "web": "/../../web/dist" }' > ./dist/path.json