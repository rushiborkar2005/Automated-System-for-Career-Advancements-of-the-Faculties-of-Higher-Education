// document.addEventListener('DOMContentLoaded', function() {
//   // Get all necessary elements
//   const chatbotToggle = document.querySelector('.chatbot-toggle');
//   const chatbotContainer = document.querySelector('.chatbot-container');
//   const minimizeBtn = document.querySelector('.minimize-btn');
//   const userInput = document.querySelector('#user-input');
//   const sendBtn = document.querySelector('#send-btn');
//   const messagesContainer = document.querySelector('.chatbot-messages');

//   // Toggle chatbot visibility
//   chatbotToggle.addEventListener('click', function() {
//       chatbotContainer.style.display = 'flex';
//       chatbotToggle.style.display = 'none';
//   });

//   // Minimize chatbot
//   minimizeBtn.addEventListener('click', function() {
//       chatbotContainer.style.display = 'none';
//       chatbotToggle.style.display = 'block';
//   });

//   // Function to add a message to the chat
//   function addMessage(message, isUser = false) {
//       const messageDiv = document.createElement('div');
//       messageDiv.classList.add('message');
//       messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
//       messageDiv.textContent = message;
//       messagesContainer.appendChild(messageDiv);
//       messagesContainer.scrollTop = messagesContainer.scrollHeight;
//   }

//   // Function to get bot response
//   function getBotResponse(message) {
//       const lowerMessage = message.toLowerCase();
//       if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
//           return "Hello! How can I help you today?";
//       } else if (lowerMessage.includes('appraisal')) {
//           return "The appraisal system is currently open. You can submit your appraisal through the 'Get Started' button.";
//       } else if (lowerMessage.includes('deadline')) {
//           return "The current deadline for appraisal submission is December 31, 2024.";
//       } else if (lowerMessage.includes('help')) {
//           return "I can help you with appraisal submission, guidelines, and deadlines. What would you like to know?";
//       } else {
//           return "I'm not sure about that. Can you please rephrase your question?";
//       }
//   }

//   // Handle sending messages
//   function handleSendMessage() {
//       const message = userInput.value.trim();
//       if (message) {
//           // Add user message
//           addMessage(message, true);
          
//           // Clear input
//           userInput.value = '';
          
//           // Add bot response after a short delay
//           setTimeout(() => {
//               const response = getBotResponse(message);
//               addMessage(response, false);
//           }, 500);
//       }
//   }

//   // Send message on button click
//   sendBtn.addEventListener('click', handleSendMessage);

//   // Send message on Enter key
//   userInput.addEventListener('keypress', function(e) {
//       if (e.key === 'Enter') {
//           handleSendMessage();
//       }
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const faqBtns = document.querySelectorAll('.faq-btn');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const minimizeBtn = document.getElementById('minimize-btn');

    const faqAnswers = {
        q1: "To access the self-appraisal form, log in to your account on the portal, navigate to the 'Self-Appraisal' section on your dashboard, and select the appropriate form for your designation (Assistant or Associate Professor).",
        q2: "Click on the 'Forgot Password' link on the login page. Enter your registered email or mobile number, and a reset link or OTP will be sent to you.",
        q4: "Yes, you can edit the form before the final submission. Once submitted, any edits will require approval from the admin panel.",
        q6: "Log in to your dashboard and navigate to the 'Form Status' section. You will see whether your form is Pending Review, Under Review, or Approved.",
        q10: "Yes, the system supports integration with existing ERP systems or LMS platforms via APIs for seamless data transfer and reporting."
    };

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
    });

    minimizeBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Display answer when a FAQ button is clicked
    faqBtns.forEach(button => {
        button.addEventListener('click', () => {
            const questionId = button.getAttribute('data-question');
            const answer = faqAnswers[questionId];
            addMessage('user', button.textContent);
            addMessage('bot', answer);
        });
    });

    // Add a message to the chat window
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Handle send button click (optional for user input)
    sendBtn.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage('user', userMessage);
            addMessage('bot', "Sorry, I can only answer specific questions at the moment.");
            userInput.value = '';
        }
    });
});

