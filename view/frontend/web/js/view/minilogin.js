/**
 * Copyright � 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'uiComponent',
    'jquery',
    'ko',
    'mage/translate',
    'Magento_Customer/js/action/login',
    'mage/url',
    'Magento_Customer/js/customer-data'
], function (Component, $, ko, $t, loginAction, url, customerData) {
    'use strict';

    $.fn.testCall = function() {
        return $(this).click(function() {
           alert('Hi');
            return false;
        });
    };

    return Component.extend({
        registerUrl: window.authenticationPopup.customerRegisterUrl,
        forgotPasswordUrl: window.authenticationPopup.customerForgotPasswordUrl,
        autocomplete: window.checkout.autocomplete,

        isLoading: ko.observable(false),

        /** Is login form enabled for current customer */
        isActive: function() {
            var customer = customerData.get('customer');
            return customer() == false;
        },

        initialize: function () {
            var self = this;
            this._super();
            //initSidebar();
            url.setBaseUrl(window.authenticationPopup.baseUrl);
            loginAction.registerLoginCallback(function() {
                self.isLoading(false);
            });
        },
        /** Provide login action */
        login: function(loginForm) {
            var loginData = {},
                formDataArray = $(loginForm).serializeArray();
            formDataArray.forEach(function (entry) {
                loginData[entry.name] = entry.value;
            });

            if($(loginForm).validation()
                && $(loginForm).validation('isValid')
            ) {
                this.isLoading(true);
                loginAction(loginData, null, false);
            }
        },
        forgotpwd: function(theForm) {
            var loginData = {},
                formDataArray = $(theForm).serializeArray();
            formDataArray.forEach(function (entry) {
                loginData[entry.name] = entry.value;
            });

            if($(theForm).validation()
                && $(theForm).validation('isValid')
            ) {
                theForm.submit();
            }
        },
        callForgotPwdForm: function() {
            if($('#forgotpwd-form').hasClass('no-display')) {
                $('#forgotpwd-form').removeClass('no-display');
            }
            else {
                $('#forgotpwd-form').addClass('no-display');
            }
            return false;
        },
        /*initSidebar: initSidebar,*/
        closeSidebar: function() {
            var mini_login = $('[data-block="mini_login"]');
            mini_login.on('click', '[data-action="close"]', function(event) {
                event.stopPropagation();
                mini_login.find('[data-role="dropdownDialog"]').dropdownDialog("close");
            });
            return true;
        }
    });
});
