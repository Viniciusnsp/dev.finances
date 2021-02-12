const Modal = {
    openClose() {
        //Abrindo e fechando o modal
        //Toggle verifica se a classe já existe - Se existir remove e se não existir adiciona
      document.querySelector(".modal-overlay").classList.toggle("active");
    }
  }

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    }, 
]  

const Transaction = {
    incomes() {
        //Somar as entradas
        return "R$ 5000,00"
        
    },
    expenses() {
        //Somar as saídas
        return "R$ 5000,00"
    },
    total() {
        //Remover das entradas o valor das saídas para ter o saldo
        return "R$ 5000,00"
    }
}

const DOM = {
    //Buscando o tbody pelo id - Container onde estão os tr's
    transactionsContainer: document.querySelector('#data-table tbody'),
    //Adicionando a transação, passando como paramentro e informando com o index onde ela deve ser colocada
    addTransaction(transaction, index) {
        //Criando o atributo tr
        const tr = document.createElement('tr')
        //Inserindo o html dentro da tag tr
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        //Adicionando um filho ao container
        DOM.transactionsContainer.appendChild(tr)

    },
    //Substituindo dados do HTML
    innerHTMLTransaction(transaction) {
        //Verificando se o valor de amount é positivo ou negativo
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação" />
            </td>
        `
        return html
    },
    //Atualizando os valores na tela
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Transaction.incomes()
        document.getElementById('expenseDisplay').innerHTML = Transaction.expenses()
        document.getElementById('totalDisplay').innerHTML = Transaction.total()
    }
}

const Utils = {
    //Formatando a moeda
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "" 
        //Template literal, /\D/ faz com que o replace troque tudo o que não for numero
        value = String(value).replace(/\D/, "" )
        //Dividindo o numero por 100 para poder usar as virgulas
        value = Number(value) / 100
        //toLocaleString para alterar a moeda para o estilo do Brasil
        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

DOM.updateBalance()

//Lendo cada elemento do array e executando uma funcionalidade
transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)

})

