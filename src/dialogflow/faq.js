const { addDocumentToKnowledgeBase } = require('./util');

async function exportFAQDocument(path) {
    // ERROR:
    // In the .csv
    // Row 1: Question, Answer, Question Answer

    // EXPECTED:
    // Row 1: Question, Answer
    // Row 2: Question, Answer
    const FAQs = require('../models/FAQs');
    const fs = require('fs');
    const faqs = await FAQs.findAll();
    console.log(faqs);
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
    var dir = path.split('/');
    dir.pop();
    dir = dir.join('/');
    console.log('DIR', dir);
    if (!fs.existsSync(path)) {
        console.log('Bruh crash');
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path, '');
    const faqInfo =[]
    faqs.forEach((faq) => {
        var data = `${faq.Question},${faq.Answer}\n`;
        

        
        fs.appendFileSync(path, data);
    });
}

async function syncFAQDialogflow(
    projectId,
    knowledgeBaseFullName,
    documentPath,
    credentials
) {
    const mimeType = 'text/csv';
    const knowledgeTypes = 'FAQ';
    const documentName = 'FAQDocument';
    await addDocumentToKnowledgeBase(
        projectId,
        knowledgeBaseFullName,
        documentPath,
        documentName,
        knowledgeTypes,
        mimeType,
        credentials
    );
}

module.exports = { syncFAQDialogflow, exportFAQDocument };
