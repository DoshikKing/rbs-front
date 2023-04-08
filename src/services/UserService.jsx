import api from '../lib/Axios';

export function getListOfCards() {
    return api.get("/gat/cards");
}

export function getListOfAccounts() {
    return api.get("/get/accounts");
}

export function getCardAbstract(path) {
    return api.get("abstract/card/" + path);
}

export function getAccountAbstract(path) {
    return api.get("abstract/account/" + path);
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