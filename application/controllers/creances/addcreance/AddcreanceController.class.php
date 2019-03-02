<?php

class AddcreanceController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
    	
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $creance = new CreanceModel();
        $creance -> addCreance($_POST);
    }
}

?>