let usuario = prompt ("Qual o seu nome ?");


let usuarioObjeto = {
name: usuario,
}

compararNomes()

function compararNomes (){
console.log("funcao comecou")
    let promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/participants",usuarioObjeto);
    promise.then(tratarSucesso)
    promise.catch(tratarErro)


    function tratarSucesso (sucess){
        console.log("funcao sucesso")
        let viagem = sucess
        console.log(viagem)
        alert ("Usuario inserido com sucesso, você já vai entrar na sala")

        tratarDadosChat()

        function tratarDadosChat (){
            console.log("tratarDadosChat")

            promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
            promise.then(renderizarChat)


            function renderizarChat(chat){
                console.log("funcao renderizar chat")
                console.log(chat.data[1].from)
                

// Renderizar chat antes da entrada do usuario

                for (let i=0; i<chat.data.length; i++){
                    let tipoMensagem= chat.data[i].type;
                    // renderizar mensagens
                if (tipoMensagem ==="message"){

                
                document.querySelector(".chat").innerHTML+=`
                <li class="message">
                <p class="time">(${chat.data[i].time})</p><p class ="sender">${chat.data[i].from}</p><p>para</p><p class ="receiver">${chat.data[i].to}:</p><p class="text"${chat.data[i].text}</p>
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
            }
        }

    }

    function tratarErro (err){
        console.log("funcao erro")
        let respostaServidor=err.response.status

        while (respostaServidor === 400){
            console.log("while comecou")

            alert ("Nome já utilizado, escolha outro nome!")
            usuario = prompt ("Qual o seu nome ?")
            
            usuarioObjeto = {
                name: usuario,
                }
                compararNomes()
        }

}


// AINDA FALTA ARRUMAR ESSA COMPARAÇÃO DE NOMES

//chat -> entrar no site








