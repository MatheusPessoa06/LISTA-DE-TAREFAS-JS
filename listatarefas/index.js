const input = document.getElementById('tarefa')
const adicionar = document.getElementById('adicionar')
const lista = document.getElementById('lista')

function criaTarefa(tarefa){
   
    const li = document.createElement('li') 
    //Estou chamando esse valor de 'tarefa' no evento da variavel adicionar
    li.innerHTML = `${tarefa}`//li.innerHTMl = Ela nomeia o elemento da variavel que estou chamando ex: li = innerHTML
    lista.appendChild(li)
    limparTarefa()
    botaoApagar(li)
    salvarTarefa()
    
}

function botaoApagar(li){ 
    const btnApagar = document.createElement('button')
    btnApagar.innerHTML = `Apagar`
    //btnApagar.classList.add('apagar') metodo 1 de usar
    btnApagar.setAttribute('class', 'apagar') //metodo 2 de usar
    li.appendChild(btnApagar)   
    
}

function limparTarefa(){
    input.value = ''
    input.focus()
}

adicionar.addEventListener('click', function(){
    if(!input.value) return  //So retorna se ele tiver resultado
    criaTarefa(input.value) 
})

input.addEventListener('keypress', function(e){
    if(e.keyCode === 13){ //keycode de enter é 13. Cada vez que apertar enter, ele executa a ação
        if(!input.value) return
         //So retorna se ele tiver resultado
        criaTarefa(input.value)
   } 
})

document.addEventListener('click', function(e){
    const el = e.target
    
    if(el.classList.contains('apagar')){ //Se conter a class 'Apagar', ele executa a função
        el.parentElement.remove() //o metodo "parentElement" seleciona o elemento pai.
        salvarTarefa()
    }
})

function salvarTarefa(){
    const liTarefas = lista.querySelectorAll('li')
    const listaDeTarefas = []
    
    for(let listas of liTarefas){ // para cada item de liTarefas, listar recebe o valor
        let listaTexto = listas.innerText
        listaTexto = listaTexto.replace('Apagar', '').trim(/*remove os espaços em branco*/) //Percorre a string e retira oq foi solicitado 
        listaDeTarefas.push(listaTexto)
       
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas) //Converte o array para string JSON
    localStorage.setItem('listas', tarefasJSON)
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('listas')
    const listaDeTarefas = JSON.parse(tarefas) //parse converte de volta para o objeto js
    console.log(listaDeTarefas)

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()