<?php

class SessionController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        
        $debt = new DebtModel();
        $creance = new CreanceModel();

        if(empty($_SESSION) == true){

            $http -> redirectTo('/');
        }

        //Récupération des entrées "debts" et "creances" de la BDD
                         
        $infosDebts = $debt -> showDebts();
        $infosCreances = $creance -> showCreances();
       
        //Récupération en Json du détail des dettes et créances

        if (isset($_GET['type'])){
            
            if ($_GET['type'] == 'debts'){

                $json = $debt -> getJsonDetails($_GET['type'],$_GET['id']);
            }
            else if ($_GET['type'] == 'creances'){

                $json = $creance -> getJsonDetails($_GET['type'],$_GET['id']);
            }

            $http -> sendJsonResponse($json);
        }

        
        return [
                    'infosCreances' => $infosCreances,
                    'infosDebts' => $infosDebts
                ];
         
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
       
        $ajaxpost = new AjaxpostModel();

        //Post en ajax des remboursements

        if ($_GET['target'] == 'reimbursement'){

            if ($_POST['type'] == 'debts'){
                $ajaxpost -> addReimbursementDebt($_POST['value'],$_POST['id']);
            }
            else if ($_POST['type'] == 'creances'){
                $ajaxpost -> addReimbursementCreance($_POST['value'],$_POST['id']);
            }
            $http -> sendJsonResponse($_POST['value']);
        }
        
        //Post en ajax du montant restant après remboursements

        if ($_GET['target'] == 'remaining_amount') {

            if ($_POST['type'] == 'debts'){
                $ajaxpost -> addRemainingAmountDebt($_POST['remainingAmount'],$_POST['id']);
            }
            else if ($_POST['type'] == 'creances'){
                $ajaxpost -> addRemainingAmountCreance($_POST['remainingAmount'],$_POST['id']);
            }
            $http -> sendJsonResponse (['remainingAmount' => $_POST['remainingAmount'],
                                        'id' => $_POST['id']
                                        ]);
        }
        

    }
}

?>