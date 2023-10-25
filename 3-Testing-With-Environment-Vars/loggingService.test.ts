import { LoggingService } from "./loggingService";

describe('LoggingService Tests', () => {
    let loggingService: LoggingService;
    let cachedEnv: NodeJS.ProcessEnv;

    beforeAll(() => {
        // cache a copy of user env before tests
        cachedEnv = { ...process.env };
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

    it('LoggingService logs correctly to "Azure"', () => {
        // Set env var for the test
        process.env.LOGGING_ENVIRONMENT = "AZURE";

        const message = "message";
        expect(loggingService.info(message)).toBe("[AZURE] " + message);
    })

    it('LoggingService logs correctly "locally"', () => {
        // Set env var for the test
        process.env.LOGGING_ENVIRONMENT = "LOCAL";

        const message = "message";

        expect(loggingService.info(message)).toBe("[LOCAL] " + message);
    })
})