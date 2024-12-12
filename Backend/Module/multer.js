// const { google } = require('google-auth-library');
// const { googleapis } = require('googleapis');
// const fs = require('fs');
// const path = require('path');

// // Path to the service account key file
// const serviceAccountKeyPath = path.resolve(__dirname, 'service-account-key.json');

// // Initialize the Google client
// const client = new google.auth.GoogleAuth({
//     keyFile: serviceAccountKeyPath,
//     scopes: ['https://www.googleapis.com/auth/drive.file'],
// });

// async function uploadFile(filePath) {
//     const drive = googleapis.drive({
//         auth: client,
//     });

//     const file = {
//         name: 'uploaded-file.pdf',
//         mimeType: 'application/pdf',
//     };

//     const data = fs.readFileSync(filePath);
//     const media = {
//         mimeType: file.mimeType,
//         body: data,
//     };

//     try {
//         const result = await drive.files.create({
//             requestBody: file,
//             media: media,
//         });
//         console.log('File uploaded successfully:', result.data);
//     } catch (error) {
//         console.error('Error uploading file:', error.message);
//     }
// }

// // Example usage
// const filePath = path.resolve(__dirname, 'path/to/your/file.pdf');
// uploadFile(filePath);
