function Validation() {
    /**
     * Check input trống
     */
    this.checkBlank = function(value, spanID) {
        if (!value) {
            getEl(spanID).innerHTML = 'Vui lòng nhập thông tin';
            return false;
        } else {
            getEl(spanID).innerHTML = '';
            return true;
        }
    };

    /**
     * Check tài khoản
     */
    this.checkAccount = function(data, value, spanID) {
        // Check trùng lặp
        var isDuplicate = data.every(
            (account) => {
                return account.taiKhoan !== value;
            }
        )
        if (!isDuplicate) {
            getEl(spanID).innerHTML = 'Tài khoản đã tồn tại';
            return false;
        } else {
            getEl(spanID).innerHTML = '';
            return true;
        }
    };
    /**
     * Check họ tên
     */
    this.checkName = function(value, spanID) {
        let numberLeter = /(?=.\d)/;
        let specialLeter = /(?=.*[@$!%*?&])/;
        var specialNote = (specialLeter.test(value)) ? 'Chứa ký tự đặc biệt. ' : '';
        let numberNote = (numberLeter.test(value)) ? 'Chứa ký tự số. ' : ''
        if (specialNote === '' && numberNote === '') {
            getEl(spanID).innerHTML = '';
            return true;
        } else {
            getEl(spanID).innerHTML = 'Sai định dạng ' + specialNote + numberNote;
            return false;
        }
    };
    /**
     * Check mật khẩu
     */
    this.checkPass = function(value, spanID) {
        var length = /^([a-zA-Z0-9\d@$!%*?&]{6,8})$/;
        var UpcaseLeter = /(?=.*?[A-Z])/;
        var numberLeter = /(?=.\d)/;
        var specialLeter = /(?=.*[@$!%*?&])/;
        var numberNote = (numberLeter.test(value)) ? '' : 'Ít nhất một ký tự số. ';
        if (length.test(value)) {
            var lengthNote = '';
        } else {
            lengthNote = "6-8 ký tự. "
        }
        if (UpcaseLeter.test(value)) {
            var upcaseNote = '';
        } else {
            upcaseNote = 'Ít nhất một chữ in hoa. ';
        }
        var specialNote = (specialLeter.test(value)) ? '' : 'Ít nhất một ký tự đặc biệt.';

        getEl(spanID).innerHTML = lengthNote + numberNote + upcaseNote + specialNote;
        if (lengthNote === '' && upcaseNote === '' && specialNote === '' && numberNote === '') {
            return true;
        } else {
            return false;
        }
    };
    /**
     Check email
     */
    this.checkEmail = function(value, spanID) {
        var el = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (el.test(value)) {
            getEl(spanID).innerHTML = '';
            return true;
        } else {
            getEl(spanID).innerHTML = 'Sai định dạng Email';
            return false;
        }
    };
    /**
     * Check độ dài ký tự
     */
    this.checkLenghtCharacter = function(value, max, spanID) {
        if (value.length <= max) {
            getEl(spanID).innerHTML = '';
            return true;
        } else {
            getEl(spanID).innerHTML = 'Số ký tự vượt quá giới hạn cho phép';
            return false;
        }
    };
    /**
     * Check chọn select
     */
    this.checkSelect = function(value, spanID) {
        if (value == 'Chọn loại người dùng' || value == 'Chọn ngôn ngữ') {
            getEl(spanID).innerHTML = 'Hãy chọn đối tượng';
            return false;
        } else {
            getEl(spanID).innerHTML = '';
            return true;
        }
    };
}