var pdf = require("pdf-creator-node");
var fs = require("fs");
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://SIH2K24:SIH2K24@cluster0.sp2zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const Faculty = require('./Backend/Models/addfaculty')
async function g() {
   const facultyId='FAC123456';
    const FacultyModel = Faculty(mongoose.connection.useDb('Bajaj_Institute_of_Technology'));
const data = await FacultyModel.findOne({facultyId});
if (!data) {
    console.log('Faculty not found');
    return;
}
return data;
}


// Read HTML Template
var html = fs.readFileSync("template.html", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};


var document = {
    html: html,
    data: {
      users: g(),
    },
    path: "./output.pdf",
    type: "",
  };


  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });