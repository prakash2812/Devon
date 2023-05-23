export interface CypressConfigInterface {
    e2e: {
        setupNodeEvents(on: unknown, config: unknown): void;
        baseUrl: string;
        supportFile: string;
        specPattern: string;
    };
    component: {
        devServer: {
            framework: 'react';
            bundler: 'vite';
        };
        supportFile: string;
    };
    video: boolean;
    screenshotsFolder: string;
    chromeWebSecurity: boolean;
    chromeArgs: string[];
    viewportWidth: number;
    viewportHeight: number;
    retries: number;
    reporter: string;
    reporterOptions: {
        reporterEnabled: string;
        mochawesomeReporterOptions: {
            reportDir: string;
            overwrite: boolean;
            html: boolean;
            json: boolean;
        };
        junitReporterOptions: {
            mochaFile: string;
            toConsole: boolean;
        };
    };
}
