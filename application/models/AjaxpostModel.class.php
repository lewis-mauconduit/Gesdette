<?php


class AjaxpostModel{

    /*******************DEBTS******************/
    public function addReimbursementDebt($value,$dette_id){
        $data = new Database ();
        $data -> executeSql('INSERT INTO remboursement (creation_date_remboursement, amount, dette_id, user_id)
                            VALUES (NOW(),?,?,?)',
                            [
                                number_format($value,2,'.',''),
                                $dette_id,
                                $_SESSION['id']
                            ]);
        
    }

    public function addRemainingAmountDebt($total,$dette_id){
        $data = new Database ();
        $data -> executeSql('UPDATE debts
                            SET remaining_amount = ?
                            WHERE id = ?',
                            [
                                number_format($total,2,'.',''),
                                $dette_id
                            ]);
        
    }
    
    /*******************CREANCES*****************/
    public function addReimbursementCreance($value, $creance_id){
        $data = new Database ();
        $data -> executeSql('INSERT INTO remboursement (creation_date_remboursement,amount,creance_id,user_id)
                            VALUES (NOW(),?,?,?)',
                            [
                                number_format($value,2,'.',''),
                                $creance_id,
                                $_SESSION['id']
                            ]);
    }
    
    public function addRemainingAmountCreance($total,$creance_id){
        $data = new Database ();
        $data -> executeSql('UPDATE creances
                            SET remaining_amount = ?
                            WHERE id = ?',
                            [
                                number_format($total,2,'.',''),
                                $creance_id
                            ]);
        
    }

}


?>