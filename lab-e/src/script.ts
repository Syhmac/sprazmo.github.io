// Link style-1.css to the head element
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'style-1.css';
document.head.appendChild(styleLink);

const styles = ["style-1.css", "style-2.css", "style-3.css"];

const styleButtonsContainer = document.getElementById('styleButtons');
const style1Button = document.createElement('button');
style1Button.textContent = 'Style 1';
styleButtonsContainer?.appendChild(style1Button);
const style2Button = document.createElement('button');
style2Button.textContent = 'Style 2';
styleButtonsContainer?.appendChild(style2Button);
const style3Button = document.createElement('button');
style3Button.textContent = 'Style 3';
styleButtonsContainer?.appendChild(style3Button);

style1Button.addEventListener('click', () => {
    styleLink.href = styles[0];
})

style2Button.addEventListener('click', () => {
    styleLink.href = styles[1];
})

style3Button.addEventListener('click', () => {
    styleLink.href = styles[2];
})