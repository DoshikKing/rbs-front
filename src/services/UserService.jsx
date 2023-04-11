import api from '../lib/Axios';

export function getListOfCards() {
    return api.get("/get/cards");
}

export function getListOfAccounts() {
    return api.get("/get/accounts");
}

export function getCardAbstract(code) {
    return api.get("get/card/abstract", {
        code: code
    });
}

export function getAccountAbstract(accountNumber) {
    return api.post("get/account/abstract", {
        code: accountNumber
    });
}

export function executeTransaction(from, to, amount, comment, type){
    if (type === "card"){
        return api.post("pay/with_card",{
            debit_id: from,
            credit_id: to,
            amount,
            comment
        });
    } else {
        return api.post("pay/with_account",{
            debit_id: from,
            credit_id: to,
            amount,
            comment
        });
    }
}