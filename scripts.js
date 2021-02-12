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
        
    },
    expenses() {
        //Somar as saídas
    },
    total() {
        //Remover das entradas o valor das saídas para ter o saldo
    }
}

