<?php

class CreanceModel{


//Ajouter une créance
public function addCreance($post){

    $data = new Database();
    $data -> executeSql('INSERT INTO creances (name,creation_date, deadline_date, initial_amount, remaining_amount, user_id)
                        VALUES (?,NOW(),?,?,?,?)',
                        [
                            $post['name'],
                            $post['deadline_date_year_creance'].'-'.$post['deadline_date_month_creance'].'-'.$post['deadline_date_day_creance'],
                            number_format($post['amount_creance'],2,'.',''),
                            number_format($post['amount_creance'],2,'.',''),
                            $_SESSION['id']
                        ]);

    $http = new Http();
    $http -> redirectTo('/session?id='.$_SESSION['id']);
}

//Supprimer une créance
public function deleteCreance($id){

    $data = new Database();
    $data -> executeSql('DELETE 
                        FROM creances
                        WHERE id = ? ',
                        [
                            $id
                        ]);

    $http = new Http();
    $http -> redirectTo('/session?id='.$_SESSION['id']);
}

//Afficher les créances
public function showCreances(){

    $data = new Database();
    $infosCreances = $data -> requestMulti('SELECT *
                                    FROM creances
                                    WHERE user_id = ?',
                                    [
                                        $_SESSION['id']

                                    ]);

    $total = $data -> requestOne('SELECT SUM(remaining_amount) as total
                                FROM creances
                                WHERE user_id = ?',
                                [
                                    $_SESSION['id']

                                ]);
    return ['infosCreances' => $infosCreances,
            'total' => $total];
}

public function getJsonDetails($type,$id){

    $data = new Database();
    $details = $data -> requestOne('SELECT *
                                    FROM creances
                                    WHERE id = ?',
                                    [
                                        $id

                                    ]);

    $detailsReimbursement = $data -> requestMulti('SELECT *
                                    FROM remboursement
                                    WHERE creance_id = ?',
                                    [
                                        $id
                                    ]);

    $remainingAmount = $data -> requestOne('SELECT initial_amount - SUM(amount) AS remainingAmount 
                                    FROM creances
                                    INNER JOIN remboursement
                                    ON creances.id  = remboursement.creance_id
                                    WHERE creance_id = ?',
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
