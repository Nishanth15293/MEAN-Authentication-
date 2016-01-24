/**
 * Created by Nishanth on 1/16/2016.
 */
(function () {
    'use strict';
    angular.module('application')
        .factory('httpServiceInterceptor', httpServiceInterceptor);

    httpServiceInterceptor.$inject = ['$cookieStore', '$q', '$rootScope', '$injector'];

    function httpServiceInterceptor($cookieStore, $q, $rootScope, $injector) {
        return {
            request: requestInterceptor,
            requestError: requestErrorInterceptor,
            // response : responseInterceptor,
            responseError : responseErrorInterceptor
        };

        function requestInterceptor(httpConfigurationObject) {
            httpConfigurationObject.headers = httpConfigurationObject.headers || {};
            if ($cookieStore.get("token")) {
                httpConfigurationObject.headers.Authorization = 'Bearer ' + $cookieStore.get("token");
            }
            return httpConfigurationObject;
        }

        function requestErrorInterceptor(rejectionErrorObject) {
            console.log("From Request Error Interceptor");
            console.log(rejectionErrorObject);
            return $q.reject(rejectionErrorObject);
        }
        /*function responseInterceptor(responseObject) {
         console.log("From Interceptor Sending response");
         }*/
        function responseErrorInterceptor(rejectionErrorObject) {
            console.log("From Interceptor Repsonse Error");
            if (rejectionErrorObject.status === 401) {
                var $state = $injector.get('$state');
                $rootScope.loginError = "Sorry your session has expired. Please Log In to Continue";
                $cookieStore.remove("token");
                $rootScope.user = null;
                $state.go('loginSignUpPage');
            }
            return $q.reject(rejectionErrorObject);
        }
    }
})();