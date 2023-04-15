import api from '../lib/Axios';

export function getListOfCards() {
    return api.get("get/cards");
}

export function getListOfAccounts() {
    return api.get("get/accounts");
}

export function getListOfBillings() {
    return api.get("get/billings");
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

export function transferFromAccountToCard(from, to, amount, comment, debitBank, creditBank){
    return api.post("transfer/from/account/to/card",{
        debit: from,
        credit: to,
        amount,
        debitBank,
        creditBank,
        comment
    });    
}

export function transferFromCardToCard(from, to, amount, comment, debitBank, creditBank){
    return api.post("transfer/from/card/to/card",{
        debit: from,
        credit: to,
        amount,
        debitBank,
        creditBank,
        comment
    });   
}

export function transferFromCardToAccount(from, to, amount, comment, debitBank, creditBank){
    return api.post("transfer/from/card/to/account",{
        debit: from,
        credit: to,
        amount,
        debitBank,
        creditBank,
        comment
    });   
}

export function transferFromAccountToAccount(from, to, amount, comment, debitBank, creditBank){
    return api.post("transfer/from/account/to/account",{
        debit: from,
        credit: to,
        amount,
        debitBank,
        creditBank,
        comment
    });   
}