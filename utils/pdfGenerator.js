const PDFDocument = require('pdfkit');

/**
 * Generate PDF for contact submission
 * @param {Object} submission - Contact submission data
 * @returns {Buffer} - PDF buffer
 */
const generatePDF = (submission) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add header
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text('Taskletix - Contact Submission', { align: 'center' })
         .moveDown();

      // Add submission details
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Submission Details')
         .moveDown(0.5);

      doc.fontSize(12)
         .font('Helvetica');

      // Personal Information
      doc.font('Helvetica-Bold').text('Personal Information:');
      doc.font('Helvetica')
         .text(`Name: ${submission.name}`)
         .text(`Email: ${submission.email}`)
         .text(`Phone: ${submission.phone || 'N/A'}`)
         .text(`Country Code: ${submission.country_code || 'N/A'}`)
         .moveDown(0.5);

      // Company Information
      if (submission.company) {
        doc.font('Helvetica-Bold').text('Company Information:');
        doc.font('Helvetica')
           .text(`Company: ${submission.company}`)
           .moveDown(0.5);
      }

      // Project Information
      doc.font('Helvetica-Bold').text('Project Information:');
      doc.font('Helvetica')
         .text(`Project Type: ${submission.project_type || 'N/A'}`)
         .text(`Budget Range: ${submission.budget_range || 'N/A'}`)
         .text(`Timeline: ${submission.timeline || 'N/A'}`)
         .moveDown(0.5);

      // Project Details
      if (submission.project_details) {
        doc.font('Helvetica-Bold').text('Project Details:');
        doc.font('Helvetica')
           .text(submission.project_details, { width: 450 })
           .moveDown(0.5);
      }

      // Footer
      doc.fontSize(10)
         .font('Helvetica')
         .text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generatePDF };
