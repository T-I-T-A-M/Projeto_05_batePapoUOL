let usuario = ""
let mensagem =""

compararNomes()

function compararNomes (){
console.log("funcao comecou")

usuario = prompt ("Qual o seu nome ?");

let usuarioObjeto = {
    name: usuario,
    }

    let promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/participants",usuarioObjeto);
    promise.then(tratarSucesso)
    promise.catch(tratarErro)


    function tratarErro (err){
        console.log("funcao erro")
        let respostaServidor=err.response.status

        if (respostaServidor === 400){
            console.log("if erro comecou")

            alert ("Nome já utilizado, escolha outro nome!")

            compararNomes()
        }

}
}
//Sucesso para entrar na sala


    function tratarSucesso (sucess){
        console.log("funcao sucesso")
        alert ("Usuario inserido com sucesso, você já vai entrar na sala")

        
        tratarDadosChat()
    }

function tratarDadosChat (){
    console.log("tratarDadosChat")

    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(renderizarChat)


    function renderizarChat(chat){
        console.log("funcao renderizar chat")
        document.querySelector(".chat").innerHTML=""

// Renderização do chat antes da entrada do usuario
                inserirChat()
                function inserirChat (){
                for (let i=0; i<chat.data.length; i++){
                    let tipoMensagem= chat.data[i].type;
                    // renderizar mensagens
                if (tipoMensagem ==="message"){

                document.querySelector(".chat").innerHTML+=`
                <li class="message">
                <p class="time">(${chat.data[i].time})</p><p class ="sender">${chat.data[i].from}</p><p>para</p><p class ="receiver">${chat.data[i].to}:</p><p class="text">${chat.data[i].text}</p>
                </li>`
        
                // renderizar status
                } else if (tipoMensagem ==="status"){
                
                    document.querySelector(".chat").innerHTML+=`
                    <li class ="status">
                    <p class="time">(${chat.data[i].time})</p><p class ="sender">${chat.data[i].from}</p><p class="text">${chat.data[i].text}</p>
                    </li>`
            
                    } else if (tipoMensagem ==="private_message"){

                        document.querySelector(".chat").innerHTML+=`
                        <li class="private-message">
                         <p class="time">(${chat.data[i].time})</p><p class ="sender">${chat.data[i].from}</p><p>reservadamente para</p><p class ="receiver">${chat.data[i].to}:</p><p class="text"${chat.data[i].text}</p>
                        </li>`


                        
                    }
                }
                }
                const elementoQueQueroQueApareca = document.querySelector(".chat").lastChild
                elementoQueQueroQueApareca.scrollIntoView();
            }
            }

function estaOnline (){

    let usuarioObjeto = {
        name: usuario,
        }

        let promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/status",usuarioObjeto);
        promise.then(taOnline)

        function taOnline(){
            console.log("você ta on sim papai")
        }
}

function enviarMensagem (){
    console.log ("Enviar mensagem comecou")
    mensagem = document.querySelector(".send-text").value;

    let mensagemUsuario = {
        from: usuario,
        to: "Todos",
        text: mensagem,
        type: "message",
    }

    let promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/messages",mensagemUsuario)
    promise.then(mensagemSucesso)
    promise.catch(mensagemErro)

    function mensagemSucesso (){
        
        console.log ("mensagem enviada para os server com sucesso")
        document.querySelector(".chat").innerHTML+=`
        <li class="message">
        <p class="time"></p><p class ="sender">${mensagemUsuario.from}</p><p>para</p><p class ="receiver">${mensagemUsuario.to}:</p><p class="text">${mensagemUsuario.text}</p>
        </li>`

        document.querySelector(".send-text").value =""
    }

    function mensagemErro(){
        console.log("deu ruim pra enviar a mensagem")
        alert ("Você foi deslogado por inatividade, faça loguin novamente")
        window.location.reload()
    }
    
    
    tratarDadosChat()
}








const refrescoChat = setInterval (tratarDadosChat,3000)
const usuarioOnline = setInterval (estaOnline,5000)







