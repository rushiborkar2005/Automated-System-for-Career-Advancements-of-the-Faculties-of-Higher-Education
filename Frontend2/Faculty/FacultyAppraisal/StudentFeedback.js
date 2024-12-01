let entries = [];

// DOM Elements
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');
const studentFeedback = document.getElementById('studentFeedback');

// Initialize table
function renderTable() {
  entriesTableBody.innerHTML = entries
    .map((entry, index) => {
      // Calculate points for each subject based on actual and scheduled classes
      const percentage =entry.studentFeedback;

      let points = 0;

      if (percentage >= 96) points = 10;
    else if (percentage >= 90) points = 9;
    else if (percentage >= 80) points = 8;
    else if (percentage >= 70) points = 7;
    else if (percentage >= 60) points = 6;
    else if (percentage >= 50) points = 5;
    else if (percentage >= 40) points = 4;
    else if (percentage >= 30) points = 3;
    else if (percentage >= 20) points = 2;
    else if (percentage >= 10) points = 1;
    else if (percentage >= 0) points = 0;


      return `
        <tr>
            <td>${index + 1}</td>
            <td>${entry.semester}</td>
            <td>${entry.subjectCode}</td>
            <td>${entry.subjectName}</td>
            <td>${entry.studentFeedback}</td>
            <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
            <td>${points}</td>
            <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
        </tr>
      `;
    })
    .join('');

  // Calculate final score
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
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const newEntry = {
    id: entries.length + 1,
    semester: formData.get('semester'),
    subjectCode: formData.get('subjectCode'),
    subjectName: formData.get('subjectName'),
    studentFeedback: parseInt(formData.get('studentFeedback')) || 0, // Default to 0 if not provided
  };

  entries.push(newEntry);
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
  


    const percentage =entry.studentFeedback;

    let points = 0;

    if (percentage >= 96) points = 10;
    else if (percentage >= 90) points = 9;
    else if (percentage >= 80) points = 8;
    else if (percentage >= 70) points = 7;
    else if (percentage >= 60) points = 6;
    else if (percentage >= 50) points = 5;
    else if (percentage >= 40) points = 4;
    else if (percentage >= 30) points = 3;
    else if (percentage >= 20) points = 2;
    else if (percentage >= 10) points = 1;
    else if (percentage >= 0) points = 0;

    totalPoints += points;
  });

  const finalScore = entries.length > 0 ? (totalPoints / (entries.length * 10)) * 20 : 0;
  scoreObtained.value = finalScore.toFixed(2);
}

// Initialize the table on page load
renderTable();
