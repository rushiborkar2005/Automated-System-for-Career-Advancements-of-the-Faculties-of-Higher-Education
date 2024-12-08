


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://SIH2K24:SIH2K24@cluster0.sp2zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const Faculty = require('../Models/addfaculty')

const FacultyModel = Faculty(mongoose.connection.useDb('Bajaj_Institute_of_Technology'));
    // Find the faculty by ID
    // const faculty = await FacultyModel.findOne({ _id: '674ead4dba24a943057140a0'});


// Generate PDF Function
async function generateFacultyPDF(facultyId) {
    try {
        
        const PDFDocument = require('pdfkit');
        const fs = require('fs');
        const data = await FacultyModel.findOne({facultyId });

        if (!data) {
            console.log('Faculty not found');
            return;
        }

        const doc = new PDFDocument({ margin: 50 ,
             size: 'A4'
        });
        const fileName = `Faculty_${facultyId}.pdf`;
        const stream = fs.createWriteStream(fileName);

        // Stream to File
        doc.pipe(stream);
    
        doc.pipe(stream);

        // Page 1: Appraisal and Feedback Form
        doc.fontSize(16).text('APPRAISAL AND 360° FEEDBACK FORM', { align: 'center', underline: true });
        doc.moveDown(1);

        // Section A Header
        doc.fontSize(12).text('SECTION A', { align: 'center', underline: true });
        doc.moveDown(1);

        // Profile Information
        doc.fontSize(10).text(Name: ${data.name || 'N/A'} \t\t Academic Year: ${data.academicYear || 'N/A'});
        doc.text(Designation: ${data.designation || 'N/A'} \t\t Department: ${data.department || 'N/A'});
        doc.moveDown(1);

        // Table: Teaching Process
        createTable(doc, 'A. Teaching Process (Max Point 20)', data.teachingProcess, [
            'Sr No', 'Semester', 'Subject Code', 'Subject Name', 'No. of Scheduled Classes',
            'No. of Actually Held Classes', 'Attainment', 'Score',
        ]);

        // Table: Students' Feedback
        createTable(doc, 'B. Students\' Feedback (Max Point 20)', data.studentFeedback, [
            'Sr No', 'Semester', 'Subject Code', 'Subject Name', 'Average Student Feedback Percentage', 'Score',
        ]);

        // Table: Departmental Activities
        createTable(doc, 'C. Departmental Activities (Max Point 20)', data.departmentalActivities, [
            'Sr No', 'Semester', 'Activity', 'Score',
        ]);

        // Table: Institute Activities
        createTable(doc, 'D. Institute Activities (Max Point 10)', data.instituteActivities, [
            'Sr No', 'Semester', 'Activity', 'Score',
        ]);

        // Table: ACR Maintained
        createTable(doc, 'E. ACR Maintained at Institute Level (Max Point 20)', data.acrMaintained, [
            'Sr No', 'Semester', 'Subject Code', 'Subject Name', 'No. of Students Registered',
            'No. of Students Passed', 'Result', 'Score',
        ]);

        // Table: Research Publications
        createTable(doc, 'F. Research Publications (Max Point 10)', data.researchPublications, [
            'Sr No', 'Name of Publication', 'Category', 'Score',
        ]);

        // Table: Contribution to Society
        createTable(doc, 'G. Contribution to Society (Max Point 10)', data.contribution, [
            'Sr No', 'Semester', 'Activity', 'Score',
        ]);

        doc.addPage();

        // Page 2: Performance Summary
        doc.fontSize(14).text('Performance Summary', { align: 'center', underline: true });
        doc.moveDown(1);

        createTable(doc, 'Score Obtained Total on 10 Point Scale', data.performanceSummary, [
            'Sr No', 'Parameters', 'Total Score', 'Obtained Score',
        ]);

        doc.moveDown(2);
        doc.text('Date: ________________', 50, doc.y, { align: 'left' });
        doc.text('Signature of Faculty Member', 400, doc.y, { align: 'right' });

       


            doc.text('Generated on: ' + new Date().toLocaleDateString(), { align: 'right' });
          
            doc.end();
          
          
      
        
          
        
         


    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }

}
function createTable(doc, title, rows, headers) {
  // Title
  doc.fontSize(12).text(title, { underline: true });
  doc.moveDown(0.5);

  const tableStartY = doc.y;
  const tableWidth = 500;
  const columnWidth = tableWidth / headers.length;
  const cellPadding = 5;

  // Header Row
  doc.rect(doc.x, tableStartY, tableWidth, 20).fillAndStroke('#f0f0f0', 'black');
  headers.forEach((header, idx) => {
      doc
          .fontSize(10)
          .fillColor('black')
          .text(header, doc.x + idx * columnWidth + cellPadding, tableStartY + 5, {
              width: columnWidth - cellPadding * 2,
              align: 'center',
          });
  });

  // Rows
  rows.forEach((row, rowIdx) => {
      headers.forEach((header, colIdx) => {
          const cellText = row[header] || '';
          doc.text(cellText, doc.x + colIdx * columnWidth + cellPadding, tableStartY + 25 + rowIdx * 20, {
              width: columnWidth - cellPadding * 2,
              align: 'center',
          });
      });

      doc.moveTo(doc.x, tableStartY + 25 + (rowIdx + 1) * 20).lineTo(doc.x + tableWidth, tableStartY + 25 + (rowIdx + 1) * 20).stroke();
  });

  doc.moveDown(1);
}
function creadteTable(doc, title, rows, headers) {
  // Draw the table title
  doc.moveDown(1).fontSize(12).text(title, { underline: true });

  const tableStartY = doc.y + 10;
  const tableWidth = 500;
  const cellPadding = 5;
  const columnWidth = tableWidth / headers.length;

  // Draw the header row
  doc.rect(doc.x, tableStartY - 5, tableWidth, 25).fillAndStroke('#f0f0f0', 'black');
  headers.forEach((header, idx) => {
    doc
      .fontSize(10)
      .fillColor('black')
      .text(header, doc.x + idx * columnWidth + cellPadding, tableStartY, {
        width: columnWidth - cellPadding * 2,
        align: 'center',
      });
  });

  // Draw a line below the headers
  doc.moveTo(doc.x, tableStartY + 20).lineTo(doc.x + tableWidth, tableStartY + 20).stroke();

  // Iterate over rows and draw each cell
  rows.forEach((row, rowIdx) => {
    headers.forEach((header, colIdx) => {
      // Safely get the cell text or default to an empty string
      const cellText = row[header] !== undefined ? String(row[header]) : '';
      doc
        .fontSize(10)
        .fillColor('black')
        .text(cellText, doc.x + colIdx * columnWidth + cellPadding, tableStartY + 25 + rowIdx * 20, {
          width: columnWidth - cellPadding * 2,
          align: 'center',
        });
    });

    // Draw a horizontal line after each row
    doc.moveTo(doc.x, tableStartY + 25 + (rowIdx + 1) * 20).lineTo(doc.x + tableWidth, tableStartY + 25 + (rowIdx + 1) * 20).stroke();
  });

  // Add some spacing after the table
  doc.moveDown(1);
}

generateFacultyPDF('445');
