let li = document.querySelectorAll('li')

let main = document.querySelector('body')

let input = document.querySelector('input')


li.forEach((e) => {
    e.addEventListener('click', () => {
        main.style.backgroundColor = e.className
    })
})

input.addEventListener('change', (e) => {
    main.style.backgroundColor = e.target.value
    main.style.color = 'white'
})