const socket = io();

//We set the username with the value inside of .name-input
function setUsername() {
  socket.emit("setUsername", document.querySelector(".name-input").value);
}

//Add an event listener that calls setUsername
document.querySelector(".submit-btn").addEventListener("click", () => {
  setUsername();
});

//If there is a user with the same name, you get an alert
socket.on("userExists", function (data) {
  alert(`${data}`);
});

//Function that emits a message value from .message-input
function sendMessage(user) {
  let msg = document.querySelector(".message-input").value;
  socket.emit("msg", { message: msg, username: user });
}

// When the connection is succesful and the username is unique we show the chat UI
socket.on("userSet", (data) => {
  //Store username
  let user = data;

  document.body.innerHTML = `<div class='welcome-container'>
            <p class='chat-hero'>
                Hi, <span>${user}</span>
            </p>

            <div class='chat-box'>

                <div class='chat-header'>

                <div class='ch-name'>Online</div>

                </div>

                <div class='message-box'>
                
                </div>

                <div class='chat-footer'>

                <div class='footer-container'>

                    <input
                    type='text'
                    class='message-input'
                    placeholder='message'
                    ></input>
                    <button type='button' class='send-btn'>
                    Send
                    </button>

                </div>

                </div>

            </div>
            </div>`;
  
  //Add an event listener to the function we defined previously so it sends a message when pressing .send-btn
  document.querySelector(".send-btn").addEventListener("click", () => {
    sendMessage(user);
  });
});

//Functionality to receive new messages
socket.on("newmsg", function (data) {
  console.log(data);
  document.querySelector(".message-box").innerHTML +=
    "<div class='msg message'><b>" +
    data.username +
    "</b>:" + " " +
    data.message +
    " " +
    data.emoji + `</div>`;
});
