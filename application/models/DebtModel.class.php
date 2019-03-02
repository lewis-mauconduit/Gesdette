<?php

class DebtModel{

    //Ajouter une dette
    public function addDebt($post){

        $data = new Database();
        $data -> executeSql('INSERT INTO debts (name,creation_date, deadline_date, initial_amount, remaining_amount, user_id)
                            VALUES (?,NOW(),?,?,?,?)',
                            [
                                $post['name'],
                                $post['deadline_date_year_debt'].'-'.$post['deadline_date_month_debt'].'-'.$post['deadline_date_day_debt'],
                                number_format($post['amount_debt'],2,'.',''),
                                number_format($post['amount_debt'],2,'.',''),
                                $_SESSION['id']
                            ]);

        $http = new Http();
        $http -> redirectTo('/session?id='.$_SESSION['id']);
    }

    //Supprimer une dette
    public function deleteDebt($id){

        $data = new Database();
        $data -> executeSql('DELETE 
                            FROM debts
                            WHERE id = ? ',
                            [
                                $id
                            ]);

        $http = new Http();
        $http -> redirectTo('/session?id='.$_SESSION['id']);
    }
    
    //Afficher les dettes
    public function showDebts(){

        $data = new Database();
        $infosDebts = $data -> requestMulti('SELECT *
                                        FROM debts
                                        WHERE user_id = ?',
                                        [
                                            $_SESSION['id']

                                        ]);
                    
        $total = $data -> requestOne('SELECT SUM(remaining_amount) as total
                                    FROM debts
                                    WHERE user_id = ?',
                                    [
                                        $_SESSION['id']

                                    ]);
        return ['infosDebts' => $infosDebts,
                'total' => $total];
                
    }
    public function getJsonDetails($type,$id){

        $data = new Database();

        $details = $data -> requestOne('SELECT *
                                    FROM debts
                                    WHERE id = ?',
                                    [
                                        $id
                                    ]);

        $detailsReimbursement = $data -> requestMulti('SELECT *
                                    FROM remboursement
                                    WHERE dette_id = ?',
                                    [
                                        $id
                                    ]);

        $remainingAmount = $data -> requestOne('SELECT initial_amount - SUM(amount) AS remainingAmount
                                    FROM debts
                                    INNER JOIN remboursement
                                    ON debts.id  = remboursement.dette_id
                                    WHERE dette_id = ?',
                                    [
                                        $id
                                    ]);
        if ($detailsReimbursement == false){
            return ['details'=> $details,
                    'remainingAmount' => $remainingAmount
                    ];
        }
        else {
            return ['details'=> $details,
                    'detailsReimbursement'=> $detailsReimbursement,
                    'remainingAmount' => $remainingAmount
                    ];//cas où il n'y a pas encore de remboursement
        }
    }

    
}

?>