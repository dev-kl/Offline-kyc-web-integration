"use strict";

angular.module("myApp").controller('HomeController', function ($scope, $http, $rootScope) {


    /*Client code provided by khosla-labs at the time of on-boarding*/
    $scope.clientCode = "";
     /*api-key provided by khosla-labs at the time of on-boarding*/
    $scope.apiKey = "";
     /* Salt provided by khosla-labs at the time of on-boarding */
    $scope.salt = "";
     /* System trace no unique for each request */
    $scope.stan = new Date().getTime();
    /* Request ID unique for each request */
    $scope.requestId = new Date().getTime();
    /* Redirect callback URL where you want to redirect after KYC is completed*/
    $scope.redirectUrl = "https://sandbox.veri5digital.com/dummy-app/#/fetch";
    $scope.purpose = "OnBoarding";
    $scope.email = "";
    $scope.mobile = "";
    /* OTP Required will be "Y" or "N" */
    $scope.otpRequired = "";

 /*Code to calculate hash using SHA256 Algorithm for initiate SDK*/

    $scope.hash = Sha256.hash($scope.clientCode + "|" + $scope.requestId + "|" + $scope.apiKey + "|" + $scope.salt);

    $scope.calculateHash = function () {
        $scope.hash = Sha256.hash($scope.clientCode + "|" + $scope.requestId + "|" + $scope.apiKey + "|" + $scope.salt);
    }

    $scope.message = "Welcome to AadhaarBridge Offline eKYC Demo";

})

/* API call for Fetch KYC data */

angular.module("myApp").controller('FetchController', function ($scope, $http, $rootScope, $location) {
    $scope.init = function () {
        $scope.uuid = $location.search().uuid;
        $scope.status = $location.search().status;
        $scope.receivedHash = $location.search().hash;
        $scope.clientCode = "";
        $scope.apiKey = "";
        $scope.salt = "";
        $scope.requestId = $location.search().requestId;

        /*Code to calculate hash using SHA256 Algorithm for fetch KYC data*/

        $scope.calculateHash = function () {
            $scope.hash = Sha256.hash($scope.clientCode + "|" + $scope.uuid + "|" + $scope.apiKey + "|" + $scope.salt);
        }

        $scope.message = "Welcome to AadhaarBridge Offline eKYC Demo";


        $scope.fetchKYC = function () {

            $scope.calculateHash();

            var request = {
                "client_code": $scope.clientCode,
                "uuid": $scope.uuid,
                "hash": $scope.hash,
                "api_key": $scope.apiKey
            };
            $http({
                method: "POST",
                url: "https://sandbox.veri5digital.com/video-id-kyc/_fetch",
                data: request
            })
                .success(svcSuccessHandler)

                .error(svcErrorHandler);
        }



        var svcSuccessHandler = function (data, status, headers, config) {

            var kycData = JSON.parse(atob(data["response_data"]["kyc_info"]));
            $scope.kycInfo = atob(data["response_data"]["kyc_info"]);

            $scope.name = kycData["name"];
            $scope.nameStatus = kycData["name_status"];
            $scope.nameDescription = kycData["name_description"];
            $scope.email = kycData["email"];
            $scope.emailStatus = kycData["email_status"];
            $scope.emailDescription = kycData["email_description"];
            $scope.dob = kycData["dob"];
            $scope.dobStatus = kycData["dob_status"];
            $scope.dobDescription = kycData["dob_description"];
            $scope.mobile = kycData["mobile"];
            $scope.mobileStatus = kycData["mobile_status"];
            $scope.mobileDescription = kycData["mobile_description"];
            $scope.gender = kycData["gender"];
            $scope.genderStatus = kycData["gender_status"];
            $scope.genderDescription = kycData["gender_description"];
            $scope.address = kycData["address"];
            $scope.addressStatus = kycData["address_status"];
            $scope.addressDescription = kycData["address_description"];
            $scope.photo = kycData["photo"];
            $scope.photoStatus = kycData["photo_status"];
            $scope.photoDescription = kycData["photo_description"];
            $scope.documentId = kycData["document_id"];
        }

        var svcErrorHandler = function (data, status, headers, config) {

        }

    }
})

