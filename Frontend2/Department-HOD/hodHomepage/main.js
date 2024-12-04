// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.getElementById('facultyTableBody');
  const token = localStorage.getItem('authToken'); 

  try {
    console.log('hte')
      // Fetch faculty data from backend
      const response = await fetch(' http://localhost:5000/api/faculty-list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,

        },
      }
      );
      
      const faculties = await response.json();
      console.log('hi' )
      console.log(faculties);
      faculties.forEach((faculty, index) => {
          // Create a table row
          const row = document.createElement('tr');

          // Populate the row with data
          row.innerHTML = `
              <td>${index + 1}</td>
              <td>${faculty.firstName} ${faculty.middleName || ''} ${faculty.lastName}</td>
              <td>${faculty.facultyId}</td>
              <td>viewForms</td>
              <td>${faculty.teachingProcess.reduce((total, item) => total + (item.score || 0), 0)}</td>
              <td>${faculty.updatedAt ? new Date(faculty.updatedAt).toLocaleString() : 'N/A'}</td>
              <td>${faculty.teachingProcess.some(item => item.score ? item.score > 0 : false) ? 'Submitted' : 'Pending'}</td>
              <td>
                  <button onclick="downloadForm('${faculty.facultyId}')">Download</button>
              </td>
          `;

          // Append the row to the table body
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching faculty data:', error);
      tableBody.innerHTML = '<tr><td colspan="8">Failed to load data</td></tr>';
  }
});

function downloadForm(facultyId) {
  // Implement form download logic
  alert(`Download form for Faculty ID: ${facultyId}`);
}


