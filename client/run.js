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
            var decoded = jwt_decode($cookies.get('token'));
            console.log("decoded :");
            console.log(decoded);

            $rootScope.user = decoded._doc;
            console.log($rootScope.user);


           // basicServiceFactory.setUser($rootScope.user);
        }else{
            console.log("no token");
        }
    }

})();