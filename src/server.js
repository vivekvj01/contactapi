const fastify = require('fastify')({ logger: true });

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// GET /contacts endpoint - retrieves Salesforce contacts using AppLink SDK
fastify.get('/contacts', async (request, reply) => {
  try {
    const { event, context, logger } = request.sdk;

    logger.info(`GET /contacts: ${JSON.stringify(event.data || {})}`);

    const query = 'SELECT Id, Name FROM Contact';

    // Query invoking org's Contacts
    const org = context.org;
    logger.info(`Querying invoking org (${org.id}) Contacts...`);
    const result = await org.dataApi.query(query);
    const contacts = result.records.map(rec => rec.fields);
    logger.info(`For invoking org (${org.id}), found the following Contacts: ${JSON.stringify(contacts || {})}`);
    
    return contacts;

  } catch (error) {
    fastify.log.error(error);
    reply.code(500);
    return {
      error: 'Internal server error',
      message: error.message
    };
  }
});

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
