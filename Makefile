export SHELL = /bin/bash

install:
	yarn install

# TESTS

test:
	yarn test

test-coverage:
	yarn test-coverage

# CIRCLE INTEGRATION

ci-install:
	yarn install --no-progress