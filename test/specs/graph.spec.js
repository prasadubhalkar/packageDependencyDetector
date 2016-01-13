/**
 * [Jasmine Unit test cases for dependency detector]
 */
describe('dependency detector', function(){
	it('input empty array',function(){
		var emptyArray = [];
		var returnVal = packageDependencies.getInstallationOrder(emptyArray);
		expect(returnVal).toEqual(-1);
	});

	it('input as not an array but a JS object',function(){
		var emptyObject = {};
		var returnVal = packageDependencies.getInstallationOrder(emptyObject);
		expect(returnVal).toEqual(-1);
	});

	it('input as not an array but a JS variable',function(){
		var undefinedObject;
		var returnVal = packageDependencies.getInstallationOrder(undefinedObject);
		expect(returnVal).toEqual(-1);
	});

	it('input with single packages',function(){
		var singlePackageArray = [ "CamelCaser:" ];
		var returnVal = packageDependencies.getInstallationOrder(singlePackageArray);
		expect(returnVal).toEqual(["CamelCaser"]);
	});

	it('single packages without colon should fail',function(){
		var singlePackageArray = [ "CamelCaser" ];
		var returnVal = packageDependencies.getInstallationOrder(singlePackageArray);
		expect(returnVal).toEqual(-1);
	});

	it('couple of packages without colon',function(){
		var singlePackageArray = [ "KittenService CamelCaser" ];
		var returnVal = packageDependencies.getInstallationOrder(singlePackageArray);
		expect(returnVal).toEqual(-1);
	});

	it('couple of packages with only colon',function(){
		var invalidPackageArray = [ ":" ];
		var returnVal = packageDependencies.getInstallationOrder(invalidPackageArray);
		expect(returnVal).toEqual(-1);
	});

	it('couple of packages with colon and numbers',function(){
		var validPackageArray = ["1:2","2:"];
		var returnVal = packageDependencies.getInstallationOrder(validPackageArray);
		expect(returnVal).toEqual(["2","1"]);
	});

	it('couple of packages with colon invalid input',function(){
		var singlePackageArray = ["KittenService:CamelCaser"];
		var returnVal = packageDependencies.getInstallationOrder(singlePackageArray);
		expect(returnVal).toEqual(-1);
	});

	it('couple of packages with colon',function(){
		var singlePackageArray = [ "KittenService:CamelCaser", "CamelCaser:" ];
		var returnVal = packageDependencies.getInstallationOrder(singlePackageArray);
		expect(returnVal).toEqual(["CamelCaser","KittenService"]);
	});

	it('valid list of package should give valid output',function(){
		var validListOfPackages = [
		  "KittenService:",
		  "Leetmeme:Cyberportal",
		  "Cyberportal:Ice",
		  "CamelCaser:KittenService",
		  "Fraudstream:Leetmeme",
		  "Ice:"
		];
		var returnVal = packageDependencies.getInstallationOrder(validListOfPackages);
		expect(returnVal).toEqual(["KittenService", "Ice", "Leetmeme", "Cyberportal", "CamelCaser", "Fraudstream"]);
	});

	it('valid list of package with cycle should flag it as invalid input',function(){
		var invalidListOfPackages = [
		  "KittenService:",
		  "Leetmeme:Cyberportal",
		  "Cyberportal:Ice",
		  "CamelCaser:KittenService", 
		  "Fraudstream:",
		  "Ice:Leetmeme"
		];
		var returnVal = packageDependencies.getInstallationOrder(invalidListOfPackages);
		expect(returnVal).toEqual(-1);
	});
});