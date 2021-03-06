app.controller('activeStationsController', function($scope, $timeout,  APIFactory, $rootScope, $route, $location) {

        $scope.showGeo = false;
        $scope.showGenre = false;
        $scope.showOwnership = false;
        $scope.showMe = false;
        $scope.showicon1 = true;
        $scope.showicon2 = false;
        $scope.showicon3 = false;
        $scope.showicon4 = true;
        $scope.showicon5 = false;
        $scope.showicon6 = true;

        $scope.selectedGenres = [];
        $scope.selectedOwnership = [];
        $scope.selectedGeo = [];

        $scope.selectedGenreData = [];

        $scope.selectedTypeData = [];

        $scope.selectedStateData = [];

        $scope.userEnteredPending = false;


        $scope.addGenre = function (genre){

          var found = false;

          if($scope.selectedGenreData.length == $scope.genreArray.length){
            $scope.selectedGenreData = [];
            $scope.selectedGenreData.push(genre);
          } else {
            var count = $scope.selectedGenreData.length;
            var found2 = false
            for(var i = 0; i < $scope.selectedGenreData.length; i++){
              //removing the object
              if($scope.selectedGenreData[i] == genre){
                //if the count is dropping to 0, then refill with the orginal
                if(count == 1){
                  $scope.selectedGenreData = $scope.genreArray;
                  found2 = true;
                } else {
                  $scope.selectedGenreData.splice(i,1);
                  found2 = true;
                }
              }
            }
            if(found2 == false){
              $scope.selectedGenreData.push(genre);
            }
          }
        };

        $scope.addGeo = function (geo){
          var found = false;

          if($scope.selectedStateData.length == $scope.stateArray.length){
            $scope.selectedStateData = [];
            $scope.selectedStateData.push(geo);
          } else {
            var count = $scope.selectedStateData.length;
            for(var i = 0; i < $scope.selectedStateData.length; i++){
              //removing the object
              var found2 = false
              if($scope.selectedStateData[i] == geo){
                //if the count is dropping to 0, then refill with the orginal
                if(count == 1){
                  $scope.selectedStateData = $scope.stateArray;
                  found2 = true;
                } else {
                  $scope.selectedStateData.splice(i,1);
                  found2 = true;
                }
              }
            }
            if(found2 == false){
              $scope.selectedStateData.push(geo);
            }
          }
        };


        $scope.addOwnership = function (ownership){
          var found = false;

          if($scope.selectedTypeData.length == $scope.typeArray.length){
            $scope.selectedTypeData = [];
            $scope.selectedTypeData.push(ownership);
          } else {
            var count = $scope.selectedTypeData.length;
            for(var i = 0; i < $scope.selectedTypeData.length; i++){
              //removing the object
              var found2 = false
              if($scope.selectedTypeData[i] == ownership){
                //if the count is dropping to 0, then refill with the orginal
                if(count == 1){
                  $scope.selectedTypeData = $scope.typeArray;
                  found2 = true;
                }  else {
                  $scope.selectedTypeData.splice(i,1);
                  found2 = true;
                }
              }
            }
            if(found2 == false){
              $scope.selectedTypeData.push(ownership);
            }
          }
        };

        $scope.showActive = true;
        $scope.showPending = false;
        $scope.showDeleted = false;

        $scope.addStation = false;

        $scope.orderBySearch = '';
        $scope.orderByTerm = true;

        $scope.myFun = function(){
          $scope.showMe = !$scope.showMe;
        }

        $scope.showActiveFunc = function(){
          $scope.showActive = true;
          $scope.showPending = false;
          $scope.showDeleted = false;
        }

        $scope.showPendingFunc = function(){
          $scope.showActive = false;
          $scope.showPending = true;
          $scope.showDeleted = false;
        }

        $scope.showDeletedFunc = function(){
          $scope.showActive = false;
          $scope.showPending = false;
          $scope.showDeleted = true;
        }

        $scope.showAddStation = function(){
          $scope.addStation = !$scope.addStation;
        }

        $scope.sortMethod = function(name){
          if($scope.orderBySearch == name){
            $scope.orderByTerm = !$scope.orderByTerm;
          } else {
            $scope.orderBySearch = name;
            $scope.orderByTerm = false;
          }
        }

        $scope.myFuncGeographical = function(){
          $scope.showGeo = !$scope.showGeo;
          $scope.showicon1 = !$scope.showicon1;
          $scope.showicon2 = !$scope.showicon2;
        }

        $scope.myFuncGenre = function(){
          $scope.showGenre = !$scope.showGenre;
          $scope.showicon5 = !$scope.showicon5;
          $scope.showicon6 = !$scope.showicon6;
        }

        $scope.myFuncOwnership = function(){
          $scope.showOwnership = !$scope.showOwnership;
          $scope.showicon3 = !$scope.showicon3;
          $scope.showicon4 = !$scope.showicon4;
        }

        APIFactory.getAllStations().then(function (response){
            $scope.allActiveStations = response.data.active;
            $scope.activeStations = response.data.active;

            for(var i = 0; i < $scope.activeStations.length; i++){
                $scope.activeStations[i].edit = true;
            }
        });

        $scope.editMode = false;

        $scope.editStation = function(id){
          for(var i = 0; i < $scope.activeStations.length; i++){
            if($scope.activeStations[i].id == id){
              $scope.activeStations[i].edit = false;
              $scope.editMode = true;
            }
          }
         }

         $scope.savedGenreData;
         $scope.savedTypeData;
         $scope.savedStateData;



        APIFactory.getUserEnteredPendingInformation().then(function (response){
          var data = response.data.user_entered_pending;

          if(data.length   > 0){
            $scope.length = data.length;
            $scope.userEnteredPending = true;
            setTimeout(stopShowingInformation, 5000);
          }

        });

        function stopShowingInformation(){
             $scope.userEnteredPending = false;
             $scope.$apply();
        }


        APIFactory.getInformation().then(function (response){

            $scope.typeArray = [];
            $scope.stateArray = [];
            $scope.genreArray = [];

            $scope.yyy = [];
            for (var i = 0; i < response.data.types.length; i++){
              if(response.data.types[i].type != ""){
                if(i == 0){
                  $scope.yyy.push(response.data.types[i].type);
                  $scope.typeArray.push(response.data.types[i].type);
                  $scope.selectedTypeData.push(response.data.types[i].type);

                } else {
                  var same = false;
                  for (var j = 0; j < $scope.yyy.length; j++){
                    if($scope.yyy[j] === response.data.types[i].type){
                      same = true;
                    }
                  }
                  if(same == false ){
                    $scope.yyy.push(response.data.types[i].type);
                    $scope.typeArray.push(response.data.types[i].type);
                    $scope.selectedTypeData.push(response.data.types[i].type);
                  }
                }
              }
            }

            for(var i = 0; i < $scope.typeArray.length; i++){
              $scope.typeArray[i].isClicked = true;
            }

            $scope.xxx = [];

            for (var i = 0; i < response.data.genre.length; i++){
              if(response.data.genre[i].genre != ""){
                if(i == 0){
                  $scope.xxx.push(response.data.genre[i].genre);
                  $scope.selectedGenreData.push(response.data.genre[i].genre);
                  $scope.genreArray.push(response.data.genre[i].genre);
                } else {
                  var same = false;
                  for (var j = 0; j < $scope.xxx.length; j++){
                    if($scope.xxx[j] === response.data.genre[i].genre){
                      same = true;
                    }
                  }
                  if(same == false ){
                    $scope.xxx.push(response.data.genre[i].genre);
                    $scope.selectedGenreData.push(response.data.genre[i].genre);
                    $scope.genreArray.push(response.data.genre[i].genre);
                  }
                }
              }
            }



            for(var i = 0; i < $scope.genreArray.length; i++){
              $scope.genreArray[i].isClicked = true;
            }

            $scope.zzz = [];

            for (var i = 0; i < response.data.states.length; i++){
              if(response.data.states[i].state != ""){
                if(i == 0){
                  $scope.zzz.push(response.data.states[i].state);
                  $scope.stateArray.push(response.data.states[i].state);
                  $scope.selectedStateData.push(response.data.states[i].state);
                } else {
                  var same = false;
                  for (var j = 0; j < $scope.zzz.length; j++){
                    if($scope.zzz[j] === response.data.states[i].state){
                      same = true;
                    }
                  }
                  if(same == false ){
                    $scope.zzz.push(response.data.states[i].state);
                    $scope.stateArray.push(response.data.states[i].state);
                    $scope.selectedStateData.push(response.data.states[i].state);
                  }
                }
              }
            }

            for(var i = 0; i < $scope.stateArray.length; i++){
              $scope.stateArray[i].isClicked = true;
            }

        });

        $scope.updateStation = function(station){
          station.active = 1;
          station.delete = 0;
          station.user_entered = 0;
          for(var i = 0; i < $scope.activeStations.length; i++){
            if($scope.activeStations[i].id == station.id){
              $scope.activeStations[i].edit = true;
              $scope.editMode = false;
            }
          }


          var slogan = station.slogan;
          var startSlogan = slogan.startsWith('"') || slogan.startsWith("'");
          var endSlogan = slogan.endsWith('"') || slogan.endsWith("'");
          if(startSlogan == true){
            slogan = slogan.substring(1);
          }
          if(endSlogan == true){
            slogan = slogan.substring(0, slogan.length - 1);
          }
          station.slogan = slogan;

          APIFactory.editStation(station).then(function (response){
              //todo FIX DATA
          }, function (error){

          });
          $route.reload();
        }

        $scope.deleteStation = function(id) {

          var txt;

            if (confirm("Do you want to delete this station") == true) {
              for(var i = 0; i < $scope.activeStations.length; i++){
                if($scope.activeStations[i].id == id){
                  var station = $scope.activeStations[i];
                  station.delete = 1;
                  station.active = 0;
                  station.user_entered = 0;
                  $scope.activeStations.splice(i,1);
                  APIFactory.editStation(station).then(function (response){
                      //todo fix data
                  }, function(error){

                  });
                }
              }
              $route.reload();

            } else {

            }

        };

        $scope.pendingStation = function(id) {

          var txt;

            if (confirm("Do you want to change this station to pending") == true) {
              for(var i = 0; i < $scope.activeStations.length; i++){
                if($scope.activeStations[i].id == id){
                  var station = $scope.activeStations[i];
                  station.delete = 0;
                  station.active = 0;
                  station.user_entered = 0;
                  $scope.activeStations.splice(i,1);
                  APIFactory.editStation(station).then(function (response){
                    //todo fix data
                    console.log(response);
                  }, function (error){

                  });
                }
              }
              $route.reload();
            } else {

            }

        };



        $scope.createActiveStation = function(station){

          //todo: validate DATA!!!!!
          station.delete = 0;
          station.active = 1;
          station.user_entered = 0;
          APIFactory.createStation(station).then(function (response){
              console.log(response.data.stations[0]);
              $scope.createNewStation = "";
              $scope.addStation = false;
              $scope.activeStations.push(response.data.stations[0]);
              window.alert("Station Added");
              $route.reload();


          }, function (error){
                //todo... fix data
          });
        }

});
