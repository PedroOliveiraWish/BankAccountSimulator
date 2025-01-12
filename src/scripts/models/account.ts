interface Account {
    id: number;
    name: string;
    balance: number;
}

interface Transaction {
    id: number;
    amount: number;
    type: "deposit" | "withdraw";
    date: Date;
}

let accounts: Account[] = []

let transactions: Transaction[] = []

export class AccountClass {
    id: number;
    name: string;
    cpf: string;
    balance: number;
    
    constructor(name:string, cpf: string, balance: number) {
        this.id = accounts.length + 1;
        this.name = name;
        this.cpf = cpf;
        this.balance = balance;
    }

    getName() {
        return this.name
    }

    getCpf() {
        return this.cpf
    }

    getBalance() {
        return this.balance;
    }

    newTransaction(amount: number, type: "deposit" | "withdraw"): void {
        let transaction: Transaction = {
            id: transactions.length + 1,
            amount: amount,
            type: type,
            date: new Date()
        }

        transactions.push(transaction);
    }

    deposit(amount: number): void {
        this.balance += amount;

        this.newTransaction(amount, "deposit");

        console.log(`Deposit is successful. New balance is ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log('Insufficient funds');
            return;
        }

        this.balance -= amount;

        this.newTransaction(-amount, "withdraw");

        console.log(`Withdraw is successful. Remaining balance is ${this.balance}`);
    }
}

export function getTransactions() {
    return transactions;
}