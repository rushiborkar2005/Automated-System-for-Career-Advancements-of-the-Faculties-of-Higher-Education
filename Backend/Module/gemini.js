const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateText() {
    // Replace with your actual API key
    const apiKey = 'AIzaSyDRizynqIPgiZfgrMdqcosDOWxsTGNtwEM'; 

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Explain how AI works";

    try {
        const result = await model.generateContent(prompt);
        console.log('Generated Text:', result.response.text());
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Call the function
generateText();
