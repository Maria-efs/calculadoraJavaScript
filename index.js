//Selecionando os elementos
const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")
const button = document.getElementById("copyToClipboard")

/* Array com os caracteres que terão funcionalidades.
    Os caracteres diferentes desses, como as letras, serão 'bloqueados' */
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Assim que o programa for iniciado o input fica em foco
input.focus()

//Funcionalidade as button da tela
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

//o evento keydown é quando a tecla é pressionada
input.addEventListener("keydown", function (ev) {
  ev.preventDefault()

  //Se a tecla pressionada for igual um dos caracteres do array, o valor será acrescentado no input
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  //Dando funcionalidade a tecla de apagar
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1)
  }
  //Dando funcionalidade a tecla Enter
  if (ev.key === "Enter") {
    calculate()
  }
})

//Quando o button de igual ser clicado ele calcula
document.getElementById('equal').addEventListener('click', calculate)

function calculate(){
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')

    //avalia o código JS e executa o mesmo
    //O eval faz a mesma coisa do console com operações
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove('error')
}

//Copiando para a área de transferência
document.getElementById('copyToClipboard').addEventListener('click', function clipboardFunction (ev){
    const button = ev.currentTarget
    if(button.innerText === 'Copy'){
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

//Funcionalidade do button clear
document.getElementById('clear').addEventListener('click', function () {
    resultInput.value = 'ERROR'
    resultInput.classList.remove('error')
    
    input.value = ''
    resultInput.value = ''
    
    button.innerText = 'Copied!'
    button.innerText = 'Copy'
    button.classList.remove('success')

    //focus -> dps de limpar o input, o input fica acionado
    input.focus()
})

//Trocando o tema usando as variáveis do CSS
document.getElementById('themeSwitcher').addEventListener('click', function () {
    //Acessando o atributo data-theme da tag main
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'ligth'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})
