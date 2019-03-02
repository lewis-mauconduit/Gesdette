<?php

class RegisterController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
    
            if (empty($_POST['pseudo']) == false && empty($_POST['mail']) == false && empty($_POST['password']) == false){
                
                $user = new UserModel();
                $user -> addUser($_POST);
            }
    }
}

?>