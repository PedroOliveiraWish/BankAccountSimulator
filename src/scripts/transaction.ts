import { AccountClass, getTransactions } from "./models/account.js";

document.addEventListener('DOMContentLoaded', () => {
    const account = new AccountClass("Account 1", "35499675216", 1200);

    // get the name and balance elements from the DOM
    const accountName = document.getElementById('holderName')!;
    const accountBalance = document.getElementById('accountBalance')!;

    // function to update the account balance in the DOM
    function updateBalance(balance: number) {
        accountBalance.innerHTML = ` R$ ${balance.toFixed(2)}`;
    }

    // Verify if the elements exists in the DOM
    if (accountName && accountBalance) {
        accountName.innerHTML = account.getName()
        updateBalance(account.getBalance());
    }

    // get the transaction form element from the DOM
    const transactionForm = document.getElementById('transactionForm');

    // Verify if the element exists in the DOM
    if (transactionForm) {
        // add an event listener to the form to handle the submit event
        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // First, we must take the input on the form
            const transactionInput = document.querySelector<HTMLInputElement>('input#transactionAmount');

            // After we verify that the element is not null
            if (transactionInput) {
                // We get the value of the input
                const transactionAmount = parseFloat(transactionInput.value);

                // We verify if the value is a number
                if (!isNaN(transactionAmount)) {
                    // We create a new transaction
                    account.deposit(transactionAmount)

                    // We update the balance
                    updateBalance(account.getBalance());

                    updateTransactions()

                    clearForm()
                }
            }
        })
    }

    // Get the withdraw button element from the DOM
    const transactionWithdrawButton = document.querySelector<HTMLButtonElement>('button#withdrawButton')

    // Verify if the element exists in the DOM
    if (transactionWithdrawButton) {
        // Add an event listener to the button to handle the click event
        transactionWithdrawButton.addEventListener('click', () => {
            const transactionInput = document.querySelector<HTMLInputElement>('input#transactionAmount')

            if (transactionInput) {
                const transactionAmount = parseFloat(transactionInput.value)

                if (!isNaN(transactionAmount)) {
                    account.withdraw(transactionAmount)

                    updateBalance(account.getBalance());

                    updateTransactions()

                    clearForm()
                }
            }
        })

    }

    function updateTransactions() {
        // Get the transaction history element from the DOM
        const transactionHistory = document.querySelector<HTMLDivElement>('div#transactions')

        if (transactionHistory) {
            transactionHistory.innerHTML = ""
            // Create an ul element
            const transactionHistoryList = document.createElement('ul')
            transactionHistoryList.classList.add('transaction-list');

            // Check if the account has transactions
            if (getTransactions().length > 0) {
                // If has, we iterate over the transactions and create a list item for each one
                getTransactions().forEach((transaction) => {
                    const transactionItem = document.createElement('li');
                    transactionItem.textContent = `${transaction.id}.  ${transaction.type} transaction: R$${transaction.amount.toFixed(2)} on ${new Date(transaction.date).toLocaleString()}`;

                    transactionHistoryList.appendChild(transactionItem);
                });
            } else {
                // if hasn't, we show a message
                transactionHistory.innerHTML = 'No transactions yet'
            }

            // Add the list to the transaction history element
            transactionHistory.appendChild(transactionHistoryList)
        }
    }

    function clearForm() {
        const transactionInput = document.querySelector<HTMLInputElement>('input#transactionAmount')

        if (transactionInput) {
            transactionInput.value = '';
        }
    }

    updateTransactions()
});