/**
 * Created by Nishanth on 1/16/2016.
 */
(function(){
    'use strict';

    angular.module('application')
        .run(run);

    run.$inject = ['$rootScope', '$cookies', 'basicServiceFactory'];

    function run($rootScope, $cookies, basicServiceFactory){
        if($cookies.get('token')){
            $rootScope.user = jwt_decode($cookies.get('token'));

           // basicServiceFactory.setUser($rootScope.user);
        }else{
            console.log("no token");
        }
    }

})();