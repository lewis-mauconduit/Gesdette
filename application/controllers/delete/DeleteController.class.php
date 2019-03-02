<?php

class DeleteController

{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        if ($_GET['type'] == 'debts'){
            $debtModel = new DebtModel();
            $debtModel -> deleteDebt($_GET['id']);
        }
        else if ($_GET['type'] == 'creances'){
            $creanceModel = new CreanceModel();
            $creanceModel -> deleteCreance($_GET['id']);
        }
    }

    public function httpPostMethod(Http $http, array $formFields)
    {

    }
}

?>