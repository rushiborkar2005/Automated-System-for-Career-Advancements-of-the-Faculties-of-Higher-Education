const pdf = require("pdf-creator-node");
const fs = require("fs");
const mongoose = require('mongoose');
const Faculty = require('./Backend/Models/addfaculty');


// MongoDB connection
mongoose.connect('mongodb+srv://SIH2K24:SIH2K24@cluster0.sp2zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB server'));
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.on('disconnected', () => console.log('MongoDB disconnected'));


const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const hbs = allowInsecurePrototypeAccess(Handlebars);

// Compile and use the Handlebars template

// Fetch faculty data
async function getFacultyData(facultyId) {
    try {
        const FacultyModel = Faculty(mongoose.connection.useDb('Bajaj_Institute_of_Technology'));
        const data = await FacultyModel.findOne({ facultyId });
        if (!data) throw new Error('Faculty not found');
        return data;
    } catch (error) {
        console.error('Error fetching faculty data:', error.message);
        throw error;
    }
}

// Generate PDF
async function generatePDF() {
    try {
        const facultyId = 'FAC123456';
        const facultyData = await getFacultyData(facultyId);

        // Read and compile HTML template
        const html = fs.readFileSync("template.html", "utf8");
        const template = hbs.compile(html);
        const output = template(facultyData);

        // PDF options
        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
            },
            footer: {
                height: "28mm",
                contents: {
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                },
            },
        };

        // PDF document structure
        const document = {
            html: output,
            data: facultyData,
            path: "./output.pdf",
            type: "",
        };

        // Create PDF
        const result = await pdf.create(document, options);
        console.log('PDF generated successfully:', result);
    } catch (error) {
        console.error('Error generating PDF:', error.message);
    }
}

// Run the script
generatePDF();
