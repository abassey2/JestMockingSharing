# Testing with Environment Variables

## Introduction

Environment variables are very useful in software engineering for many reasons including application configuration.
Many classes require these configurations to determine their behavior.
While there is a preference for reading these environment variables in at the app entry point and passing config objects to classes (making testing very simple), there are times when this may not be possible.
In this other case, where you must access the environment variables directly (using `process.env.YOUR_ENVIRONMENT_VAR`), there are a few things to consider during testing.

If your tests are simple and each test file can use the same exact set of environment variables, utilize the [`setupFiles`](https://jestjs.io/docs/configuration#setupfiles-array) field of the `jest.config.js` to point to a TS file that will be run before each test file is executed (where you can set your environment variables) as shown [here](https://tekloon.dev/using-dotenv-with-jest).

However, in most cases, where different environment variables/the flexibility to change environment variables on a per test basis is needed, follow the sample code described below.

## Code Walkthrough

For this scenario, we have a simple (but admittedly useless) `LoggingService` that returns different strings based on which environment it is in (Azure vs Local).
Thus we must unit test to see whether the `LoggingService` returns the right string based on the environment variables set.

Because these tests will change environment variables, we first cache the old environment in the `beforeAll` block and reset this exact environment after all the tests in the `afterAll` block.

Before each test, we importantly utilize the [`jest.resetModules()`](https://jestjs.io/docs/jest-object#jestresetmodules) function so that modules are imported again in between each test.
This is especially important if the class being tested captures environment variables globally (in its file but outside the class definition).

Lastly, because the `LoggingService` code and what we're testing is so basic, at the beginning of each test, we simply set the required environment variable and test the output of the `info(message: string)` function based on that environment variable:

```ts
process.env.LOGGING_ENVIRONMENT = "AZURE";
const message = "message";
expect(loggingService.info(message)).toBe("[AZURE] " + message);
```

Note: if the entire test file requires the same set of environment variables, you can set them in the `beforeAll` via `process.env.______` or add them to a `test.env` file and load them using a library like [dotenv](https://www.npmjs.com/package/dotenv):

```ts
beforeAll(() => {
    // cache a copy of user env before tests
    cachedEnv = { ...process.env };
    // add 'test.env' values to user env
    dotenv.config({ override: true, path: path.resolve(__dirname, 'test.env') });
});

beforeEach(() => {
    // Resets the module registry - the cache of all required modules.
    // This is useful to isolate modules where local state might conflict between tests.
    jest.resetModules();

    // Create logging service for tests
    loggingService = new LoggingService();
})

afterAll(() => {
    // reset user env vars
    process.env = cachedEnv;
});
```

`test.env`:
```env
LOGGING_ENVIRONMENT=LOCAL
...
```
