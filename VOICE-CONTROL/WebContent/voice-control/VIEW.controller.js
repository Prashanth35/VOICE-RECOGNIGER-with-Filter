sap.ui.controller("voice-control.VIEW", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf voice-control.VIEW
*/
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("model/employee_data.json");
	     this.getView().setModel(oModel);
	 		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf voice-control.VIEW
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf voice-control.VIEW
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf voice-control.VIEW
*/
//	onExit: function() {
//
//	}

	
	
	GHT : function onMicPress(oEvent){
		     that=this;
	      if('webkitSpeechRecognition' in window){
	    	  //debugger;
	        
	    	 /* var searchButton = that.getView().byId("clickToSpeak").getAggregation("headEndItems")[];
	    	  searchButton.firePress();*/
	            var speechRecognizer = new webkitSpeechRecognition();
	            speechRecognizer.continuous = true;
	            speechRecognizer.interimResults = true;
	            speechRecognizer.lang = 'en-IN';
	            speechRecognizer.start();
	            jQuery.sap.delayedCall(5000, this, function () { // this has to be implemented so as the control comes back after 5 seconds
	            speechRecognizer.stop();
	            });
	            var finalTranscripts = '';
	            var oEvent = oEvent;
	            speechRecognizer.onresult = function(event){
	            var interimTranscripts = '';
	            for(var i = event.resultIndex; i < event.results.length; i++){
	            var transcript = event.results[i][0].transcript;
	            transcript.replace("\n", "<br>");
	            if(event.results[i].isFinal){
	            finalTranscripts += transcript;
	            }else{
	              interimTranscripts += transcript;
	              }
	            }
	            var shellInput = that.getView().byId("searchInputShell")
	            	//sap.ui.getCore().getElementById("searchInputShell");
	            shellInput.setValue(finalTranscripts);
	            
	           shellInput.focus();
	           debugger;
	           if(finalTranscripts==="name"){
	        	   that.getView().byId("searchInputShell").fireLiveChange();
	           }
	          
	         /* that.getView().byId("searchInputShell").fireLiveChange({finalTranscripts});
	          jQuery.sap.delayedCall(2000, this, function () {
	            var firstSuggestionItem = that.getView().byId("searchInputShell").getAggregation("items");
	            that.getView().byId("searchInputShell").fireSuggestionItemSelected({selectedRow:firstSuggestionItem});
	            });*/
            };
	            speechRecognizer.onerror = function (event) {
	            };
	      }
	debugger;
	 this.getView().byId("searchInputShell").fireLiveChange({finalTranscripts});
	},
	
	voice: function onMicPress(oEvent){
		//debugger;
		that=this;
	      if('webkitSpeechRecognition' in window){
	     /* var searchButton = this.getView().byId("searchInputShell")
	      searchButton.firePress();*/
	        var speechRecognizer = new webkitSpeechRecognition();
	        speechRecognizer.continuous = true;
	        speechRecognizer.interimResults = true;
	        speechRecognizer.lang = 'en-IN';
	        speechRecognizer.start();
	        jQuery.sap.delayedCall(5000, this, function () { // this has to be implemented so as the control comes back after 5 seconds
	        speechRecognizer.stop();
	        });
	        var finalTranscripts = '';
	        var oEvent = oEvent;
	        speechRecognizer.onresult = function(event){
	        var interimTranscripts = '';
	        for(var i = event.resultIndex; i < event.results.length; i++){
	        var transcript = event.results[i][0].transcript;
	        transcript.replace("\n", "<br>");
	        if(event.results[i].isFinal){
	        finalTranscripts += transcript;
	        }else{
	          interimTranscripts += transcript;
	          }
	        }
	        debugger;
	        var shellInput =that.getView().byId("searchInputShell")
	        shellInput.setValue(finalTranscripts);
	        
	        
	        that.getView().byId("searchInputShell").fireLiveChange();
	        
	        };
	     
	      
	        
	        speechRecognizer.onerror = function (event) {
	        };
	
	      }
	      
	},
	onlivechabge: function(oControlEvent)
	{
		
		debugger;
		var aFilter = [];
		
		var sQuery = this.getView().byId("searchInputShell").getValue();
		if (sQuery) {
			aFilter.push(new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ,sQuery));
		}

		// filter binding
		var oList = this.getView().byId("idTable");
		var oBinding = oList.getBinding("items");
		oBinding.filter(aFilter);
		
	},
	onSearch : function(oEv){
  debugger;
		  var like = oEv.getParameter("newValue");

		     var binding = this.getView().byId("idTable").getBinding("items"); 

		     var filters = [

		 

		     new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ, like)

		    

		     // Add additional filters 

		   ];

		   var oFilter = new sap.ui.model.Filter(filters); // true = AND, false = OR

		  binding.filter(oFilter);

		 

		  },
	
		onSerch:function(){ 
		  /*debugger;
			//this.getView().byId("idSerach").getValue();
			//Grabbing value
			var query = oControlEvent.getParameters().query;
			// doing the filtering operations
			//var filters=new Array();
			var filters=[];
			var filter1 = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ, query);
			filters.push(filter1);
			
			var oTable=this.getView().byId("idTable");
			oTable.getBinding("items").filter(filters);
			//debugger;
			var query = oControlEvent.getParameters().query;*/
		} 
	
});