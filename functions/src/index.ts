import { setGlobalOptions } from 'firebase-functions/v2'
import { onRequest, onCall } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import * as admin from 'firebase-admin'

// Initialize Admin SDK
admin.initializeApp()

// Set global function options
setGlobalOptions({ maxInstances: 10, region: 'asia-south1' })

/**
 * Example HTTP request function
 * Accessible via: http://<host>:<port>/<project-id>/<region>/helloHttp
 */
export const helloHttp = onRequest((request, response) => {
  logger.info('helloHttp called', { structuredData: true })
  response.json({
    message: 'Hello from Firebase Cloud Functions!',
    timestamp: new Date().toISOString(),
  })
})

/**
 * Example Callable function (invokable directly from client SDK with httpsCallable)
 */
export const getGreeting = onCall((request) => {
  // Check auth if needed: if (!request.auth) throw new HttpsError('unauthenticated', 'User must be authenticated');
  const name = (request.data && (request.data as { name?: string }).name) || 'World'
  logger.info(`getGreeting called for name: ${name}`)
  return {
    greeting: `Hello, ${name}! Welcome to your Vue 3 + Firebase app.`,
    authenticated: Boolean(request.auth),
    timestamp: new Date().toISOString(),
  }
})
