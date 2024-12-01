let entries = [];

// DOM Elements
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');

// Initialize table
function renderTable() {
  entriesTableBody.innerHTML = entries
    .map((entry, index) => {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${entry.semester}</td>
          <td>${entry.activity}</td>
          <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
          <td>5</td> <!-- Fixed 5 points for each entry -->
          <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
        </tr>
      `;
    })
    .join('');

  // Calculate the final score based on the number of entries
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
    activity: formData.get('activity'),
    supportingDocument: formData.get('supportingDocument'),
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

// Calculate final score with a maximum of 20 points
function calculateFinalScore() {
  const totalMarks = Math.min(entries.length * 5, 10); // Cap total score at 20
  scoreObtained.value = totalMarks.toFixed(2); // Display the calculated score
}

// Initialize the table on page load
renderTable();

