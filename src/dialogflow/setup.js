const credentials = require('../../keyhub-dialogflow-service-account.json');
const { createKnowledgeBase } = require('./util');
const { syncFAQDialogflow, exportFAQDocument } = require('./faq');
require('path')

async function dialogflowSync() {
    const projectId = 'keyhub-357302';
    const displayName = 'KnowledgeBase';

    const knowledgeBaseFullName = await createKnowledgeBase(projectId, displayName, credentials);

    // FAQ
    let documentPath = `${__dirname}/docs/FAQ.csv`;
    console.log('PATH', documentPath);
    await exportFAQDocument(documentPath);
    await syncFAQDialogflow(
        projectId,
        knowledgeBaseFullName,
        documentPath,
        credentials
    );
}

module.exports = dialogflowSync;
