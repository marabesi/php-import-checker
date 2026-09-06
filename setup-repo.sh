#!/bin/bash
rm -rf ./node_modules
npm install
npm run test:all
npm run package

