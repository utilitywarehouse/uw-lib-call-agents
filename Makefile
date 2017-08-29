export SHELL = /bin/bash

install:
	yarn install

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
