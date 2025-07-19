// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.createElement("div");
  chatBox.innerHTML = `
    <div id="chat-assistant" style="position: fixed; bottom: 20px; left: 20px; background: #fff; border: 1px solid #ccc; width: 300px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 9999;">
      <div style="background: #4f46e5; color: white; padding: 10px; font-weight: bold; border-top-left-radius: 10px; border-top-right-radius: 10px;">Study Assistant</div>
      <div id="chat-messages" style="height: 200px; overflow-y: auto; padding: 10px; font-family: sans-serif;"></div>
      <input id="chat-input" placeholder="Ask something..." style="width: 95%; margin: 5px auto; padding: 8px; border-radius: 5px; border: 1px solid #ccc; display: block;" />
    </div>
  `;
  document.body.appendChild(chatBox);

  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        appendMessage("You", userMessage);
        const botReply = getBotResponse(userMessage);
        setTimeout(() => appendMessage("Bot", botReply), 500);
        chatInput.value = "";
      }
    }
  });

  function appendMessage(sender, text) {
    const message = document.createElement("div");
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(msg) {
    const text = msg.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
      return "Hello! How can I help you with your study schedule?";
    } else if (text.includes("html")) {
      return "HTML stands for HyperText Markup Language. It's used to structure content on the web.";
    } else if (text.includes("pomodoro")) {
      return "The Pomodoro technique involves 25 mins study and 5 mins break. Want to start a session?";
    } else if (text.includes("plan") || text.includes("schedule")) {
      return "You can start by creating tasks for each subject in the calendar view.";
    } else if (text.includes("motivate")) {
      return "Keep going! Remember why you started 💪 You’ve got this!";
    }

    return "I'm not sure how to help with that. Try asking about HTML, Pomodoro, or your study plan.";
  }
});
