interface ITransaction {
    validarTransaction (transaction:number):boolean,
    getTransaction ():number,
    setTransaction (transaction:number):void,
}
// Language: typescript
// Path: src\db\models\ITransaction.ts
export default ITransaction;
