module.exports = function(grunt) {
	var continuousIntegrationMode = grunt.option('ci') || false;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		watch:{
			js:{
				files: [ 'src/js/*.js','test/specs/*.spec.js'],
				tasks: ['karma'],
				options: {
					spawn: false,
					livereload:true
				},
			},
		},
		jasmine : {
			test : {
				src : [ 
					'src/js/graphLib.js'
            		,'src/js/dependencyDetection.js'
				],
				options:{
					version:'2.0.0',
					vendor: [],
					helpers:[],
					specs : [
						'test/stubs/*.js',
						'test/*.spec.js'
					],
				},
			},
		},
		karma: {
            unit: {
	        	singleRun: true
	        },
			options: {
				configFile: 'karma.config.js',        
            }
        },
		connect: {
			server: {
				options: {
					hostname: "localhost",
					port: 8080,
					base: 'www-root'
				}
			}
		},
    });

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');  
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
    grunt.registerTask('default', 'Creating static content files....',function(){
    	grunt.task.run('karma')
	});
};