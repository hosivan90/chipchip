<?php

class UserModel extends CI_Model
{
    public $user;

    public function __construct()
    {
        // Call the CI_Model constructor
        parent::__construct();
    }
    
    public function getUserInfo($uid){
        if(!$uid){
            return false;
        }

        if($this->user){
            return $this->user;
        }

        $query = $this->db->query("SELECT * FROM users WHERE uid = {$uid} LIMIT 1");
        $this->user = $query->row(0);
        return $this->user;
    }
}