
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  const appendMessage = (role, content) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(role);
    messageDiv.innerText = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const sendMessage = async () => {
  const userMessage = userInput.value.trim();
  if (userMessage !== "" ) {

    // Create message container for user message
    const userMessageContainer = document.createElement('div');
    userMessageContainer.classList.add('message-container', 'user-message');

    const userMessageLabel = document.createElement('div');
    userMessageLabel.classList.add('message-label');
    //userMessageLabel.textContent = 'You';

    const userMessageContent = document.createElement('div');
    userMessageContent.classList.add('message');
    userMessageContent.textContent = userMessage;
    
    userMessageContainer.appendChild(userMessageLabel);
    userMessageContainer.appendChild(userMessageContent);

    // Append the user message container to the chat box
    chatBox.appendChild(userMessageContainer);

    // Clear input field
    userInput.value = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      // Create message container for PrismALM's message
      const botMessageContainer = document.createElement('div');
      botMessageContainer.classList.add('message-container', 'bot-message');

      const botMessageLabel = document.createElement('div');
      botMessageLabel.classList.add('message-label');
      //botMessageLabel.textContent = 'PrismALM';

      const botMessageContent = document.createElement('div');
      botMessageContent.classList.add('message');
      botMessageContent.textContent = data.message;

      botMessageContainer.appendChild(botMessageLabel);
      botMessageContainer.appendChild(botMessageContent);

      // Append PrismALM's message container to the chat box
      chatBox.appendChild(botMessageContainer);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });


});


// import { config } from "dotenv"
// config()

// import { OpenAI } from "openai"
// import readline from "readline"

// const openAi = new OpenAI({
//     apiKey: process.env.API_KEY,
//   })

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const response = await openAi.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   })
//   console.log(response.choices[0].message)
//   userInterface.prompt()
// })