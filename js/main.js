/*jslint browser: true */
/*global $:false, jQuery:false, Modernizr:false, enquire:false, console:false */

/* ==========================================================================
 JS to run on every page
 ========================================================================== */

var PAGE;

var keyCodes = [];
var triggerNames = [
    'Bath water'
];
var triggerFunctions = [];

var configState = 0;
var nextKeyCodeIndex = 0;
var currentKeyStates = [];
var triggerDescriptions = [
    { msgStaffOn: "The floor is wet", msgStaffOff: "The floor is dry",  msgCustomerOn: "We'll be round shortly", msgCustomerOff: "Feedback stage"}
];


(function($) {
    "use strict";
    PAGE = (function() {
        
        var triggerFunctions = [
            triggerBathWater
        ];
        
        function setupMakey() {
            
            $('article').addClass('hide');
            $('.setup').removeClass('hide');
            displayNextTrigger();
        }
        
        function displayNextTrigger(){
            // do the bathtub stuff
            $('.hello').html(triggerNames[nextKeyCodeIndex]);
        }
        
        function activeKeyDown(unicode) {
            // check key code index
            
            var index = -1;
            
            for (var i = 0; i<keyCodes.length; i++) {
                if (keyCodes[i] == unicode){
                    index = i;
                    break;
                }
            }
            
            if (index != -1) {
                if (currentKeyStates[index] != 1) {
                    currentKeyStates[index] = 1;
                    triggerFunctions[index](false);
                }
            }
            
        }
        function activeKeyUp(unicode) {
            // check key code index
            var index = -1;
            
            for (var i = 0; i<keyCodes.length; i++) {
                if (keyCodes[i] == unicode){
                    index = i;
                    break;
                }
            }
            
            if (index != -1) {
                if (currentKeyStates[index] != 0) {
                    currentKeyStates[index] = 0;
                    triggerFunctions[index](true);
                }
            }
            
            
        }
        
        function triggerBathWater(isUp) {
//            console.log('trigger bath water');
            sendStaffMessage(triggerBathWater, !isUp);
            sendCustomerMessage(triggerBathWater, !isUp);
        }
        
        function sendStaffMessage(caller, isOn){
            for(var i = 0; i<triggerFunctions.length; i++) {
                if (triggerFunctions[i] == caller) {
                    if (isOn){
//                        triggerDescriptions[i].msgStaffOn;
                        $('.main .StaffScreen ul').append('<li>'+ triggerDescriptions[i].msgStaffOn +'</li>')
                    } else {
                        
                        $('.main .StaffScreen ul').append('<li>'+ triggerDescriptions[i].msgStaffOff +'</li>')
                    }
                }
            }
        }

        function sendCustomerMessage(caller, isOn){
            for(var i = 0; i<triggerFunctions.length; i++) {
                if (triggerFunctions[i] == caller) {
                    if (isOn){
//                        triggerDescriptions[i].msgStaffOn;
                        $('.main .endUserScreen ul').append('<li>'+ triggerDescriptions[i].msgCustomerOn +'</li>')
                    } else {
                        
                        $('.main .endUserScreen ul').append('<li>'+ triggerDescriptions[i].msgCustomerOff +'</li>')
                    }
                }
            }
        }


            
//            document.onkeypress=detectKey;

            
            function keyDown(event){
                var unicode=event.keyCode? event.keyCode : event.charCode;
                keyProcessor(unicode, false); 
            }
            
            function keyUp(event){
                var unicode=event.keyCode? event.keyCode : event.charCode;
                keyProcessor(unicode, true); 
            }
            
            function keyProcessor(unicode, isUp) {
                switch(unicode)
                {
                    case 87: //W
                    case 65: //A
                    case 83: //S
                    case 68: //D
                    case 70: //F
                    case 71: //G
                    case 32: //Space
                    case 38: //up
                    case 40: //down
                    case 39: //right
                    case 37: //left
                        
                    if (!isUp) {
                        if (configState == 0){
                            configKeyDown(unicode);
                            
                        } else {
                            activeKeyDown(unicode);
                            
                        }
                    } else {
                        if (configState == 0){
                            configKeyUp(unicode);
                            
                        } else {
                            activeKeyUp(unicode);
                            
                        }                        
                    }
                        
                    break;
                }
            }
            
            function configKeyDown(keyCode) {
                var found = false;
                for (var i = 0; i<keyCodes.length; i++){
                    if (keyCodes[i]  == keyCode) {
                        found = true;
                        break;
                    }
                }
                if (found == false){
                    keyCodes.push(keyCode);
                    currentKeyStates.push(0);

                }
            }
            function configKeyUp() {
                nextKeyCodeIndex++;
                if(nextKeyCodeIndex == triggerFunctions.length) {
                    configState = 1;
                    // turn off config screen
                    $('.setup').addClass('hide');
                    // turn on main screen
                    $('.main').removeClass('hide');
                } else {
                    displayNextTrigger();
                }
            }
            

        
        
        return {
            // public members
            init: function() {
                
                // list all of the functions that you want to call on page load here - format is:
                
                // functionName();
                
//                maKeyPress();
                
                document.onkeydown=keyDown;
                document.onkeyup=keyUp;
                

                
                setupMakey();
                

            }
        };
    }());
    
    $(function() {
        PAGE.init();
    });



    
}(jQuery));
