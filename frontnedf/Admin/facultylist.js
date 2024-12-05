

// Fetch data and populate table
document.addEventListener('DOMContentLoaded', () => {
  const facultyTableBody = document.getElementById('facultyTableBody');

  

  async function fetchFacultyData() {
    try {
      const response = await fetch('http://localhost:5000/api/get-all-faculty');
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      console.log(data);
      populateTable(data);
    } catch (error) {
      console.error('Failed to fetch faculty data:', error);
    }
  }

  function populateTable(facultyData) {
    facultyTableBody.innerHTML = ''; // Clear previous content

    if (facultyData.length === 0) {
      facultyTableBody.innerHTML = '<tr><td colspan="8">No data available</td></tr>';
      return;
    }

    facultyData.forEach((faculty, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${faculty.firstName}</td>
        <td>${faculty.facultyId}</td>
        <td> <button class="view-btn" data-id="${faculty.facultyId}">View</button></td>
        <td>${faculty.score}</td>
        <td>${new Date(faculty.createdAt).toLocaleDateString()}</td>
        <td>${faculty.status ? 'Endorsed' : 'Not Endorsed'}</td>
        <td>
          <a href="${faculty.downloadUrl}" target="_blank" class="download-link">⬇️</a>
        </td>
      `;

      facultyTableBody.appendChild(row);
    });
  }


  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation(); // Prevent any other event interference
      const facultyId = button.getAttribute('data-id');
      // Redirect to the faculty view page
      window.location.href = `/faculty/view/${facultyId}`;
    });
  });

  // Fetch data when the page loads
  fetchFacultyData();
});
