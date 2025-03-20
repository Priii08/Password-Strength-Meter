$(document).ready(function() {
    $('#password').on('input', function() {
        var password = $(this).val();
        if (password.length > 0) { 
            var strength = checkPasswordStrength(password);
            updateStrengthMeter(strength);
            updateStrengthStatus(strength);
            updatePasswordRequirements(password, strength);
        } else {
           
            resetPasswordFeedback();
        }
    });

    function checkPasswordStrength(password) {
        var strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

        return strength;
    }

    function updateStrengthMeter(strength) {
        var meter = $('#strength-bar');
        meter.removeClass('weak medium strong');
        var width = 0;

        if (strength === 1) {
            meter.css('background-color', 'red');
            width = 20;
        } else if (strength === 2) {
            meter.css('background-color', 'yellow');
            width = 40;
        } else if (strength === 3) {
            meter.css('background-color', 'orange');
            width = 60;
        } else if (strength === 4) {
            meter.css('background-color', 'green');
            width = 80;
        } else if (strength >= 5) {
            meter.css('background-color', 'green');
            width = 100;
        }

        meter.css('width', width + '%');
    }

    function updateStrengthStatus(strength) {
        var status = $('#password-strength-status');
        if (strength < 2) {
            status.text('Weak').css('color', 'red');
        } else if (strength === 2 || strength === 3) {
            status.text('Medium').css('color', 'orange');
        } else if (strength >= 4) {
            status.text('Strong').css('color', 'green');
        }
    }

    function updatePasswordRequirements(password, strength) {
        $('#password-requirements').show();
        if (strength >= 4) {
            $('#password-requirements').hide();
        }

        var lengthRequirement = password.length >= 8;
        var uppercaseRequirement = /[A-Z]/.test(password);
        var lowercaseRequirement = /[a-z]/.test(password);
        var numberRequirement = /\d/.test(password);
        var specialRequirement = /[^a-zA-Z0-9]/.test(password);

        $('#length-requirement').toggleClass('complete', lengthRequirement).toggleClass('incomplete', !lengthRequirement);
        $('#uppercase-requirement').toggleClass('complete', uppercaseRequirement).toggleClass('incomplete', !uppercaseRequirement);
        $('#lowercase-requirement').toggleClass('complete', lowercaseRequirement).toggleClass('incomplete', !lowercaseRequirement);
        $('#number-requirement').toggleClass('complete', numberRequirement).toggleClass('incomplete', !numberRequirement);
        $('#special-requirement').toggleClass('complete', specialRequirement).toggleClass('incomplete', !specialRequirement);
    }

    function resetPasswordFeedback() {
        $('#strength-bar').css('width', '0%').css('background-color', 'red');
        $('#password-strength-status').text('').css('color', 'black');
        $('#password-requirements li').removeClass('complete').addClass('incomplete');
        $('#password-requirements').hide(); 
    }
});
