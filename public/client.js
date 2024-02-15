const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do{
    name = prompt('Please enter your name: ')
}while(!name)

// on pressing any key, this event blow will be triggered
textarea.addEventListener('keyup', (e) => {
    // checking that if the key is Enter key or not
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg = {
        user: name,
        // to prevent going from second line
        message: message.trim()
    }
    // append the message in the message area
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // now, after appending send this message to the server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type 
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

// recieve the message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}