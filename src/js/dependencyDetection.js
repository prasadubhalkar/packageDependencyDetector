/**
 * [packageDependencies is a namespace/package which will return a function that calculates installation order]
 * @param  {undefined}  [undefined]
 * @return {Object}     [list of functions]
 */
var packageDependencies = (function(){
  /**
   * [displayOrder will calulate the display order of the package list input]
   * @param  {[Array]} packageList [List of packages]
   * @return {Object}              [Either -1 for invalid input or list of installation order]
   */
  function displayOrder(packageList) {
    if(_checkInputValidity(packageList)) {
      
      var graph = _constructGraph(packageList);
      if(graph != -1) {
        return graph.traverseDepthFirst();  
      } else {
        return graph;
      }
    } else {
      return -1;
    }
  }

  /**
   * [_checkInputValidity private function checks for input package list if its valid]
   * @param  {Array} inputList [List of input packages]
   * @return {Boolean}           [True if valid / false if invalid]
   */
  function _checkInputValidity(inputList) {
    if(typeof inputList === "object" && inputList.hasOwnProperty("length")) {
      if(inputList.length > 0){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * [_constructGraph private function will scan the given input package list and create a graph]
   * @param  {Array} packageList [Input package list]
   * @return {Object}             [-1 for invalid input and graph for valid input]
   */
  function _constructGraph(packageList) {
    var listLength  = 0, 
        packages    = [],
        currPackage = "",
        graph       = new Graph.packageGraph();

    listLength = packageList.length;

    for (var i = 0; i < listLength; i++) {
      //check for colon inside input
      if(packageList[i].indexOf(":") > 0) {

        packages = packageList[i].split(":");
        if(packages.length > 0) {
          for (var j = 0; j < packages.length; j++) {
            if(j === 0){
              currPackage = packages[j];
              graph.setNode(currPackage);
            } else {
              if(packages[j] !== "") {
                graph.addNodeData(currPackage,packages[j].trim());
              }
            }
          }; 
        }
      } else {
        return -1;
      }
    };
    return graph;
  }

  /**
   * return object giving handle to just single function
   */
  return {
    "getInstallationOrder" : displayOrder
  }
}());
