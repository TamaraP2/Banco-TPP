"use strict";


/* ====================================================== */
/* ======================== USERS ======================= */
/* ====================================================== */

let contas = [
    {
        id: 1,
        nome: "Carlos Alberto",
        username: "",
        password: "0123",
        movimentacoes: [
            {
            tipo: "transferencia-recebida",
            valor: 100,
            data: "14/07/2022",
            hora: "10:50"
            },
            {
            tipo: "deposito",
            valor: 230,
            data: "19/07/2022",
            hora: "08:03"
            },
            {
            tipo: "transferencia-enviada",
            valor: -250.50,
            data: "05/08/2022",
            hora: "22:45"
            },
            {
            tipo: "deposito",
            valor: 10,
            data: "15/09/2022",
            hora: "15:01"
            },
            {
            tipo: "saque",
            valor: -75,
            data: "30/09/2022",
            hora: "16:42"
            }
        ] 
    },
    {
        id: 2,
        nome: "Luana Martins",
        username: "",
        password: "3456",
        movimentacoes: [
            {
            tipo: "deposito",
            valor: 83,
            data: "05/05/2022",
            hora: "07:10"
            },
            {
            tipo: "deposito",
            valor: 30,
            data: "27/05/2022",
            hora: "08:00"
            },
            {
            tipo: "saque",
            valor: -50,
            data: "10/06/2022",
            hora: "11:45"
            },
            {
            tipo: "deposito",
            valor: 280,
            data: "15/06/2022",
            hora: "15:37"
            },
            {
            tipo: "transferencia-recebida",
            valor: 100.78,
            data: "03/10/2022",
            hora: "12:56"
            },
            {
            tipo: "saque",
            valor: -75,
            data: "09/10/2022",
            hora: "17:09"
            }
        ]
    },
    {
        id: 3,
        nome: "Norberto Domingues",
        username: "",
        password: "7890",
        movimentacoes: [
            {
            tipo: "deposito",
            valor: 50,
            data: "01/09/2022",
            hora: "23:57"
            },
            {
            tipo: "saque",
            valor: -30,
            data: "02/10/2022",
            hora: "04:50"
            },
            {
            tipo: "saque",
            valor: -15,
            data: "11/10/2022",
            hora: "12:30"
            }
        ]
    }
];


function criandoUsernames(users) {
    users.forEach(conta => {
        conta.username = conta.nome.split(" ").map(nomes => nomes[0]).join("");   
    });
    
}

criandoUsernames(contas); 


/* ====================================================== */
/* ========================= INFO ======================= */
/* ====================================================== */


document.querySelector(".info-btn").addEventListener("click", function() {
    
    if (!document.querySelector(".info-box")) {
        
        document.querySelector(".login-btn").insertAdjacentHTML("afterend", `
            <div class="info-box">
                <p class="info-box-titulo">CONTAS DISPONÍVEIS</p>
                <p><span class="info-box-contas">Usuário: CA</span> <span class="info-box-contas">Senha: 0123</span></p>
                <p><span class="info-box-contas">Usuário: LM</span> <span class="info-box-contas">Senha: 3456</span></p>
                <p><span class="info-box-contas">Usuário: ND</span> <span class="info-box-contas">Senha: 7890</span></p>
            </div>`);
    }
    else if (document.querySelector(".info-box")){
        
        document.querySelector(".info-box").remove();
    }
});

 
/* ====================================================== */
/* ===================== AUTENTICAÇÃO =================== */
/* ====================================================== */


document.querySelector(".login-btn").addEventListener("click", function(e) {
    e.preventDefault();     
    let usernameLogin = document.getElementById("username").value.toUpperCase();
    let passwordLogin = document.getElementById("password").value;
    verificadorLogin(usernameLogin, passwordLogin); 
});

let usuarioAutenticado = false;
let idUsuarioAtual = 0; 
let indexUsuarioAtual = -1;

function verificadorLogin(usernameLogin, passwordLogin) {

    if (usuarioAutenticado === false && !document.querySelector(".usuario-incorreto")) {
        document.querySelector(".login-h1").insertAdjacentHTML("afterend", "<p class='usuario-incorreto'>Usuário ou senha incorretos. Por favor, tente novamente</p>");
    }

    for (const [index, conta] of contas.entries()) {
        if (usernameLogin === conta.username && passwordLogin === conta.password){
            usuarioAutenticado = true;
            idUsuarioAtual = conta.id;
            indexUsuarioAtual = index;
            usuarioLogado(conta.nome);
            break;
        }
    }  
}
  


/* ====================================================== */
/* ========================= MENU ======================= */
/* ====================================================== */
 
function usuarioLogado(usuario) { 

    if (document.querySelector(".usuario-incorreto")) {
        document.querySelector(".usuario-incorreto").remove();
    }

    document.querySelector(".login-form").style.display = "none";   
    document.querySelector(".menu").style.display = "revert";   
    document.querySelector(".menu-h1").textContent = `Olá, ${usuario.split(" ")[0]}!`;  
}


document.querySelector(".extrato-voltar").addEventListener("click", function() {

    document.querySelector(".menu").style.display = "revert";   
    document.querySelector(".extrato").style.display = "none";  
});

document.querySelector(".transferencias-voltar").addEventListener("click", function() {

    document.querySelector(".menu").style.display = "revert";   
    document.querySelector(".transferencias").style.display = "none"; 

    removeElementosTransferencia();

});


for (let i = 0; i < document.querySelectorAll(".sair-btn").length ; i++) {

    document.querySelectorAll(".sair-btn")[i].addEventListener("click", function() {

        idUsuarioAtual = 0;
        indexUsuarioAtual = -1;
        usuarioAutenticado = false;

        if (document.querySelector(".info-box")){ 
            document.querySelector(".info-box").remove();
        }

        document.querySelector(".login-form").style.display = "flex";    
        document.querySelector(".menu").style.display = "none";   
        document.querySelector(".extrato").style.display = "none";    
        document.querySelector(".transferencias").style.display = "none";   
        document.getElementById("username").value = "";
        document.getElementById("password").value = ""; 

        removeElementosTransferencia();
    });
}



/* ====================================================== */
/* ==================== REMOVE ELEMENTOS ================ */
/* ====================================================== */

function removeElementosTransferencia () {
    
    while (document.querySelectorAll(".dropdown-item").length != 0) {
        document.querySelector(".dropdown-item").remove();
    }

    if (document.querySelector(".transferencia-incompleta-usuario")) {
        document.querySelector(".transferencia-incompleta-usuario").remove(); 
    }

    if (document.querySelector(".transferencia-incompleta-saldo")) {
        document.querySelector(".transferencia-incompleta-saldo").remove(); 
    }

    if (document.querySelector(".transferencia-incompleta-digite-valor")) {
        document.querySelector(".transferencia-incompleta-digite-valor").remove();    
    }

    if (document.querySelector(".transferencia-efetuada")) {
        document.querySelector(".transferencia-efetuada").remove();    
    }

    document.getElementById("transferencias-valor").value = "";    
    document.getElementById("transferencias-usuario").value = "select";  
} 
 

/* ====================================================== */
/* ========================= SALDO ====================== */
/* ====================================================== */
 
let saldoUsuario;

function calculoSaldo () {  

    saldoUsuario = 0;

    for (let i = 0; i < contas[indexUsuarioAtual].movimentacoes.length; i++) { 
        saldoUsuario += contas[indexUsuarioAtual].movimentacoes[i].valor;
    }
  
    saldoUsuario = new Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(saldoUsuario).replace('-', ''); 
   
    document.querySelectorAll(".saldo").forEach(element => element.innerHTML = `<div class="saldo">SALDO ATUAL: <span class="saldo-atual">${saldoUsuario}</span></div>`);        
}


/* ====================================================== */
/* ======================= EXTRATO ====================== */
/* ====================================================== */


document.querySelector(".extrato-btn").addEventListener("click", function() {
    document.querySelector(".menu").style.display = "none";   
    document.querySelector(".extrato").style.display = "grid";    
    extrato(); 
});


function extrato() {    
    
    document.querySelector(".historico").innerHTML = "";

    if (contas[indexUsuarioAtual].movimentacoes.length === 0) {
        document.querySelector(".historico").insertAdjacentHTML("afterbegin", '<p class="sem-historico">Não há transações registradas</p>');
    }
    else {

        for (let i = 0; i < contas[indexUsuarioAtual].movimentacoes.length; i++) { 
            let tipoTransacao = contas[indexUsuarioAtual].movimentacoes[i].tipo;
            let tipoTransacaoTexto = tipoTransacao.toUpperCase().split("-").join(" ").split(" ");
            let dataTransacao = contas[indexUsuarioAtual].movimentacoes[i].data;
            let horaTransacao = contas[indexUsuarioAtual].movimentacoes[i].hora;
            let valorTransacao = contas[indexUsuarioAtual].movimentacoes[i].valor;
                        
            let valorTransacaoBRL = new Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(valorTransacao); 

            let extratoUsuario = `<div class="historico-linhas ${tipoTransacao}"><span class="historico-tipo-transacao">${tipoTransacaoTexto[0]}</span><span class="historico-data-hora">${dataTransacao} às ${horaTransacao}</span><span class="historico-valor">${valorTransacaoBRL}</span></div>`;            

            document.querySelector(".historico").insertAdjacentHTML("afterbegin", extratoUsuario);       
        } 
        
        calculoSaldo(); 
    }
}




/* ====================================================== */
/* ==================== TRANSFERÊNCIA =================== */
/* ====================================================== */

document.querySelector(".transferencia-btn").addEventListener("click", function() {
       
    document.querySelector(".menu").style.display = "none";   
    document.querySelector(".transferencias").style.display = "grid";  

    for (let i = 0; i < contas.length; i++) {   
        if (contas[i].id != idUsuarioAtual) {
            document.getElementById("transferencias-usuario").insertAdjacentHTML("beforeend", `<option value="${contas[i].nome + " " + contas[i].id}" class="dropdown-item">${contas[i].nome}</option>`);                  
        }
    }

    calculoSaldo(); 
});


document.querySelector(".transferir-btn").addEventListener("click", function(e) {  

    e.preventDefault();  

    if (document.getElementById("transferencias-usuario").value === "select" && !document.querySelector(".transferencia-incompleta-usuario")) {
        document.getElementById("transferencias-usuario").insertAdjacentHTML("afterend", '<p class="transferencia-incompleta-usuario">Selecione o usuário para o qual deseja realizar a transferência</p>');
        
    } else if (document.getElementById("transferencias-usuario").value !== "select" && document.querySelector(".transferencia-incompleta-usuario")){ 
        document.querySelector(".transferencia-incompleta-usuario").remove();  
    }


    if ((document.getElementById("transferencias-valor").value === "" || document.getElementById("transferencias-valor").value === "0")) { 
        if (!document.querySelector(".transferencia-incompleta-digite-valor")){
            if (document.querySelector(".transferencia-incompleta-saldo")){ 
                document.querySelector(".transferencia-incompleta-saldo").remove(); 
            }           
            document.querySelector(".transferir-btn").insertAdjacentHTML("beforebegin", '<p class="transferencia-incompleta-digite-valor">Digite o valor que deseja transferir</p>');            
        }
    }  
    
    else if (document.getElementById("transferencias-valor").value > saldoUsuario && !document.querySelector(".transferencia-incompleta-saldo"))   {            
        if (document.querySelector(".transferencia-incompleta-digite-valor")){ 
            document.querySelector(".transferencia-incompleta-digite-valor").remove(); 
        }
        document.querySelector(".transferir-btn").insertAdjacentHTML("beforebegin", '<p class="transferencia-incompleta-saldo">Não há saldo suficiente para completar essa transação</p>');        
    } 
    
    else if (document.getElementById("transferencias-valor").value <= saldoUsuario && document.getElementById("transferencias-valor").value !== ""){            
        if (document.querySelector(".transferencia-incompleta-digite-valor")){ 
            document.querySelector(".transferencia-incompleta-digite-valor").remove(); 
        } 
        if (document.querySelector(".transferencia-incompleta-saldo")){ 
            document.querySelector(".transferencia-incompleta-saldo").remove(); 
        }    
        
        let idUsuarioRecebedorTransferencia = document.getElementById("transferencias-usuario").value.at(-1);
        let indexUsuarioRecebedorTransferencia = contas.findIndex(conta => conta.id === Number(idUsuarioRecebedorTransferencia));  
        let valorTransferido = Number(document.getElementById("transferencias-valor").value);


        let dataAtual = new Date().toLocaleDateString();
        let horaAtual = new Date().toLocaleTimeString(navigator.language, { hour12: false, hour: "numeric", minute: "numeric"});

        let novaMovimentacaoRecebida = {tipo: "transferencia-recebida", valor: valorTransferido, data: dataAtual, hora: horaAtual};
        contas[indexUsuarioRecebedorTransferencia].movimentacoes.push(novaMovimentacaoRecebida); 

        let novaMovimentacaoEnviada = {tipo: "transferencia-enviada", valor: valorTransferido * -1, data: dataAtual, hora: horaAtual};
        contas[indexUsuarioAtual].movimentacoes.push(novaMovimentacaoEnviada); 
        
        document.getElementById("transferencias-valor").value = "";    
        document.getElementById("transferencias-usuario").value = "select";  
        
        calculoSaldo ();     
        document.querySelectorAll(".saldo")[2].insertAdjacentHTML("afterbegin", '<p class="transferencia-efetuada">Transferência efetuada com sucesso!</p>');   
    }
 
});
 