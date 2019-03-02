<?php

class UserModel{
 
    // Ajout d'un nouvel utilisateur avec cryptage du MDP
    public function addUser($post){

        $hash = $this -> hashPassword($post['password']);

        $data = new Database();
        $data -> executeSql('INSERT INTO users (pseudo,mail, password)
                            VALUES (?,?,?)',
                            [
                                $post['pseudo'],
                                $post['mail'],
                                $hash
                            ]);
        
        sleep(3); // attente pour affichage du message de félicitations

        $this -> logInUser($post);
           
    }

    // Connexion d'un utilisateur avec vérification du MDP crypté
    public function logInUser($post){

        
        $data = new Database();
        $infoUser = $data ->  requestOne('SELECT *
                            FROM users
                            WHERE mail = ?',
                            [
                                $post['mail']
                            ]);

        $validPassword = $this -> verifyPassword($post['password'],$infoUser['password']);
        
        
        if ($infoUser == true && $validPassword == true){

            $_SESSION['id'] = $infoUser['id']; 
            $_SESSION['avatar'] = $infoUser['avatar'];
            $_SESSION['pseudo'] = $infoUser['pseudo'];
            $_SESSION['mail'] = $infoUser['mail'];
            $_SESSION['passord'] = $infoUser['password'];
      
            $http = new Http();
            $http -> redirectTo('/session?id='.$_SESSION['id']);
            
        }
    

        if ($infoUser == false){
            return ['infoUser' => $infoUser];
        }
        else if ($validPassword == false){
            return ['validPassword' => $validPassword];   
        }
    }

    // Cryptage du MDP
    private function hashPassword($password){

        // le cost est à faire varier en fonction de la rapidité du serveur
        //http://php.net/manual/fr/function.password-hash.php     permet de vérifier quel cost est adapté à son serveur

        $options = [
            'cost' => 8,
        ];
        return password_hash($password, PASSWORD_BCRYPT, $options);
    }

    // Vérification du MDP crypté
    private function verifyPassword($password,$hash){
        
        return password_verify($password,$hash);
    }

}


?>