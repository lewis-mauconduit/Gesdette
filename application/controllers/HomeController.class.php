<?php

class HomeController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
    	if(empty($_SESSION) == false){

          $http -> redirectTo('/session?id='.$_SESSION['id']);
		}
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
      $user = new UserModel();
      $info = $user -> logInUser($_POST);

      return ['info' => $info];
    
    }
}

?>