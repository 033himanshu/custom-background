const input = document.querySelector('input')
const addBtn = document.querySelector('.addButton button')
const buttons = document.querySelector('.buttons')
const span = document.querySelector('span')
const buttonText = document.querySelector('.buttons h3')
const colors = new Set()
let len = 0
const addButtonOnScreen = (color, id=undefined) =>{
    if(id!==undefined){
        localStorage.setItem(`${id}`, color)
        console.log(color, `set on ${id}`)
    }
    buttonText.removeAttribute('hidden')
    const newBtn = document.createElement('button')
    colors.add(color)
    newBtn.style.backgroundColor = color
    newBtn.addEventListener('click', ()=>{
        document.body.style.backgroundColor = color
    })
    buttons.appendChild(newBtn)
}
(()=>{
    len = localStorage.length
    console.log(len)
    for(let i=0;i<len;++i){
        let color = localStorage.getItem(`${i}`)
        addButtonOnScreen(color)
    }
})()
const isValidValue = val =>{
    for(let c of val){
        if(!((c>='0' && c<='9') || (c>='a' && c<='f') || (c>='A' && c<='F'))) return false
    };
    return true
}
const isValidColor = (color) =>{
    return !(color.length!==7 || 
        color[0]!=='#' ||
         !isValidValue(color.substring(1, 2)) ||
          !isValidValue(color.substring(3, 2)) ||
          !isValidValue(color.substring(5, 2)))
}
input.addEventListener('input', ()=>{
    span.innerText = ''
    if(!isValidColor(input.value)){
        addBtn.style.backgroundColor = ""
    }else
        addBtn.style.backgroundColor = input.value
})
addBtn.addEventListener('click', ()=>{
    let color = input.value
    if(!isValidColor(input.value)){
        span.innerText = `${color} is invalid, Give valid hexColorCode`
        return
    }
    if(colors.has(color)){
        span.innerText = `${color} color already exists`
        return
    }
    addButtonOnScreen(color, len++)
})