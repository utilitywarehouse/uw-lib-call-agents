export SHELL = /bin/bash

# TESTS

yarn:
	yarn install

test: yarn
	yarn test

test-coverage: yarn
	yarn test-coverage

# CIRCLE INTEGRATION

ci-install:
	yarn install --no-progress
