/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2013 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */

function LocaleController($scope, $rootScope, $cookies, $http, messageService, localStorageService) {
  $scope.selectedLocale = $cookies.lang === undefined ? "en" : $cookies.lang;

  $scope.locales = ['en', 'es', 'fr', 'pt'];
  messageService.populate($scope.selectedLocale);

  $scope.changeLocale = function (localeKey) {
    $scope.selectedLocale = localeKey;
    $http.get('../messages/messages_' + $scope.selectedLocale + '.json').success(function (data) {
      for (var attr in data) {
        localStorageService.add('message.' + attr, data[attr]);
      }
      $rootScope.$broadcast('messagesPopulated');
    });
  };
}