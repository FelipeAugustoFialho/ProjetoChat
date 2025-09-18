const login = document.querySelector('.login');
const loginForm = document.querySelector('.login__form');
const loginInput = document.querySelector('.login__input');


const chat = document.querySelector('.chat');
const chatMessages = document.querySelector('.chat__message');
const chatForm = document.querySelector('.chat__form');
const chatInput = document.querySelector('.chat__input');

const user = { id: "", name: "", color: "" };

const colors = [
    "aqua",
    "black",
    "blue",
    "coral",
    "crimson",
    "cyan",
    "fuchsia",
    "gold",
    "gray",
    "green",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lime",
    "magenta",
    "maroon",
    "navy",
    "olive",
    "orange",
    "orchid",
    "pink",
    "plum",
    "purple",
    "red",
    "salmon",
    "silver",
    "teal",
    "tomato",
    "turquoise",
    "violet",
    "white",
    "yellow"
];

let websocket;

const createMessageSelfElement = (content) => {
    const div = document.createElement('div');
    div.classList.add('message--self')
    div.innerHTML = content

    return div;
}

const createMessageOtherElement = (content, sender , senderColor) => {
    const div = document.createElement('div');
    const span = document.createElement('span');

    div.classList.add('message--other')
    span.classList.add('message--sender')
    span.style.color = senderColor;


    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div;
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

const scrollScren = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

const processMessage = ({ data }) => {

    const { userId, userName, userColor, content } = JSON.parse(data);

    const message = userId === user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName, userColor);

    const element = createMessageOtherElement( content, userName, userColor);

    chatMessages.appendChild(message);

    scrollScren();
}

const handleSubmit = (event) => {
    event.preventDefault();

    user.id = crypto.randomUUID();
    user.name = loginInput.value;
    user.color = getRandomColor();

    login.style.display = 'none';
    chat.style.display = 'flex';

    websocket = new WebSocket('wss://projetochat-backend.onrender.com');
    websocket.onmessage = processMessage;


}

const sendMessage = (event) => {
    event.preventDefault();


    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message));

    chatInput.value = '';
   
}

loginForm.addEventListener('submit', handleSubmit)

chatForm.addEventListener('submit', sendMessage)