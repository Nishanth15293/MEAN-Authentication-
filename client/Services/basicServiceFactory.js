/**
 * Created by Nishanth on 1/16/2016.
 */
(function () {
    'use strict';

    angular.module('application')
        .service('basicServiceFactory', basicServiceFactory);

    basicServiceFactory.$inject = [
        '$q',
        '$http',
        '$cookieStore',
        '$rootScope'
    ];

    function basicServiceFactory($q, $http, $cookieStore, $rootScope) {
        var user;
        return {
         //  getUser: getUser,
          //  setUser: setUser,
            login : login,
            logout : logout
        };
       /* function setUser(uzer) {
            user = uzer;
        }
        function getUser () {
            return user;
        }*/
       function login (url,payload){
            return $http.post(url,payload).then(function(response){
                if(response.data.errorMessage){
                    return response.data;
                }
                else{
                    $cookieStore.put("token",response.data.token);
                    console.log(response.data);
                    $rootScope.user = jwt_decode(response.data.token);
                    return "success";
                }
            })
        }

        function logout() {
            $rootScope.user = null;
            var defer = $q.defer();
            $cookieStore.remove("token");
            $rootScope.typeOfLogin = null;
            defer.resolve();
            return defer.promise;
        }

    }
})();