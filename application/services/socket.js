angular.module('ngSockets')
	.factory('socket',['$rootScope', function($rootScope){
		var socket = io.connect();
		return{
			on: function(evt, cb){
				socket.on(evt, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						callback.apply(socket, args);
					});
				});
			},
			emit: function(evt, data, cb){
				socket.emit(evt, data, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						if(cb){
							cb.apply(socket, args);
						}
					});
				});
			}
		}
	}]);