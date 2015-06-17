/*jslint browser: true */
/*global $:false, jQuery:false, Modernizr:false, enquire:false, console:false */

/* ==========================================================================
 JS to run on every page
 ========================================================================== */

var PAGE;

var configState = 0;
var nextKeyCodeIndex = 0;

var triggers = [
    { 
        name: "Bath water",
        msgStaffOn: "The floor is wet", 
        msgStaffOff: "The floor is dry",  
        msgCustomerOn: "We'll be round shortly", 
        msgCustomerOff: "Feedback stage", 
        currentKeyState: 0, 
        function: null, 
        keyCode: -1
    }
];

var EVENT = {
  BATH_WATER: 0    
};

(function($) {
    "use strict";
    PAGE = (function() {
        
        triggers[EVENT.BATH_WATER].function = triggerBathWater;
        
        function setupMakey() {
            
            $('article').addClass('hide');
            $('.setup').removeClass('hide');
            displayNextTrigger();
        }
        
        function displayNextTrigger(){
            // do the bathtub stuff
            $('.hello').html(triggers[nextKeyCodeIndex].name);
        }
        
        function activeKeyDown(unicode) {
            // check key code index
            var index = -1;
            
            for (var i = 0; i < triggers.length; i++) {
                if (triggers[i].keyCode == unicode){
                    index = i;
                    break;
                }
            }
            
            if (index != -1) {
                if (triggers[index].currentKeyState != 1) {
                    triggers[index].currentKeyState = 1;
                    triggers[index].function(false);
                }
            }
            
        }
        function activeKeyUp(unicode) {
            // check key code index
            var index = -1;
            
            for (var i = 0; i < triggers.length; i++) {
                if (triggers[i].keyCode == unicode){
                    index = i;
                    break;
                }
            }
            
            if (index != -1) {
                if (triggers[index].currentKeyState != 0) {
                    triggers[index].currentKeyState = 0;
                    triggers[index].function(true);
                }
            }
            
            
        }
        
        function triggerBathWater(isUp) {
//            console.log('trigger bath water');
            sendStaffMessage(triggerBathWater, !isUp);
            sendCustomerMessage(triggerBathWater, !isUp);
        }
        
        function sendStaffMessage(caller, isOn){
            for(var i = 0; i<triggers.length; i++) {
                if (triggers[i].function == caller) {
                    if (isOn){
                        $('.main .StaffScreen ul').append('<li>'+ triggers[i].msgStaffOn +'</li>')
                    } else {
                        
                        $('.main .StaffScreen ul').append('<li>'+ triggers[i].msgStaffOff +'</li>')
                    }
                }
            }
        }

        function sendCustomerMessage(caller, isOn){
            for(var i = 0; i<triggers.length; i++) {
                if (triggers[i].function == caller) {
                    if (isOn){
                        $('.main .endUserScreen ul').append('<li>'+ triggers[i].msgCustomerOn +'</li>')
                    } else {
                        
                        $('.main .endUserScreen ul').append('<li>'+ triggers[i].msgCustomerOff +'</li>')
                    }
                }
            }
        }


            
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
                var found = -1;
                for (var i = 0; i<triggers.length; i++){
                    if (triggers[i].keyCode  == keyCode) {
                        found = i;
                        break;
                    }
                }
                if (found == -1){
                    triggers[nextKeyCodeIndex].keyCode = keyCode;
                    triggers[nextKeyCodeIndex].currentKeyState = 0;

                }
            }
            function configKeyUp() {
                nextKeyCodeIndex++;
                if(nextKeyCodeIndex == triggers.length) {
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
