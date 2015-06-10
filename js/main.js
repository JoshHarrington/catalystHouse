/*jslint browser: true */
/*global $:false, jQuery:false, Modernizr:false, enquire:false, console:false */

/* ==========================================================================
 JS to run on every page
 ========================================================================== */

var PAGE;

(function($) {
    "use strict";
    PAGE = (function() {
        

        function functionName(){
            // put your function script here
            // try to separate everything out into specific functions (it makes it easier to think through)
        }
        
        
        return {
            // public members
            init: function() {
                
                // list all of the functions that you want to call on page load here - format is:
                
                // functionName();

            }
        };
    }());
    
    $(function() {
        PAGE.init();
    });



    
}(jQuery));
