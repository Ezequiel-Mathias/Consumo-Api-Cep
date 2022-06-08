'use strict';

const PreencherForm = (endereço) => {
    
    document.getElementById('endereco').value = endereço.logradouro
    document.getElementById('bairro').value = endereço.bairro
    document.getElementById('cidade').value = endereço.localidade
    document.getElementById('estado').value = endereço.uf
}

const Limparform = () => {
    document.getElementById('endereco').value = null
    document.getElementById('bairro').value = null
    document.getElementById('cidade').value = null
    document.getElementById('estado').value = null
}



const CepValido = (cep) => {
   if(cep.length == 8){
       return true
   }
}


const pesquisarCep = async() => {
    //Função para limpar o formulario, limpa o formulario primeiro e so dps adiciona os valores nos lugares respectivos
    Limparform();
    const cep = document.getElementById('cep').value
    const url = `http://viacep.com.br/ws/${cep}/json/`

    //Tratamento de caracteres invalidos no campo de consulta da API
    if(CepValido(cep)){
        const promessa = await fetch(url)
        const endereço = await promessa.json()
    //Tratamento de consulta invalida a API    
    if (endereço.hasOwnProperty('erro')){
        document.getElementById('endereco').value = 'Cep invalido'
        document.getElementById('bairro').value = 'Cep invalido'
        document.getElementById('cidade').value = 'Cep invalido'
        document.getElementById('estado').value = 'Cep invalido'
    }else{
    PreencherForm(endereço)
    }

    }else{
        document.getElementById('endereco').value = 'Cep invalido'
        document.getElementById('bairro').value = 'Cep invalido'
        document.getElementById('cidade').value = 'Cep invalido'
        document.getElementById('estado').value = 'Cep invalido'
    }

}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);