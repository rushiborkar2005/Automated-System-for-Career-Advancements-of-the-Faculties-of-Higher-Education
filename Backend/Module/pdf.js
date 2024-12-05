


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
    
        
            // Header Section
            doc
              
              .fontSize(12)
              .text('Government of National Capital Territory of Delhi', 100, 30, { align: 'center' })
              .fontSize(10)
              .text('राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार', 100, 45, { align: 'center' })
              .fontSize(14)
              .text(data.instituteName, { align: 'center', underline: true });
          
            doc.moveDown(2);
          
            // Profile Section
            doc
              .fontSize(12)
              .text('Profile', { underline: true, align: 'left' })
              .moveDown(0.5);
          
            const profileFields = [
              { label: 'Title', value: data.title },
              { label: 'Name', value: data.name },
              { label: 'Department', value: data.department },
              { label: 'Designation', value: data.designation },
              { label: 'Faculty ID', value: data.facultyId },
            ];
          
            profileFields.forEach((field, idx) => {
              doc.text(`${field.label}: ${field.value}`, {
                width: 250,
                continued: idx % 2 === 0,
              });
              if (idx % 2 !== 0) doc.text(''); // Break for the next row
            });
          
            doc.moveDown(1.5);
          
            // Add Tables
            createTable(doc, 'A. Teaching Process', data.teachingProcess, [
              'Sr No',                    // Added for row indexing
              'Semester',                 // Maps to 'semester' in schema
              'Subject Code',             // Maps to 'subjectCode' in schema
              'Subject Name',             // Maps to 'subjectName' in schema
              'No. of Scheduled Classes', // Maps to 'scheduledClasses' in schema
              'No. of Actually Held Classes', // Maps to 'actualClasses' in schema
              'Supporting Document',      // Maps to 'document' in schema
              'Score',                    // Maps to 'score' in schema
            ], {
              'Sr No': '_id',                    // Generated manually for indexing
              'Semester': 'semester',
              'Subject Code': 'subjectCode',
              'Subject Name': 'subjectName',
              'No. of Scheduled Classes': 'scheduledClasses',
              'No. of Actually Held Classes': 'actualClasses',
              'Supporting Document': 'document',
              'Score': 'score',
            });
          
            // createTable(doc, "B. Student's Feedback", data.studentFeedback, [
            //   'Sr No', 'Semester', 'Subject Code', 'Subject Name',
            //   'Average Feedback %', 'Supporting Document', 'Score',
            // ]);
          
            // createTable(doc, 'F. Contribution', data.contribution, [
            //   'Sr No', 'Semester', 'Activity', 'Supporting Document', 'Score',
            // ]);
          
            // createTable(doc, 'I. Performance Summary', data.performanceSummary, [
            //   'Sr No', 'Parameter', 'Total Score', 'Obtained Score',
            // ]);
          
            // Footer
            doc.moveDown(2);
            doc.text('Generated on: ' + new Date().toLocaleDateString(), { align: 'right' });
          
            doc.end();
          
          
      
        
          
        
         


    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }

}
function createTable(doc, title, rows, headers) {
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
