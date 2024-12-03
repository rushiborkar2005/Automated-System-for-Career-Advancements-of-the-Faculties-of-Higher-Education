// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const { google } = require("googleapis");

// const app = express();
// const upload = multer({ dest: "uploads/" }); // Temporary file storage

// // Path to the service account key file
// const KEY_FILE_PATH = "enduring-victor-443509-f4-a557ebf1e0fe.json"; // Replace with your file path

// // Google Drive API client
// const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// const auth = new google.auth.GoogleAuth({
//   keyFile: KEY_FILE_PATH,
//   scopes: SCOPES,
// });

// const drive = google.drive({ version: "v3", auth });

// // Step 1: Upload PDF to Google Drive
// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     const fileMetadata = {
//       name: req.file.originalname, // File name in Google Drive
//     };

//     const media = {
//       mimeType: req.file.mimetype,
//       body: fs.createReadStream(req.file.path),
//     };

//     // Upload the file to Google Drive
//     const response = await drive.files.create({
//       resource: fileMetadata,
//       media: media,
//       fields: "id",
//     });

//     // Clean up the temporary file
//     fs.unlinkSync(req.file.path);
//     console.log(response)
//     res.status(200).send(`File uploaded successfully! File ID: ${response.data.id}`);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).send("Failed to upload file.");
//   }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




// const fs = require('fs');
// const { google }= require('googleapis');

// const apikeys = require('./apikeys.json');
// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// // A Function that can provide access to google drive api
// async function authorize(){
//     const jwtClient = new google.auth.JWT(
//         apikeys.client_email,
//         null,
//         apikeys.private_key,
//         SCOPE
//     );

//     await jwtClient.authorize();

//     return jwtClient;
// }

// // A Function that will upload the desired file to google drive folder
// async function uploadFile(authClient){
//     return new Promise((resolve,rejected)=>{
//         const drive = google.drive({version:'v3',auth:authClient}); 

//         var fileMetaData = {
//             name:'mydrivetext.txt',    
//             parents:['1pfX1znpJSdbgFjoZnZGT8xbh3MCgWDlm'] // A folder ID to which file will get uploaded
//         }

//         drive.files.create({
//             resource:fileMetaData,
//             media:{
//                 body: fs.createReadStream('mydrivetext.txt'), // files that will get uploaded
//                 mimeType:'text/plain'
//             },
//             fields:'id'
//         },function(error,file){
//             if(error){
//                 return rejected(error)
//             }
//             resolve(file);
//         })
//     });
// }

// authorize().then(uploadFile).catch("error",console.error()); // function call




// const fs = require('fs');
// const { google } = require('googleapis');
// const express = require('express');
// const multer = require('multer');

// const apikeys = require('./apikeys.json');
// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// const app = express();
// const upload = multer({ dest: 'uploads/' }); // Temporary folder for storing files

// // Function to authorize Google Drive API
// async function authorize() {
//     const jwtClient = new google.auth.JWT(
//         apikeys.client_email,
//         null,
//         apikeys.private_key,
//         SCOPE
//     );

//     await jwtClient.authorize();
//     return jwtClient;
// }

// // Function to upload a file to Google Drive
// async function uploadFile(authClient, filePath, fileName) {
//     return new Promise((resolve, reject) => {
//         const drive = google.drive({ version: 'v3', auth: authClient });

//         const fileMetaData = {
//             name: fileName, // Use the uploaded file's name
//             parents: ['1pfX1znpJSdbgFjoZnZGT8xbh3MCgWDlm'], // Your folder ID
//         };

//         const media = {
//             mimeType: 'application/pdf', // Specify PDF MIME type
//             body: fs.createReadStream(filePath),
//         };

//         drive.files.create(
//             {
//                 resource: fileMetaData,
//                 media: media,
//                 fields: 'id',
//             },
//             (error, file) => {
//                 if (error) {
//                     return reject(error);
//                 }
//                 resolve(file.data);
//             }
//         );
//     });
// }

// // Endpoint to handle file upload
// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         const authClient = await authorize();
//         const uploadedFile = req.file;

//         if (!uploadedFile) {
//             return res.status(400).send('No file uploaded.');
//         }

//         // Upload file to Google Drive
//         const driveFile = await uploadFile(
//             authClient,
//             uploadedFile.path,
//             uploadedFile.originalname
//         );

//         // Cleanup: remove the uploaded file from the server
//         fs.unlinkSync(uploadedFile.path);

//         res.status(200).send({
//             message: 'File uploaded successfully',
//             fileId: driveFile.id,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error uploading file.');
//     }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const fs = require('fs');
const { google } = require('googleapis');
const apikeys = require('./apikeys.json');

const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
}

async function uploadFileToDrive(filePath, fileName) {
    const authClient = await authorize();

    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });

        const fileMetaData = {
            name: fileName, // Use the uploaded file's name
            parents: ['1pfX1znpJSdbgFjoZnZGT8xbh3MCgWDlm'], // Your folder ID
        };

        const media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(filePath),
        };

        drive.files.create(
            {
                resource: fileMetaData,
                media: media,
                fields: 'id',
            },
            (error, file) => {
                if (error) {
                    return reject(error);
                }
                resolve(file.data.id); // Return only the file ID
            }
        );
    });
}

module.exports = { uploadFileToDrive };
