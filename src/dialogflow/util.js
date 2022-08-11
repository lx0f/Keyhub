const dialogflow = require('@google-cloud/dialogflow').v2beta1;
const {
    KnowledgeBasesClient,
    DocumentsClient } = dialogflow;

async function createKnowledgeBase(projectId, displayName, credentials) {
    // const projectId = 'ID of GCP project associated with your Dialogflow agent';
    // const displayName = `your knowledge base display name, e.g. myKnowledgeBase`;
    const client = new KnowledgeBasesClient({ credentials: credentials });
    const formattedParent = 'projects/' + projectId;
    const knowledgeBase = {
        displayName: displayName,
    };
    const [existingKnowledgeBases] = await client.listKnowledgeBases({
        parent: `projects/${projectId}`
    });

    if (existingKnowledgeBases.length > 0)
    {
        return existingKnowledgeBases[0].name;
    }
    else
    {
        const [result] = await client.createKnowledgeBase({
            parent: formattedParent,
            knowledgeBase: knowledgeBase,
        });
        console.log(`Name: ${result.name}`);
        console.log(`displayName: ${result.displayName}`);
        return result.name;
    }
}

async function addOrUpdateDocumentToKnowledgeBase(
    projectId,
    knowledgeBaseFullName,
    documentPath,
    documentName,
    knowledgeTypes,
    mimeType,
    credentials
) {
    // const projectId = 'ID of GCP project associated with your Dialogflow agent';
    // const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;
    // const documentPath = `path of the document you'd like to add, e.g. https://dialogflow.com/docs/knowledge-connectors`;
    // const documentName = `displayed name of your document in knowledge base, e.g. myDoc`;
    // const knowledgeTypes = `The Knowledge type of the Document. e.g. FAQ`;
    // const mimeType = `The mime_type of the Document. e.g. text/csv, text/html,text/plain, text/pdf etc.`;

    // projects/*/knowledgeBases/*
    const client = new DocumentsClient({
        projectId: projectId,
        credentials: credentials
    });

    const fs = require('fs');
    const content = fs.readFileSync(documentPath);
    if (content.byteLength == 0)
    {
        return null;
    }
    const request = {
        parent: knowledgeBaseFullName,
        document: {
            knowledgeTypes: [knowledgeTypes],
            displayName: documentName,
            content: content.toString(),
            source: 'rawContent',
            mimeType: mimeType,
        },
    };
    const [result] = await client.listDocuments({ parent: knowledgeBaseFullName });
    if (result.length > 0)
    {
        const name = result[0].name;
        const [operation] = await client.deleteDocument({ name });
        const [response] = await operation.promise();
    }

    const [operation] = await client.createDocument(request);
    const [response] = await operation.promise();

    console.log('Document created');
    console.log(`Content URI...${response.contentUri}`);
    console.log(`displayName...${response.displayName}`);
    console.log(`mimeType...${response.mimeType}`);
    console.log(`name...${response.name}`);
    console.log(`source...${response.source}`);
}

module.exports = {
    addDocumentToKnowledgeBase: addOrUpdateDocumentToKnowledgeBase,
    createKnowledgeBase,
};
