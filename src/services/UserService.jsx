import api from '../lib/Axios';

export function getListOfCards() {
    return api.get("get/cards");
}

export function getListOfAccounts() {
    return api.get("get/accounts");
}

export function getCardAbstract(id) {
    return api.post("get/card/abstract", {
        id: id
    });
}

export function getAccountAbstract(id) {
    return api.post("get/account/abstract", {
        id: id
    });
}

export function executeTransaction(from, to, amount, comment, type, debitBank, creditBank){
    if (type === "card"){
        return api.post("transfer/from/account/to/card",{
            debit: from,
            credit: to,
            amount,
            debitBank,
            creditBank,
            comment
        });
    }
    if(type === "account") {
        return api.post("transfer/from/account/to/account",{
            debit: from,
            credit: to,
            amount,
            debitBank,
            creditBank,
            comment
        });
    }
}