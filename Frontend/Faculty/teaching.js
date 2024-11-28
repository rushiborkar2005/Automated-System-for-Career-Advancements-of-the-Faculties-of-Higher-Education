let entries = [];

// DOM Elements
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');
const token = localStorage.getItem('authToken'); 

// Initialize table
function renderTable() {
  entriesTableBody.innerHTML = entries
    .map(
      (entry, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${entry.semester}</td>
            <td>${entry.subjectCode}</td>
            <td>${entry.subjectName}</td>
            <td>${entry.scheduledClasses}</td>
            <td>${entry.actualClasses}</td>
            <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
            <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
        </tr>
    `
    )
    .join('');
  calculateFinalScore();
}

// Modal functions
function openModal() {
  modal.classList.remove('hidden');
}

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
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('t', '0');
  const newEntry = {
    id: entries.length + 1,
    semester: formData.get('semester'),
    subjectCode: formData.get('subjectCode'),
    subjectName: formData.get('subjectName'),
    scheduledClasses: parseInt(formData.get('scheduledClasses')),
    actualClasses: parseInt(formData.get('actualClasses')),
  };

  entries.push(newEntry);

const response=  await fetch('http://localhost:5000/api/add-details', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': token,},
  body: JSON.stringify(formData),
});




  renderTable();
  closeModal();
}

function resetForm() {
  facultyForm.reset();
}

function removeEntry(id) {
  if (confirm('Are you sure you want to remove this entry?')) {
    entries = entries.filter((entry) => entry.id !== id);
    renderTable();
  }
}

function viewDocument(id) {
  alert('Document viewer will be implemented here');
}

// Calculate final score
function calculateFinalScore() {
  let totalPoints = 0;

  entries.forEach((entry) => {
    const percentage = (entry.actualClasses / entry.scheduledClasses) * 100;
    let points = 0;

    if (percentage >= 96) points = 10;
    else if (percentage >= 90) points = 9;
    else if (percentage >= 80) points = 8;
    else if (percentage >= 70) points = 7;
    else if (percentage >= 55) points = 5;

    totalPoints += points;
  });

  const finalScore = (totalPoints / (entries.length * 10)) * 20 || 0;
  scoreObtained.value = finalScore.toFixed(2);
}

// Initialize the table on page load
renderTable();






// Select the "Save as Draft" button
const draftBtn = document.querySelector('.draft-btn');

// Attach event listener to the button
draftBtn.addEventListener('click', function () {
  // Select the form
  const form = document.getElementById('facultyForm');

  // Collect form data into an object
  const draftData = {
    subjectName: form.subjectName.value,
    subjectCode: form.subjectCode.value,
    semester: form.semester.value,
    scheduledClasses: form.scheduledClasses.value,
    actualClasses: form.actualClasses.value,
  };

  // Save the draft data to local storage
  localStorage.setItem('facultyFormDraft', JSON.stringify(draftData));

  // Notify the user
  alert('Draft saved successfully!');
});


// async function handleSubmit(event) {
//     event.preventDefault(); // Prevent default form submission behavior

//     // Create a FormData object from the form
//     const form = event.target;
//     const formData = new FormData(form);

//     // Convert FormData to a JSON object
//     const data = Object.fromEntries(formData.entries());

//     try {
//         // Send data to the server
//         const response = await fetch('/api/submitentry', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         if (response.ok) {
//             const result = await response.json();
//             alert('Entry added successfully!');
//             closeModal(); // Close the modal
//             form.reset(); // Reset the form
//         } else {
//             const error = await response.json();
//             alert(`Failed to add entry: ${error.message}`);
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         alert('An error occurred while submitting the form.');
//     }
// }
