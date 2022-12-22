let socket = io()
let user = ''
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Set username for the Bianca\'s chat',
    inputValidator: value => {
        return !value.trim() && 'Please. Write a username!'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value
    document.getElementById('username').innerHTML = user
    
})

//enviamos mensajes
chatBox.addEventListener('keyup', event =>{
    if(event.key === "Enter"){
        socket.emit('message', {
            user,
            message: chatBox.value
        })
        chatBox.value = ''
    }
})

//recibir mensajes
socket.on('logs', data =>{
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.reverse().forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`

    });

    divLog.innerHTML = messages
})