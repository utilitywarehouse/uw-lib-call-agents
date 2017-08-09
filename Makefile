export SHELL = /bin/bash

# TESTS

test:
	yarn test

test-coverage:
	yarn test-coverage

# CIRCLE INTEGRATION

ci-install:
	yarn install --no-progress