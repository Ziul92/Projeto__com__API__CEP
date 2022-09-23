/*  Com fetch e .then
const consultaCEP = fetch(`https://viacep.com.br/ws/01001000/json/`)
    .then(resposta => resposta.json())
    .then(r => {
        if(r.erro) {
            throw Error(`Esse CEP não existe!!!`)
        } else {
            console.log(r)}
        })
    .catch(erro => {
        if(erro) {
            throw Error(`O formato digitado é invalido`)
        } else 
        console.log(erro)
    })
    .finally(mensagem => console.log(`Processamento concluido!!`))

console.log(consultaCEP)
*/

const cep = document.querySelector("[data-cep]")
const logradouro = document.querySelector("[data-endereco]")
const bairro = document.querySelector("[data-bairro]")
const cidade = document.querySelector("[data-cidade]")
const estado = document.querySelector("[data-estado]")
const erroUsuario = document.querySelector("[data-erro]")


function adicionaEndereco(consultaCEPJSON) {
    logradouro.value = consultaCEPJSON.logradouro
    bairro.value = consultaCEPJSON.bairro
    cidade.value = consultaCEPJSON.localidade
    estado.value = consultaCEPJSON.uf
}

async function buscaEndereco(cep) {
    erroUsuario.innerHTML = ""
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCEPJSON = await consultaCEP.json()
        if(consultaCEPJSON.erro) {
            throw Error(`O CEP não existe!!`)
        }
        console.log(consultaCEPJSON)
        adicionaEndereco(consultaCEPJSON)
        return consultaCEPJSON
    } catch(erro) {
        erroUsuario.innerHTML = "<p>CEP inválido, tente novamente!!!</p>"
        if(erro = 400) {
            throw Error(`Formato inválido!!!`)
        }
        console.log(erro)
    }
}





cep.addEventListener("focusout", () => buscaEndereco(cep.value))