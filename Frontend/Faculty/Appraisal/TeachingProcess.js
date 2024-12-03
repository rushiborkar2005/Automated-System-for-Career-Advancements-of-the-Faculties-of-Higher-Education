const t=0;
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');
const token = localStorage.getItem('authToken'); 
document.addEventListener('DOMContentLoaded', () => {
  // Fetch data when the page loads
  console.log('doing');
  fetchData();
});



async function fetchData(t) {
  try {
    // Replace with your actual backend API endpoint
    const response = await fetch('http://localhost:5000/api/get-details', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        'type': t,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    populateTable(data.key); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
function populateTable(data) {
  const tableBody = document.getElementById('entriesTableBody');
  tableBody.innerHTML = '';

  data.forEach((entry, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.semester || 'N/A'}</td>
      <td>${entry.subjectCode || 'N/A'}</td>
      <td>${entry.subjectName || 'N/A'}</td>
      <td>${entry.scheduledClasses || 'N/A'}</td>
      <td>${entry.actualClasses || 'N/A'}</td>
      <td>${entry.attainment || 'N/A'}</td>
      <td>${entry.document || 'N/A'}</td>
      <td class="score">${entry.score || 0}</td>
      <td>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// DOM Elements

// Helper function to calculate points
// function calculatePoints(scheduledClasses, actualClasses, attainment) {
//   const percentage = scheduledClasses > 0 ? (actualClasses / scheduledClasses) * 100 : 0;

//   let points1 = 0;

//   // Attendance-based points
//   if (percentage >= 96) points1 = 5;
//   else if (percentage >= 90) points1 = 4;
//   else if (percentage >= 80) points1 = 3;
//   else if (percentage >= 70) points1 = 2;
//   else if (percentage >= 55) points1 = 1;

//   let points2;
//   // Attainment-based points
//   if (attainment > 2) points2= 5;
//   else if (attainment >= 1.5) points2= 4;
//   else if (attainment >= 1) points2= 3;
//   else if (attainment >= 0.5) points2= 2;

//   let points=points1+points2;
//   // Penalty for exceeding 105% of scheduled classes
//   if (actualClasses > 1.05 * scheduledClasses) {
//     points = Math.max(points - 1, 0); // Ensure points don't go below 0
//   }

//   return points;
// }

// // Render the table
// function renderTable() {
//   entriesTableBody.innerHTML = entries
//     .map((entry, index) => {
//       const points = calculatePoints(entry.scheduledClasses, entry.actualClasses, entry.attainment);

//       return `
//         <tr>
//             <td>${index + 1}</td>
//             <td>${entry.semester}</td>
//             <td>${entry.subjectCode}</td>
//             <td>${entry.subjectName}</td>
//             <td>${entry.scheduledClasses}</td>
//             <td>${entry.actualClasses}</td>
//             <td>${entry.attainment}</td>
//             <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
//             <td>${points}</td>
//             <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
//         </tr>
//       `;
//     })
//     .join('');

//   // Calculate final score
//   calculateFinalScore();
// }

// Open modal
function openModal() {
  modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
  modal.classList.add('hidden');
  resetForm();
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Form handling
// function handleSubmit(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);

//   const newEntry = {
//     id: entries.length + 1,
//     semester: formData.get('semester'),
//     subjectCode: formData.get('subjectCode'),
//     subjectName: formData.get('subjectName'),
//     scheduledClasses: parseInt(formData.get('scheduledClasses')) || 0,
//     actualClasses: parseInt(formData.get('actualClasses')) || 0,
//     attainment: parseFloat(formData.get('attainment')), // Default to 0 if not provided
//   };

//   entries.push(newEntry);
//   renderTable();
//   closeModal();
// }

// // Reset form
// function resetForm() {
//   facultyForm.reset();
// }

// // Remove entry
// function removeEntry(id) {
//   if (confirm('Are you sure you want to remove this entry?')) {
//     entries = entries.filter((entry) => entry.id !== id);
//     renderTable();
//   }
// }

// // View document (placeholder functionality)
// function viewDocument(id) {
//   alert('Document viewer will be implemented here');
// }

// // Calculate final score
// function calculateFinalScore() {
//   let totalPoints = 0;

//   entries.forEach((entry) => {
//     totalPoints += calculatePoints(entry.scheduledClasses, entry.actualClasses, entry.attainment);
//   });

//   const maxPointsPerEntry = 10; 
//   const finalScore = entries.length > 0 ? (totalPoints / (entries.length * maxPointsPerEntry)) * 20 : 0;

//   scoreObtained.value = finalScore.toFixed(2);
// }

// // Initialize the table on page load
// renderTable();



// async function handleSubmit(event) {
//   event.preventDefault(); // Prevent default form submission behavior

//   // Create a FormData object from the form
//   const form = event.target;
//   const formData = new FormData(form);
  

//   // Calculate pointsEarned based on actualClasses vs scheduledClasses
//   const scheduledClasses = parseInt(formData.get('scheduledClasses'));
//   const actualClasses = parseInt(formData.get('actualClasses'));
//   const percentage = (actualClasses / scheduledClasses) * 100;
//   let pointsEarned = 0;

//   if (percentage >= 96) pointsEarned = 10;
//   else if (percentage >= 90) pointsEarned = 9;
//   else if (percentage >= 80) pointsEarned = 8;
//   else if (percentage >= 70) pointsEarned = 7;
//   else if (percentage >= 55) pointsEarned = 5;

//   // Convert FormData to a JSON object
//   const data = {
//     id: entries.length + 1, // Generate unique ID
//     semester: formData.get('semester'),
//     subjectCode: formData.get('subjectCode'),
//     subjectName: formData.get('subjectName'),
//     scheduledClasses: scheduledClasses,
//     actualClasses: actualClasses,
//     pointsEarned: pointsEarned,
//     attainment: formData.get('attainment'), // Add attainment field
//   };

//   try {
//     // Send data to the server
//     const response = await fetch('http://localhost:3000/api/:facultyId', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       const result = await response.json();
//       alert('Entry added successfully!');
//       entries.push(data); // Add to local entries array
//       renderTable(); // Re-render table
//       closeModal(); // Close the modal
//       form.reset(); // Reset the form
//     } else {
//       const error = await response.json();
//       alert(`Failed to add entry: ${error.message}`);
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     alert('An error occurred while submitting the form.');
//   }
// }
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);


  const scheduledClasses = parseInt(formData.get('scheduledClasses'));
  const actualClasses = parseInt(formData.get('actualClasses'));
  const percentage = (actualClasses / scheduledClasses) * 100;
  let score = 0;

  if (percentage >= 96) score = 10;
  else if (percentage >= 90) score = 9;
  else if (percentage >= 80) score = 8;
  else if (percentage >= 70) score = 7;
  else if (percentage >= 55) score = 5;

  const formDataObj = {};
  formData.append('t', 0);
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      const per=formDataObj.studentFeedback;

      formDataObj['score']=score;
      try {
        const response = await fetch('http://localhost:5000/api/add-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(formDataObj),
        });
        
        if (!response.ok) {
          const errorBody = await response.json(); 
          console.error("Error details:", errorBody);
          
          const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("Response received:", data);
        alert('Details added successfully!');
      } catch (error) {
        
        console.error('Error during fetch:', error.message);
        alert(`An error occurred: ${error.message}`);
      }

    }