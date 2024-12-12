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
      getscore(); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}