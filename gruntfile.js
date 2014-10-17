module.exports = function(grunt){
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		uglify: {

		},
		cssmin: {

		},
		concurrent:{
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default',['cssmin','uglify','concurrent']);
};