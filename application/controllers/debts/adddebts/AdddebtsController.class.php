<?php

class AdddebtsController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
    	
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $debt = new DebtModel();
        $number = $debt -> addDebt($_POST);

    }
}

?>