(function() {
	var URL = window.location.href;
	var UUIDPattern = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g;
	
	var eventExplorerBaseUrls = {
		local: "http://localhost:9004/#/eventExplorer?limit=100&entityIds=",
		staging: "http://monitorui-adserver-staging.bbmedia.intra/#/eventExplorer?limit=100&entityIds=",
		production: "http://monitorui-adserver.ibillboard.com/#/eventExplorer?limit=100&entityIds="	
	};
	
	function getEnvironment(url) {
		if (url.indexOf("localhost") !== -1 || url.indexOf("adserver.dev") !== -1) {
			return "local";
		}
		
		if (url.indexOf("clientui-adserver-staging.bbmedia.intra") !== -1) {
			return "staging";
		}
		
		if (url.indexOf("clientui-adserver.ibillboard.com") !== -1) {
			return "production";
		}
	}
	
	function extractUUIDs(string) {
		return string.match(UUIDPattern);
	}
	
	function getLinkedUUID(url) {
		var UUIDs = extractUUIDs(url);
		if (UUIDs) {
			return UUIDs[UUIDs.length - 1];
		}
	}
	
	function getLinkToEventExplorer(url) {
		var environment = getEnvironment(url);
		var currentEntityId = getLinkedUUID(url);
		return eventExplorerBaseUrls[environment] + currentEntityId;
	}
	
	var entityUrlInEventExplorer = getLinkToEventExplorer(URL);
	
	window.open(entityUrlInEventExplorer, '_blank');
})();