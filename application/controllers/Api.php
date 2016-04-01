<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Api extends REST_Controller {

    public $user;
    public $group_members_limit = 10000;

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('UserModel');
        $this->user = $this->UserModel->getUserInfo(100001498901118);
    }

    public function index(){

    }

    public function group_members_get(){
        try{
            $params = $this->input->get("params");
            $result = [];

            $group_ids = (array)$params["group_ids"];
//            $group_ids = [152456768273861, 239188916260047];
            foreach($group_ids as $group_id){
                if(!$group_id){
                    continue;
                }

                $next = true;
                $page = 1;
                while ($next){
                    $crawl_data = $this->_curl_groups($page, $group_id);
                    if(isset($crawl_data["data"]) && is_array($crawl_data["data"])){
                        $result = array_merge($result, $crawl_data["data"]);
                    }
                    $page++;
                    if(!isset($crawl_data["paging"]["next"])){
                        $next = false;
                    }
                    sleep(1);//1s
                }

                sleep(5);//1s
            }

            $this->response(["data" => $result], 200);
        }catch (\Exception $e){
            $this->response(NULL, 500);
        }
    }

    public function _curl_groups($page = 1, $group_id){
        $offset = ($page - 1) * $this->group_members_limit;

//        echo $url = "--url: https://graph.facebook.com/v2.3/{$group_id}/members";
//        echo '--offset: ' . $offset;
//        echo '--limit: ' . $this->group_members_limit;

        $data = $this->curl->simple_get("https://graph.facebook.com/v2.3/{$group_id}/members", [
            "offset" => $offset,
            "limit" => $this->group_members_limit,
            "access_token" => $this->user->user_access_token,
        ]);
        $result = json_decode($data,true);
        return $result;
    }
}