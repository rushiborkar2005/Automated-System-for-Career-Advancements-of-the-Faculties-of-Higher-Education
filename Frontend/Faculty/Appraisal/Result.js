const t=4;

document.addEventListener('DOMContentLoaded', () => {
  // Fetch data when the page loads
  fetchData();
});



async function fetchData() {
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
      <td>${entry.studentsRegistered || 'N/A'}</td>
      <td>${entry.studentsPassed || 'N/A'}</td>
      <td>${entry.creditPoint || 'N/A'}</td>
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
const modal = document.getElementById("modal");
const facultyForm = document.getElementById("facultyForm");
const entriesTableBody = document.getElementById("entriesTableBody");
const scoreObtained = document.getElementById("scoreObtained");
const token = localStorage.getItem('authToken'); 
// Initialize table
// function renderTable() {
//   entriesTableBody.innerHTML = entries
//     .map((entry, index) => {
//       const result =
//         entry.noRegisteredStudents > 0
//           ? (entry.noPassedStudents / entry.noRegisteredStudents) * 100
//           : 0;

//       let points = 0;
//       if (result >= 96) points = 10;
//       else if (result >= 90) points = 9;
//       else if (result >= 80) points = 8;
//       else if (result >= 70) points = 7;
//       else if (result >= 60) points = 6;
//       else if (result >= 50) points = 5;
//       else if (result >= 40) points = 4;

//       return `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${entry.semester}</td>
//           <td>${entry.subjectCode}</td>
//           <td>${entry.subjectName}</td>
//           <td>${entry.noRegisteredStudents}</td>
//           <td>${entry.noPassedStudents}</td>
//           <td>${result.toFixed(2)}</td>
//           <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
//           <td>${points}</td>
//           <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
//         </tr>
//       `;
//     })
//     .join("");

//   // Calculate final score
//   calculateFinalScore();
// }

// Modal functions
function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  resetForm();
}

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Form handling
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('t', '4');
  const formDataObj = {};
  
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      try {
        const response = await fetch('http://localhost:5000/api/add-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(formDataObj),
        });
    
        // Check if the response is successful
        if (!response.ok) {
          const errorBody = await response.json(); // Parse error details from the response
          console.error("Error details:", errorBody);
    
          // Create a meaningful error message
          const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
    
        const data = await response.json();
        console.log("Response received:", data);
        alert('Details added successfully!');
    
      } catch (error) {
        // Log and display the error
        console.error('Error during fetch:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    
  // const newEntry = {
  //   id: entries.length + 1,
  //   semester: formData.get("semester"),
  //   subjectCode: formData.get("subjectCode"),
  //   subjectName: formData.get("subjectName"),
  //   noRegisteredStudents: parseInt(formData.get("noRegisteredStudents")) || 0,
  //   noPassedStudents: parseInt(formData.get("noPassedStudents")) || 0,
  // };

  // entries.push(newEntry);
  // renderTable();
  closeModal();
}

function resetForm() {
  facultyForm.reset();
}

function removeEntry(id) {
  if (confirm("Are you sure you want to remove this entry?")) {
    entries = entries.filter((entry) => entry.id !== id);
    renderTable();
  }
}

// function viewDocument(id) {
//   alert("Document viewer will be implemented here");
// }

// // Calculate final score
// function calculateFinalScore() {
//   let totalPoints = 0;

//   entries.forEach((entry) => {
//     const result =
//       entry.noRegisteredStudents > 0
//         ? (entry.noPassedStudents / entry.noRegisteredStudents) * 100
//         : 0;

//     let points = 0;
//     if (result >= 96) points = 10;
//     else if (result >= 90) points = 9;
//     else if (result >= 80) points = 8;
//     else if (result >= 70) points = 7;
//     else if (result >= 60) points = 6;
//     else if (result >= 50) points = 5;
//     else if (result >= 40) points = 4;

//     totalPoints += points;
//   });

//   const finalScore =
//     entries.length > 0 ? (totalPoints / (entries.length * 10)) * 10 : 0;
//   scoreObtained.value = finalScore.toFixed(2);
// }

// // Initialize the table on page load
// renderTable();
