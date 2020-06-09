

function initRegisterPage() {
    let acceptPolicy = document.getElementById('accept-policy');

    if( acceptPolicy.checked ) {
        toggleRegisterButton(true);
    }

    acceptPolicy.onchange = function(e) {
        if( this.checked ) {
            toggleRegisterButton(true);
        } else {
            toggleRegisterButton(false);
        }
    }
    
}

function toggleRegisterButton(enabled) {
    let registerbtn = document.getElementById('register-btn');

    if( enabled ) {
        registerbtn.classList.remove('opacity-50');
        registerbtn.classList.remove('cursor-not-allowed');
        registerbtn.addEventListener('click', submitRegisterForm);
    } else {
        registerbtn.classList.add('opacity-50');
        registerbtn.classList.add('cursor-not-allowed');
        registerbtn.removeEventListener('click', submitRegisterForm);
    }
}

function submitRegisterForm() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if( email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword ) {
        if( !strongRegex.test(password) ) {
            alert('Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบไปด้วย'+'\n'+'- ตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กอย่างน้อย 1 ตัว'+'\n'+'- ตัวอักษรภาษาอังกฤษตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว'+'\n'+'- ตัวเลขอย่างน้อย 1 ตัว'+'\n'+'- อักขระพิเศษ (!, @, #, $, %, ^, &, *) อย่างน้อย 1 ตัว');
        } else {
            document.getElementById('register-form').submit();
        }

    } else {
        if( password !== confirmPassword ) {
            alert('Password และ Confirm Password ต้องเป็นค่าเดียวกัน');
        } else {
            alert('กรุณากรอก Email, Password และ Confirm Password ให้เรียบร้อย');
        }
    }
}