let entries = [];

// DOM Elements
const modal = document.getElementById("modal");
const facultyForm = document.getElementById("facultyForm");
const entriesTableBody = document.getElementById("entriesTableBody");
const scoreObtained = document.getElementById("scoreObtained");
const token = localStorage.getItem('authToken'); 
// Points mapping for categories
const categoryPoints = {
  SCI: 5,
  "SCI-Extended": 4,
  Scopus: 3,
  "Scopus Indexed": 2,
  WOS: 2,
  "UGC Recognized": 1.5,
  Other: 1,
};

// Render the table
function renderTable() {
  entriesTableBody.innerHTML = entries
    .map((entry, index) => {
      const points = categoryPoints[entry.category] || 0; // Default to 0 if category not found

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${entry.publication}</td>
          <td>${entry.category}</td>
          <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
          <td>${points}</td>
          <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
        </tr>
      `;
    })
    .join("");

  // Calculate final score
  calculateFinalScore();
}

// Open modal
function openModal() {
  modal.classList.remove("hidden");
}

// Close modal
function closeModal() {
  modal.classList.add("hidden");
  resetForm();
}

// Handle category change
function handleCategoryChange() {
  const categorySelect = document.getElementById("categorySelect");
  const customCategoryGroup = document.getElementById("customCategoryGroup");

  if (categorySelect.value === "Other") {
    customCategoryGroup.classList.remove("hidden");
  } else {
    customCategoryGroup.classList.add("hidden");
    document.getElementById("customCategoryInput").value = ""; // Reset custom category input
  }
}

// Form submission
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('t', '0');
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
        return data;
    
      } catch (error) {
        // Log and display the error
        console.error('Error during fetch:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    
  let category = formData.get("category");
  const publication = formData.get("publication");
  const supportingDocument = formData.get("supportingDocument");
  const customCategory = formData.get("customCategory");

  if (category === "Other" && customCategory) {
    category = customCategory; // Use custom category if "Other" is selected
  }

  if (!category || !publication) {
    alert("Please fill out all fields.");
    return;
  }

  const newEntry = {
    id: entries.length + 1,
    publication,
    category,
    supportingDocument,
  };

  entries.push(newEntry);
  renderTable();
  closeModal();
}

// Reset form
function resetForm() {
  facultyForm.reset();
}

// Remove an entry
function removeEntry(id) {
  if (confirm("Are you sure you want to remove this entry?")) {
    entries = entries.filter((entry) => entry.id !== id);
    renderTable();
  }
}

// View document (placeholder)
function viewDocument(id) {
  alert("Document viewer will be implemented here");
}

// Calculate final score
function calculateFinalScore() {
  let totalPoints = 0;

  entries.forEach((entry) => {
    totalPoints += categoryPoints[entry.category] || 0; // Add points for the selected category
  });

  // Cap the score at 10
  const finalScore = Math.min(totalPoints, 10); // Ensure total score does not exceed 10
  scoreObtained.value = finalScore.toFixed(2); // Display with two decimal points
}
