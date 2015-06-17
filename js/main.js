/*jslint browser: true */
/*global $:false, jQuery:false, Modernizr:false, enquire:false, console:false */

/* ==========================================================================
 JS to run on every page
 ========================================================================== */

var PAGE;

var configState = 0;
var nextKeyCodeIndex = 0;
var validConfigKeyDown = 0;

var triggers = [
    { 
        name: "Bathroom flooded",
        msgStaffOn: "The floor in flat 2 is wet", 
        msgStaffOff: "The floor in flat 2 is dry",  
        msgCustomerOn: "The floor in flat 2 is wet. We'll be round shortly", 
        msgCustomerOff: "The floor in flat 2 is dry again", 
        currentKeyState: 0, 
        keyCode: -1,
        affectsFlats: [ 1 ]
    },
    { 
        name: "Top light off (RHS switch)",
        msgStaffOn: "The light in flat 1 is broken", 
        msgStaffOff: "The light in flat 1 is better",  
        msgCustomerOn: "The light in flat 1 is broken. We'll be round shortly", 
        msgCustomerOff: "The light in flat 1 is better", 
        currentKeyState: 0, 
        keyCode: -1,
        affectsFlats: [ 0 ]
    },
    { 
        name: "Main entrance light off (LHS switch)",
        msgStaffOn: "The main entrance light is broken", 
        msgStaffOff: "The main entrance light is better",  
        msgCustomerOn: "The main entrance light is broken. We'll be round shortly", 
        msgCustomerOff: "The main entrance light is better", 
        currentKeyState: 0, 
        keyCode: -1,
        affectsFlats: [ 0, 1 ]
    }
];

var EVENT = {
    BATH_WATER: 0,
    MAIN_ENTRANCE_LIGHT: 1,
    FLAT_LIGHT: 2
};

(function($) {
    "use strict";
    PAGE = (function() {
        
        function setupMakey() {
            
            $('article').addClass('hide');
            $('.setup').removeClass('hide');
            displayNextTrigger();
        }
        
        function displayNextTrigger(d){
            // do the bathtub stuffn
            $('.hello').html("Activate the " + triggers[nextKeyCodeIndex].name + " condition");
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
                    triggerEvent(index, false);
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
                    triggerEvent(index, true);
                }
            }
            
            
        }
        
        function triggerEvent(index, isUp) {
            sendStaffMessage(index, !isUp);
            for (var i = 0; i < triggers[index].affectsFlats.length; i++) {
                sendCustomerMessage(index, triggers[index].affectsFlats[i], !isUp);
            }
        }
        
        function sendStaffMessage(index, isOn){
            cleanList("StaffScreen");
            if (isOn){
                $('.main .StaffScreen ul').append('<li>'+ triggers[index].msgStaffOn +'</li>')
            } else {

                $('.main .StaffScreen ul').append('<li>'+ triggers[index].msgStaffOff +'</li>')
            }
        }

        function sendCustomerMessage(index, flatIndex, isOn){
            cleanList("endUserScreen" + flatIndex);
            if (isOn){
                $('.main .endUserScreen' + flatIndex + ' ul').append('<li>'+ triggers[index].msgCustomerOn +'</li>')
            } else {
                $('.main .endUserScreen' + flatIndex + ' ul').append('<li>'+ triggers[index].msgCustomerOff +'</li>')
            }
        }
            
        function cleanList(divName)
        {
        
            //  if there are more than 10, remove the top one
            var children = $('.main .' + divName + ' ul li');
            
            if (children.length >= 10) {
                children.first().remove();
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
                for (var i = 0; i < triggers.length; i++){
                    if (triggers[i].keyCode == keyCode) {
                        found = i;
                        break;
                    }
                }
                if (found == -1){
                    triggers[nextKeyCodeIndex].keyCode = keyCode;
                    validConfigKeyDown = 1;
            $('.hello').html("Deactivate the " + triggers[nextKeyCodeIndex].name + " condition");
                }
            }
            function configKeyUp() {
                if (validConfigKeyDown == 1) {
                    validConfigKeyDown = 0;
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
