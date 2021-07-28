/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ (() => {

eval("const socket = io();\r\n\r\nfunction setUsername() {\r\n  socket.emit(\"setUsername\", document.querySelector(\".name-input\").value);\r\n}\r\n\r\ndocument.querySelector(\".submit-btn\").addEventListener(\"click\", () => {\r\n  setUsername();\r\n});\r\n\r\nsocket.on(\"userExists\", function (data) {\r\n  alert(`${data}`);\r\n});\r\n\r\nfunction sendMessage(user) {\r\n  let msg = document.querySelector(\".message-input\").value;\r\n  socket.emit(\"msg\", { message: msg, username: user });\r\n}\r\n\r\nsocket.on(\"userSet\", (data) => {\r\n  let user = data\r\n  document.body.innerHTML = `<div class='welcome-container'>\r\n            <p class='chat-hero'>\r\n                Hi, <span>${user}</span>\r\n            </p>\r\n\r\n            <div class='chat-box'>\r\n\r\n                <div class='chat-header'>\r\n\r\n                <div class='ch-name'>Online</div>\r\n\r\n                </div>\r\n\r\n                <div class='message-box'>\r\n                \r\n                </div>\r\n\r\n                <div class='chat-footer'>\r\n\r\n                <div class='footer-container'>\r\n\r\n                    <input\r\n                    type='text'\r\n                    class='message-input'\r\n                    placeholder='message'\r\n                    ></input>\r\n                    <button type='button' class='send-btn'>\r\n                    Send\r\n                    </button>\r\n\r\n                </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n            </div>`;\r\n\r\n  document.querySelector(\".send-btn\").addEventListener(\"click\", () => {\r\n    sendMessage(user);\r\n  });\r\n});\r\n\r\nsocket.on(\"newmsg\", function (data) {\r\n  console.log(data);\r\n  document.querySelector(\".message-box\").innerHTML +=\r\n    \"<div class='msg message'><b>\" +\r\n    data.username +\r\n    \"</b>:\" + \" \" +\r\n    data.message +\r\n    \" \" +\r\n    data.emoji + `</div>`;\r\n});\r\n\n\n//# sourceURL=webpack://mood-chat/./src/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client.js"]();
/******/ 	
/******/ })()
;