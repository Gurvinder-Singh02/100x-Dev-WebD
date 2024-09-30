const data = [{
    "question": "Which language runs in a web browser?",
    "a": "Java",
    "b": "C",
    "c": "Python",
    "d": "JavaScript",
    "correct": "d",
},
{
    "question": "What does CSS stand for?",
    "a": "Central Style Sheets",
    "b": "Cascading Style Sheets",
    "c": "Cascading Simple Sheets",
    "d": "Cars SUVs Sailboats",
    "correct": "b",
},
{
    "question": "What does HTML stand for?",
    "a": "Hypertext Markup Language",
    "b": "Hypertext Markdown Language",
    "c": "Hyperloop Machine Language",
    "d": "Helicopters Terminals Motorboats Lamborginis",
    "correct": "a",
},
{
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b",
}
]

const que = document.querySelector('.que')
const options = document.querySelector('.options')

const a = document.querySelector('.option_a')
const b = document.querySelector('.option_b')
const c = document.querySelector('.option_c')
const d = document.querySelector('.option_d')

const submit = document.querySelector('.submit')
const reload = document.querySelector('.reload')

let form = document.querySelector('form')

let currQuestion = 0
let correctAnswers = 0

updateText()

form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("currQuestion : ", currQuestion)
    if (currQuestion == data.length - 1) {
        showResult()
        e.submit()
    }

    else {
        const selectedOption = document.querySelector('input[name="option"]:checked');

        if (selectedOption) {
            console.log("Selected Option:", selectedOption.value);
            if (selectedOption.value == data[currQuestion].correct) (correctAnswers += 1)
            currQuestion += 1

            updateText()
        } else {
            alert("No option selected");
        }
    }
});

reload.addEventListener('click', (e) => {
    e.preventDefault()
    location.reload()

})


function updateText() {

    que.innerHTML = data[currQuestion].question
    a.innerHTML = data[currQuestion].a
    b.innerHTML = data[currQuestion].b
    c.innerHTML = data[currQuestion].c
    d.innerHTML = data[currQuestion].d
}

function showResult() {
    que.innerHTML = ` Your Correct Answers are ${correctAnswers}/4`
    options.style.display = 'none'
    submit.style.display = 'none'
    reload.style.display = 'block'

}