// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'


Sentry.init({
  dsn: "https://7960ff06afcb9b183c282bb7e32f30ac@o4509590084124672.ingest.us.sentry.io/4509590091792384",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],
//   tracesSampleRate: 1.0,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

Sentry.profiler.startProfiler()