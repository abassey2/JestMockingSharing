export class LoggingService {
    constructor() {
    }

    // returns a string just for example sake
    info(message: string): string {
        const loggingEnvironment = process.env.LOGGING_ENVIRONMENT;

        if (loggingEnvironment == "AZURE") {
            return "[AZURE] " + message;
        } else  {
            return "[LOCAL] " + message;
        }
    }
}
