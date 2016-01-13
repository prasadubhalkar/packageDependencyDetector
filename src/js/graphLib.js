/**
 * [Graph Namespace will hold various types of graphs]
 * @return {Object} [Handle to packageGraph and any other sub category of graph]
 */
var Graph = (function(){
  /**
   * [packageGraph class will create a disconnected and undirected graph from input packagelist]
   * @return {undefined} [undefined]
   */
  function packageGraph(){
    this.nodes    = {}; //List of nodes in the graph
    this.path     = []; //Path of traversal of the graph  
    this.visited  = {}; //Visited map of the graph
  } 

  /**
   * [setNode function is responsible for adding a node to graph]
   * @param {String} node [name of the package/node to be added]
   */
  packageGraph.prototype.setNode = function(node){
    this.nodes[node] = [];
  }

  /**
   * [addNodeData function is responsible for adding data for given node]
   * @param {String} parent [Original package/node to add data to]
   * @param {String} data   [Package/node to be added as depenedency]
   */
  packageGraph.prototype.addNodeData = function(parent,data){
    this.nodes[parent].push(data);
  }

  /**
   * [checkForCycle function will initiate the cycle detection process
   *                As this could be a disconnected graph we need to 
   *                loop through all nodes]
   * @return {Boolean} [indecates if graph is cyclic or not]
   */
  packageGraph.prototype.checkForCycle = function() {
    for (node in this.nodes) {
      if(!this.visited[node]) {
        var retVal = this.detectCycle(node);
        if(retVal){
          return true;
        }
      }
    };
    return false;
  }

  /**
   * [detectCycle function will perform Depth first search on graph to detect cycle]
   * @param  {String} node   [Original node to be traversed]
   * @param  {Object} parent [Parent node of the original node]
   * @return {Boolean}       [if current node is part of a cycle or not]
   */
  packageGraph.prototype.detectCycle = function(node,parent) {
    try {
      var cLen = this.nodes[node].length,
          cNode;
      
      this.visited[node] = true;
      
      if(cLen > 0){
        
        cNode = this.nodes[node][0];
        if(!this.visited[cNode]) {
          if(this.detectCycle(cNode,node)) {
            return true;
          }
        } else if(parent && cNode !== node) {
          return true;
        }
      }
      return false;  
    } catch(e) {
      return -1;
    }
  }

  /**
   * [traverseDepthFirst function will traverse the graph using DFS algorithm
   *                     and populate the traversed path in Path array]
   * @return {Array} [Traversal path / way in which its safe to install packages]
   */
  packageGraph.prototype.traverseDepthFirst = function() {
    if(!this.checkForCycle()) {
      for (node in this.nodes) {
        this.traverseNode(node);
      };

      for (node in this.nodes) {
        if(this.path.indexOf(node) < 0){
          this.path.push(node);
        }
      }; 
      return this.path;
    } else {
      return -1;
    }
    
  }

  /**
   * [traverseNode function will traverse node until its lowest detected child]
   * @param  {String} node [package/node to traverse]
   * @return {undefined}      [undefined]
   */
  packageGraph.prototype.traverseNode = function(node) {
    if(this.nodes[node] !== undefined && this.nodes[node].length > 0) {
      this.traverseNode(this.nodes[node][0]);  
    } else {
      if(this.path.indexOf(node) < 0){
        this.path.push(node);
      }
    }
  }

  return {
    "packageGraph" : packageGraph,
  }
}());
