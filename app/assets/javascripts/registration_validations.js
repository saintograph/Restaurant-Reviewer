function validate() {
    var valid = true;
    valid = checkName(document.getElementById('form-register-full-name').value);
    valid = valid && checkEmail(document.getElementById('form-register-email').value);
    valid = valid && checkPassword(document.getElementById('form-register-password').value);
    valid = valid && checkPasswordConfirm(document.getElementById('form-register-confirm-password').value);
    $("#register_button").attr("disabled", true);
    if (valid) {
        $("#register_button").attr("disabled", false);
    }
}

function checkName(obj) {
    var result = true;
    var inputT = /[a-zA-Z0-9]+/.test(obj);
    var msg = document.getElementById('confirmName');
   
    if( inputT == true) {
        msg.innerHTML = '<small>' + 'Thank you ' + '</small>';
        return result = true;
    } else {
        msg.innerHTML = '<small>' + 'Please provide a valid name' + '</small>';
        return result = false;
    }
}
function checkEmail(obj) {
    var result = true;
    var itemC = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(obj);
    var change = document.getElementById('testEmail');
    if(itemC == true) {
        change.innerHTML = '<small>' + 'Thank you!' + '</small>';
        return result = true;
    } else {
        change.innerHTML = '<small>' + 'Valid email address please' + '</small>';
        return result = false;
    }
}

function checkPassword(obj) {
    var result = true;
    var itemC = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(obj);
    var change = document.getElementById('testPassword');
    if(itemC == true) {
        change.innerHTML = '<small>' + 'Great password' + '</small>';
        return result = true;
    } else {
        change.innerHTML = '<small>' + 'Passwords require a symbol, number, lowercase and uppercase varter' + '</small>';
        return result = false;
    }
}

function checkPasswordConfirm(obj) {
    var result = true;
    var msg = document.getElementById('form-register-password').value;
    var change = document.getElementById('confirmPassword2');
    if(obj == msg && obj !== "") {
        change.innerHTML = '<small>' + 'Passwords match!' + '</small>';
        return result = true;
    } else if(obj == "") {
        change.innerHTML = '<small>' + 'Password confirmation needed' + '</small>';
        return result = false;
    } else {
        change.innerHTML = '<small>' + 'Password must match the above' + '</small>';
        return result = false;
    }
}