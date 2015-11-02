<script>
        var myapp = angular.module('myapp', []);
        myapp.controller('MyController',function($scope,$filter){
           $scope.items = {!lstAccount};
           $scope.account = {};
           $scope.account.Name ='';
           $scope.account.Phone ='';
           $scope.account.Website ='';
           $scope.account.Fax ='';
           $scope.account.Id ='';
           $scope.index='';
           
           // Create Account
           $scope.create= function(){
             if($scope.Name !== undefined &&  $scope.Phone !== undefined){
                var Fax = $scope.Fax !== undefined ? $scope.Fax : 'null';
                var Website = $scope.Website !== undefined ? $scope.Website : 'null';
                Visualforce.remoting.Manager.invokeAction(
                    'AngularJSDemoController.createAccount', 
                     $scope.Name,
                     $scope.Phone,
                     Fax,
                     Website,
                     function(result, event) {
                        if (event.status) {
                           var newAccount = {};
                           
                            // Add to list
                            newAccount.name = $scope.Name;
                            newAccount.Phone = $scope.Phone;
                            newAccount.Fax = $scope.Fax;
                            newAccount.Website = $scope.Website;
                            newAccount.id = result;
                            $scope.items.unshift(newAccount); 
                            
                            // Reset Insert form Value
                            $scope.Name = $scope.Phone = $scope.Fax = $scope.Website ='';
                            
                            $scope.$apply();
                            $('tr').eq(1).find('td').toggleClass( "bg-color");
                            setTimeout(function(){
                              $('tr').eq(1).find('td').toggleClass( "bg-color");
                            },3000)
                            // Back to first tab
                           $('#insertModal').modal('hide');
                            
                        } else if (event.type === 'exception') {
                            alert(event.message);
                        } else {
                            alert(event.message);
                        }
                    }     
                 ); 
              }else{
                  // Show Error
                  var msg ='';
                  if( $scope.Name === undefined){
                      msg +='Name is Required! \n';
                  }
                  if( $scope.Phone === undefined){
                      msg +='Phone is Required! \n';
                  }
                  alert(msg);
              }
           }
           
           // Delete Account
           $scope.delete = function(index,id,obj){
               ///$('.loadingDiv').hide();
                  $(obj).closest('tr').find('td').fadeOut(700);
                  setTimeout(function(){
                   $scope.items.splice($scope.items.indexOf(index),1);
                   $scope.$apply();
                   },900);
               Visualforce.remoting.Manager.invokeAction(
                     'AngularJSDemoController.deleteAccount', 
                     id,
                     function(result, event) {
                        if (event.status) {
                          
                          
                        } else if (event.type === 'exception') {
                            alert(event.message);
                        } else {
                            alert(event.message);
                        }
                    }     
                 ); 
                    
           }
           
           // Fill Value to Edit Form
           $scope.edit = function(index){
               $scope.index = index;
               var detail = $scope.items[$scope.items.indexOf($scope.index)];
               ///alert(JSON.stringify(detail));
               $scope.account.Name =detail.name;
               $scope.account.Phone = detail.Phone;
               $scope.account.Fax =detail.Fax;
               $scope.account.Website = detail.Website;
               $scope.account.Id = detail.id;
               $('#updateModal').modal('show');
           }
           // Update Account
            $scope.update = function(){
                if($scope.account.Name !== undefined &&  $scope.account.Phone !== undefined){
                    var Fax = $scope.account.Fax !== undefined ? $scope.account.Fax : 'null';
                    var Website = $scope.account.Website !== undefined ? $scope.account.Website : 'null';
                    Visualforce.remoting.Manager.invokeAction(
                         'AngularJSDemoController.updateAccount',
                         $scope.account.Id, 
                         $scope.account.Name,
                         $scope.account.Phone,
                         Fax,
                         Website,
                         function(result, event) {
                            if (event.status) {
                                $scope.items[$scope.items.indexOf($scope.index)].name = $scope.account.Name;
                                $scope.items[$scope.items.indexOf($scope.index)].Phone= $scope.account.Phone;
                                $scope.items[$scope.items.indexOf($scope.index)].Fax = $scope.account.Fax;
                                $scope.items[$scope.items.indexOf($scope.index)].Website = $scope.account.Website;
                                $scope.$apply();
                                $('#updateModal').modal('hide');
                            } else if (event.type === 'exception') {
                                alert(event.message);
                            } else {
                                alert(event.message);
                            }
                        }     
                     );
                 }else{
                      // Show Error
                      var msg ='';
                      if($scope.account.Name === undefined){
                          msg +='Name is Required! \n';
                      }
                      if($scope.account.Phone === undefined){
                          msg +='Phone is Required! \n';
                      }
                      alert(msg);
                  }
             }
        })
    </script>
