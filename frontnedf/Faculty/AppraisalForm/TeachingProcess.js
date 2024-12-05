const t=0;
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});





async function fetchData() {
  try {
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
    console.log(data.key);
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
    console.log(entry._id);
    row.setAttribute('data-id', entry._id);
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
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');
const token = localStorage.getItem('authToken'); 
function openModal() {
  modal.classList.remove('hidden');
}
function closeModal() {
  modal.classList.add('hidden');
  resetForm();
}
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const scheduledClasses = parseInt(formData.get('scheduledClasses'));
  const actualClasses = parseInt(formData.get('actualClasses'));
  const percentage = (actualClasses / scheduledClasses) * 100;
  let score = 0;
if (percentage >= 96) points1 = 5;
  else if (percentage >= 90) points1 = 4;
  else if (percentage >= 80) points1 = 3;
  else if (percentage >= 70) points1 = 2;
  else if (percentage >= 55) points1 = 1;
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



    async function deleteEntry(index) {
      const tableBody = document.getElementById('entriesTableBody');
      const row = tableBody.rows[index];
      const entryId = row.getAttribute('data-id'); // Ensure each row has a unique 'data-id' attribute
    
      if (!entryId) {
        alert('Unable to identify the entry to delete.');
        return;
      }
    
      const confirmation = confirm('Are you sure you want to delete this entry?');
      if (!confirmation) return;
    
      try {
        const response = await fetch(`http://localhost:5000/api/delete-details/${entryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
    
        if (!response.ok) {
          const errorBody = await response.json();
          console.error('Error details:', errorBody);
          const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
    
        const data = await response.json();
        console.log('Delete response:', data);
        alert('Entry deleted successfully!');
    
        // Remove the row from the table
        row.remove();
      } catch (error) {
        console.error('Error deleting entry:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    }
    
    function toggleNotifications() {
      const notificationSection = document.getElementById("notification-section");
      if (notificationSection.style.display === "none" || notificationSection.style.display === "") {
          notificationSection.style.display = "block";
      } else {
          notificationSection.style.display = "none";
      }
  }
  
  

  