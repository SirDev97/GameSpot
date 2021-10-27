// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

// function init() {
//   Sentry.init({
//     dsn: 'https://8b43abd98363456880b075835212ceba@o1050236.ingest.sentry.io/6031468',
//     integrations: [new Integrations.BrowserTracing()],

//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
//   });
// }

function log(error) {
    //   Sentry.captureException(error);
    console.error(error);
}

export default log;