document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    fetch1();
    function openTab(tabName){
        // Hide all tabs
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Remove active class from all buttons
        tabButtons.forEach(button => button.classList.remove('active'));
        
        // Show the clicked tab's content
        const activeTab = document.getElementById(tabName);
        activeTab.classList.add('active');
        
        // Add active class to the clicked button
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        activeButton.classList.add('active');

        // Scroll to the active tab
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            openTab(tabName);
        });
    });

    // Open the first tab by default
    openTab('teaching');

    // Recommendation tab functionality

    const observationTabs = document.querySelectorAll('.observation-tabs button');
  
    const textareaObservation = document.getElementById('textarea-observation');
    const textareaRecommendation = document.getElementById('textarea-recommendation');
    const fileUploadContainer = document.getElementById('file-upload-container');
    

    observationTabs.forEach(button => {
        button.addEventListener('click', function () {
            observationTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            textareaObservation.style.display = 'none';
            textareaRecommendation.style.display = 'none';
            fileUploadContainer.style.display = 'none';

            if (this.id === 'observation-btn') {
                textareaObservation.style.display = 'block';
            } else if (this.id === 'recommendation-btn') {
                textareaRecommendation.style.display = 'block';
            } else if (this.id === 'file-upload-btn') {
                fileUploadContainer.style.display = 'block';
            }
        });
    });

    // Show Observations textarea by default
    document.getElementById('observation-btn').click();
    

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
          // Remove 'active' class from all buttons
          document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
          // Add 'active' class to clicked button
          button.classList.add('active');
    
          // Hide all tab contents
          document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          // Show the corresponding tab content
          const target = button.getAttribute('data-target');
          document.getElementById(target).classList.add('active');
        });
      });
    
        // Hide all sections initially
        const hideAllSections = () => {
            for (const section in sections) {
                sections[section].style.display = 'none';
            }
        };
    
        // Event listener for tab buttons
        tabButtons.forEach((button) => {
            button.addEventListener('click', function () {
                tabButtons.forEach((btn) => btn.classList.remove('active'));
                this.classList.add('active');
    
                hideAllSections();
                const tabName = this.textContent.trim();
                if (sections[tabName]) {
                    sections[tabName].style.display = 'block';
                }
            });
        });
    
        // Trigger the first tab to be displayed by default
        hideAllSections();
        sections["Recommendation"].style.display = 'block';



        
    });
    
    const token = localStorage.getItem('authToken');


    // Action buttons functionality (placeholder)
    const actionButtons = document.querySelectorAll('.actions button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`${this.textContent} button clicked`);
            // Add actual functionality here
        });
    });

    // View and Edit button functionality (placeholder)
    const viewButtons = document.querySelectorAll('.view-button');
    const editButtons = document.querySelectorAll('.edit-button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('View button clicked');
            // Add actual view functionality here
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Edit button clicked');
            // Add actual edit functionality here
        });
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
           p(data.key,t)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }




async function fetch1() {
  fetchData(7);
  fetchData(0);
  fetchData(1);
  fetchData(2);
  fetchData(3);
  fetchData(4);
  fetchData(5);
  fetchData(7);

    
}




function p(data,t) {


  if(t===0)
  {
 const tableBody = document.getElementById('p1');
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
        <td>${entry.document || '-'}</td>
        <td class="score">${entry.score || 0}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  else if(t===1)
  {
    const tableBody = document.getElementById('p2');
    tableBody.innerHTML = ''; // Clear previous entries, if any
  
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.semester || 'N/A'}</td>
        <td>${entry.subjectCode || 'N/A'}</td>
        <td>${entry.subjectName || 'N/A'}</td>
        <td>${entry.studentFeedback}%</td>
        <td>-</td>
        <td class="score">${entry.score || 0}</td>
      `;
  
      tableBody.appendChild(row);
    });
  } 
  else if(t===2)
  {
 const tableBody = document.getElementById('p3');
    tableBody.innerHTML = '';
  
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.semester || 'N/A'}</td>
        <td>${entry.activity || 'N/A'}</td>
        <td>-</td>
        <td class="score">${entry.score || 0}</td>
      `;
      tableBody.appendChild(row);
    });
  } 
  else if(t===3)
  {
 const tableBody = document.getElementById('p4');
    tableBody.innerHTML = '';
  
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.semester || 'N/A'}</td>
        <td>${entry.activity || 'N/A'}</td>
        <td>-</td>
        <td class="score">${entry.score || 0}</td>
      `;
      tableBody.appendChild(row);
    });
  } 
  else if(t===5)
  {
 const tableBody = document.getElementById('p6');
    tableBody.innerHTML = '';
  
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.semester || 'N/A'}</td>
        <td>${entry.activity || 'N/A'}</td>
        <td>${entry.document || 'N/A'}</td>
        <td class="score">${entry.score || 0}</td>
      `;
      tableBody.appendChild(row);
    });
  } 
  else if(t===4)
  {
 const tableBody = document.getElementById('p5');
    tableBody.innerHTML = '';
  
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.semester || 'N/A'}</td>
        <td>${entry.subjectCode || 'N/A'}</td>
        <td>${entry.subjectName || 'N/A'}</td>
        <td>${entry.noRegisteredStudents || 'N/A'}</td>
        <td>${entry.noPassedStudents || 'N/A'}</td>
        <td>${entry.creditPoint || 'N/A'}</td>
        <td>${entry.document || 'N/A'}</td>
        <td class="score">${entry.score || 0}</td>
      `;
      tableBody.appendChild(row);
    });
  } 
  else if(t===7)
  {
            document.getElementById('title').textContent = data.title || 'N/A';
            document.getElementById('name').textContent = data.firstName|| 'N/A';
            document.getElementById('department').textContent = data.departmentName || 'N/A';
            document.getElementById('designation').textContent = data.designation || 'N/A';
            document.getElementById('facultyId').textContent = data.facultyId || 'N/A';
  }

   
  }

