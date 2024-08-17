function validate(texto){

    const regexLetrasMinusculasEspacos = /^[a-z\s]+$/;

    if (regexLetrasMinusculasEspacos.test(texto)) {
        return true
    } else {
        return false
    }
           
}

const mapaLetrasTroca = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}

function criptografar(texto) {
    return texto.split('').map(char => mapaLetrasTroca[char] || char).join('');
}

function descriptografar(texto) {
    let textoDescriptografado = texto;
    for (const [letra, substituicao] of Object.entries(mapaLetrasTroca)) {
        const regex = new RegExp(substituicao, 'g');
        textoDescriptografado = textoDescriptografado.replace(regex, letra);
    }
    return textoDescriptografado;
}

function letrasAleatorias(length) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }
    return result;
}

let btn_cript = document.getElementById("cript")
btn_cript.addEventListener('click', function(){
    container_results = document.getElementById("return-text--results")
    text_area_cript = document.getElementById("text-results")
    text_area = document.getElementById("text")
    texto = text_area.value

    if (texto.trim() === ''){
        alert("O texto está em branco")
        text_area.value = ""
        return
    }

    let isValidate = validate(texto)
    
    if (isValidate == true)  {
        // gerar caracteres aleatorios para a animação
        const randomText = letrasAleatorias(50);
        
        // Limpar o contêiner de animação antes de adicionar novas letras
        animationContainer.innerHTML = '';

        // Criar elementos para cada letra e animá-los
        randomText.split('').forEach((char, index) => {
            const flyingLetter = document.createElement('div');
            flyingLetter.className = 'flying-letter';
            flyingLetter.textContent = char;

            const maxLeft = window.innerWidth - 25; 
            const maxTop = window.innerHeight - 25; 
            flyingLetter.style.left = `${Math.random() * maxLeft}px`;
            flyingLetter.style.top = `${Math.random() * maxTop}px`;
            animationContainer.appendChild(flyingLetter);

            setTimeout(() => {
                animationContainer.removeChild(flyingLetter);
                if (index === randomText.length - 1) {
                    textoCriptografado = criptografar(texto)
                    text_area_cript.value =  textoCriptografado
                    document.querySelector("#return-text").style.display = "none"
                    document.querySelector("#return-text--results").style.display = "flex"
                }
            }, 2000); 
        });
        
         
    } else {
        alert("Só é permitido letras minúsculas. Tente novamente!")
    }

   
    text_area.value = ""
  

})



let btn_descript = document.getElementById("descript")
btn_descript.addEventListener('click', function(){
    container_results = document.getElementById("return-text--results")
    text_area_cript = document.getElementById("text-results")
    text_area = document.getElementById("text")
    texto = text_area.value

    if (texto.trim() === ''){
        alert("O texto está em branco")
        text_area.value = ""
        return
    }


    let isValidate = validate(texto)
    
    if (isValidate == true)  {
        // gerar caracteres aleatorios para a animação
        const randomText = letrasAleatorias(45);
        
        // Limpar o contêiner de animação antes de adicionar novas letras
        animationContainer.innerHTML = '';
        
        // Criar elementos para cada letra e animá-los
        randomText.split('').forEach((char, index) => {
            const flyingLetter = document.createElement('div');
            flyingLetter.className = 'flying-letter';
            flyingLetter.textContent = char;

            
            const maxLeft = window.innerWidth - 25; 
            const maxTop = window.innerHeight - 25; 
            flyingLetter.style.left = `${Math.random() * maxLeft}px`;
            flyingLetter.style.top = `${Math.random() * maxTop}px`;
            animationContainer.appendChild(flyingLetter);

            
            setTimeout(() => {
                animationContainer.removeChild(flyingLetter);
                if (index === randomText.length - 1) {
                    textoDescriptografado = descriptografar(texto)
                    text_area_cript.value = textoDescriptografado
                    document.getElementById("return-text").style.display = "none"
                    document.getElementById("return-text--results").style.display = "flex"
                }
            }, 2000); 
        });

    } else {
        alert("Só é permitido letras minúsculas. Tente novamente!")
    }

    text_area.value = ""

})


let btn_copy = document.getElementById("btn-copy")
btn_copy.addEventListener('click', function(){
    text_area_cript = document.getElementById("text-results")
    span_msg_copy = document.querySelector(".return-text--results__msg-copy")
    texto = text_area_cript.value

    navigator.clipboard.writeText(texto).then(function () {
        
        span_msg_copy.innerHTML = "Texto copiado com sucesso!"
        setTimeout(() => {
            document.getElementById("return-text").style.display = "flex"
            document.getElementById("return-text--results").style.display = "none"
            span_msg_copy.innerHTML = ""
        }, 2000)
        
    }).catch(function(error) {
        console.error("Erro ao tentar copiar texto", error)
    })

    text_area_cript.value = ""
    

})

