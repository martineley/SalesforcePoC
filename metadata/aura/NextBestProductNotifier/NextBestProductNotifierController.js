({
	doInit : function(component, event, helper) {
		var action = component.get("c.getLastNextBestProduct");
        action.setCallback(component, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
				component.set("v.aNextBestProduct", response.getReturnValue());
            } else {
                component.set("v.aNextBestProduct", "None");
            }
            $A.get('event.force:refreshView').fire();
        });
        
        $A.enqueueAction(action);
    },
    gotoRecord : function(component, event, helper) {
        // Fire the event to navigate to the contact record
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        sObjectEvent.setParams({
        	"recordId": component.get("v.aNextBestProduct.Id"),
        	"slideDevName": 'related'
        });
        sObjectEvent.fire();
	},
})