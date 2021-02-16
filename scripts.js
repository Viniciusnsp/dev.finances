const Modal = {
    openClose() {
        //Abrindo e fechando o modal
        //Toggle verifica se a classe já existe - Se existir remove e se não existir adiciona
      document.querySelector(".modal-overlay").classList.toggle("active");
    },
    closeError() {
        document.querySelector('.error').classList.remove('active-error');
    }
  }

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        }, 
    ]  ,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },
    incomes() {
        //Somar as entradas
        let income = 0
        //pegar todas as transações
        //para cada transação
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if(transaction.amount > 0) {
            //somar a variavel e retornar
            income += transaction.amount
            }
        })
        return income
        
    },
    expenses() {
        //Somar as saídas
        let expense = 0
        //Pegar todas as transações
        //para cada transação
        Transaction.all.forEach(transaction => {
            //Se ela for menor que zero
            if(transaction.amount < 0) {
                //somar as saídas
                expense += transaction.amount
            }
        })
        return expense
    },
    total() {
        //Remover das entradas o valor das saídas para ter o saldo
        //Diminuir as saídas das entradas
        return Transaction.incomes() + Transaction.expenses()
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
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },
    //Limpando as transações
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
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

const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),
    getValues() {
        return {
        description: Form.description.value,
        amount: Form.amount.value,
        date: Form.date.value
        }
    },
    formatData() {},

    validateField() {
        //desestruturando um objeto
        const {description, amount, date} = Form.getValues()
        
        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error('Por favor, preencha todos os campos!')
        }
        document.querySelector('.error').classList.remove('active-error')
    },
    submit(event) {
        event.preventDefault()
        try {
        //verificar se todos os campos foram preenchidos
        Form.validateField()
        //formatar os dados para salvar
        Form.formatData()
        //salvar
        //Limpar os dados do formulario
        //modal fecha
        //Atualizar a aplicação
        } catch (error) {
            document.querySelector('.error').classList.add('active-error')
        }
    }
}

const App = {
    init(){
        //Lendo cada elemento do array e executando uma funcionalidade
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

Transaction.add({
    description:'Comida',
    amount: 430,
    date: '23/01/2021'
})

Transaction.remove()
App.init()

