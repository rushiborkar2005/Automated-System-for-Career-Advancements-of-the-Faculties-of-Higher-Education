let entries = [];

// DOM Elements
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');

// Helper function to calculate points
function calculatePoints(scheduledClasses, actualClasses, attainment) {
  const percentage = scheduledClasses > 0 ? (actualClasses / scheduledClasses) * 100 : 0;

  let points1 = 0;

  // Attendance-based points
  if (percentage >= 96) points1 = 5;
  else if (percentage >= 90) points1 = 4;
  else if (percentage >= 80) points1 = 3;
  else if (percentage >= 70) points1 = 2;
  else if (percentage >= 55) points1 = 1;

  let points2;
  // Attainment-based points
  if (attainment > 2) points2= 5;
  else if (attainment >= 1.5) points2= 4;
  else if (attainment >= 1) points2= 3;
  else if (attainment >= 0.5) points2= 2;

  let points=points1+points2;
  // Penalty for exceeding 105% of scheduled classes
  if (actualClasses > 1.05 * scheduledClasses) {
    points = Math.max(points - 1, 0); // Ensure points don't go below 0
  }

  return points;
}

// Render the table
function renderTable() {
  entriesTableBody.innerHTML = entries
    .map((entry, index) => {
      const points = calculatePoints(entry.scheduledClasses, entry.actualClasses, entry.attainment);

      return `
        <tr>
            <td>${index + 1}</td>
            <td>${entry.semester}</td>
            <td>${entry.subjectCode}</td>
            <td>${entry.subjectName}</td>
            <td>${entry.scheduledClasses}</td>
            <td>${entry.actualClasses}</td>
            <td>${entry.attainment}</td>
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
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const newEntry = {
    id: entries.length + 1,
    semester: formData.get('semester'),
    subjectCode: formData.get('subjectCode'),
    subjectName: formData.get('subjectName'),
    scheduledClasses: parseInt(formData.get('scheduledClasses')) || 0,
    actualClasses: parseInt(formData.get('actualClasses')) || 0,
    attainment: parseFloat(formData.get('attainment')), // Default to 0 if not provided
  };

  entries.push(newEntry);
  renderTable();
  closeModal();
}

// Reset form
function resetForm() {
  facultyForm.reset();
}

// Remove entry
function removeEntry(id) {
  if (confirm('Are you sure you want to remove this entry?')) {
    entries = entries.filter((entry) => entry.id !== id);
    renderTable();
  }
}

// View document (placeholder functionality)
function viewDocument(id) {
  alert('Document viewer will be implemented here');
}

// Calculate final score
function calculateFinalScore() {
  let totalPoints = 0;

  entries.forEach((entry) => {
    totalPoints += calculatePoints(entry.scheduledClasses, entry.actualClasses, entry.attainment);
  });

  const maxPointsPerEntry = 10; 
  const finalScore = entries.length > 0 ? (totalPoints / (entries.length * maxPointsPerEntry)) * 20 : 0;

  scoreObtained.value = finalScore.toFixed(2);
}

// Initialize the table on page load
renderTable();
