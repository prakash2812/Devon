import { defineConfig } from 'cypress';
import { CypressConfigInterface } from './src/Interface/CypressConfigInterface';

const config: CypressConfigInterface = {
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:5173',
        supportFile: 'cypress/support/e2e.ts',
        specPattern: 'cypress/integration/**/*.spec.{js,ts,jsx,tsx}',
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        supportFile: 'cypress/support/e2e.ts',
    },
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    chromeWebSecurity: true,
    chromeArgs: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: 1,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        reporterEnabled: 'mochawesome',
        mochawesomeReporterOptions: {
            reportDir: 'cypress/reports/mochawesome',
            overwrite: false,
            html: true,
            json: true,
        },
        junitReporterOptions: {
            mochaFile: 'cypress/reports/junit/test-results.[hash].xml',
            toConsole: true,
        },
    },
};

export default defineConfig(config);
