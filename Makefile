install:
    npm install ci

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage