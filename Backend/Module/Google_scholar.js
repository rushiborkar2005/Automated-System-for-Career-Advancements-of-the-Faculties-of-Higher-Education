const axios = require('axios');

// Replace with your SerpAPI key
const API_KEY = 'd660c81506a488b9fa048c86e9c3a85c5272c8a4fb61f1a06540f49e9fe03499';

// Function to fetch author data
async function fetchAuthorData(authorName) {
    const url = 'https://serpapi.com/search.json';
    const params = {
        engine: "google_scholar_author",
        author_id: "LSsXyncAAAAJ",
        api_key: API_KEY,
        
    };

    try {
        const response = await axios.get(url, { params });
        const data = response.data;

        if (data.profiles && data.profiles.length > 0) {
            console.log(`Found ${data.profiles.length} profile(s) for "${authorName}":`);
            data.profiles.forEach((profile, index) => {
                console.log(`${index + 1}. Name: ${profile.name}`);
                console.log(`   Affiliation: ${profile.affiliation}`);
                console.log(`   Citation Count: ${profile.cited_by?.value}`);
                console.log(`   Link: ${profile.link}\n`);
            });
        } else {
            console.log(`No profiles found for "${authorName}".`);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Replace 'Author Name' with the author's name you want to search
fetchAuthorData('a0SxanwAAAAJ');
