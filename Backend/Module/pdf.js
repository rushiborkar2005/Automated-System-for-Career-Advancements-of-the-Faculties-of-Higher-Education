const PDFDocument = require('pdfkit');
const fs = require('fs');


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://SIH2K24:SIH2K24@cluster0.sp2zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const Faculty = require('../Models/addfaculty')

const FacultyModel = Faculty(mongoose.connection.useDb('Bajaj_Institute_of_Technology'));
    // Find the faculty by ID
    // const faculty = await FacultyModel.findOne({ _id: '674ead4dba24a943057140a0'});


// Generate PDF Function
async function generateFacultyPDF(facultyId) {
    try {
        const faculty = await FacultyModel.findOne({facultyId });

        if (!faculty) {
            console.log('Faculty not found');
            return;
        }

        const doc = new PDFDocument({ margin: 50 });
        const fileName = `Faculty_${facultyId}.pdf`;
        const stream = fs.createWriteStream(fileName);

        // Stream to File
        doc.pipe(stream);

        // Title
        doc.fontSize(20).text(`Faculty Self-Appraisal Report`, { align: 'center', underline: true });
        doc.moveDown(1);

        // Personal Information
        doc.fontSize(14).text(`Personal Information`, { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12)
            .text(`Name: ${faculty.title} ${faculty.firstName} ${faculty.middleName || ''} ${faculty.lastName}`)
            .text(`Faculty ID: ${faculty.facultyId}`)
            .text(`Department: ${faculty.departmentName}`);
        doc.moveDown();

        // Teaching Process
        if (faculty.teachingProcess.length > 0) {
            doc.fontSize(14).text(`Teaching Process`, { underline: true });
            doc.moveDown(0.5);

            faculty.teachingProcess.forEach((process, index) => {
                doc.fontSize(12)
                    .text(`${index + 1}. Semester: ${process.semester}`)
                    .text(`   Subject Code: ${process.subjectCode}`)
                    .text(`   Subject Name: ${process.subjectName}`)
                    .text(`   Scheduled Classes: ${process.scheduledClasses}`)
                    .text(`   Actual Classes: ${process.actualClasses}`)
                    .text(`   Score: ${process.score}`)
                    .moveDown();
            });
        }

        // Section B
        if (faculty.sectionB.length > 0) {
            doc.fontSize(14).text(`Section B`, { underline: true });
            doc.moveDown(0.5);

            faculty.sectionB.forEach((section, index) => {
                doc.fontSize(12)
                    .text(`${index + 1}. Observations: ${section.observations}`)
                    .text(`   Recommendations: ${section.recommendations}`)
                    .moveDown();
            });
        }

        // Section C
        if (faculty.sectionC.length > 0) {
            doc.fontSize(14).text(`Section C`, { underline: true });
            doc.moveDown(0.5);

            faculty.sectionC.forEach((section, index) => {
                doc.fontSize(12)
                    .text(`${index + 1}. Recommendation: ${section.recommendation}`)
                    .text(`   Signature: ${section.signature}`)
                    .moveDown();
            });
        }

        // Footer
        doc.addPage();
        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'right' });

        // Finalize the document
        doc.end();

        stream.on('finish', () => {
            console.log(`PDF generated: ${fileName}`);
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

generateFacultyPDF('445');
