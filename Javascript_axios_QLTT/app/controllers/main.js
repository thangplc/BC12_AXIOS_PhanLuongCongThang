var userService = new UserService();
var userData = '';
var validator = new Validation();

/**
 * Set local storeage
 */
function setLocalStorage(listUser) {
    localStorage.setItem("ListUser", JSON.stringify(listUser));
}

function getLocalStorage() {
    if (localStorage.getItem("ListUser")) {
        return JSON.parse(localStorage.getItem("ListUser"));
    }
}

/**
 * Hiển thị dữ liệu vào tbody
 */
function renderData(arrUser) {
    var content = '';
    arrUser.map(function(user, index) {
        content += `
         <tr>
                <td >${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td class = "px-2">
                    <span class="row m-auto text-center" >
                        <input class="inputPass col-8" type ="password" readonly value = "${user.matKhau}">
                        <span class="col-4 show" onclick="showPassWord(${index})"><i class="fa fa-eye"></i></span>
                        <span class="col-4 hide" onclick="hidePassWord(${index})" style="display:none;"><i class="fa fa-eye-slash"></i></span>
                    </span>
                </td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td >
                    <button class="btn btn-primary" onclick = "loadDataByID('${user.id}')" >Sửa</button>
                    <button class="btn btn-danger"  data-toggle="modal" data-target="#modal-confirm" onclick = "deleteUserByID('${user.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
    getEl('#tblDanhSachNguoiDung').innerHTML = content;
}

function showPassWord(id) {
    document.getElementsByClassName('inputPass')[id].type = 'text';
    document.getElementsByClassName('show')[id].style.display = 'none';
    document.getElementsByClassName('hide')[id].style.display = 'block';
}

function hidePassWord(id) {
    document.getElementsByClassName('inputPass')[id].type = 'password';
    document.getElementsByClassName('show')[id].style.display = 'block';
    document.getElementsByClassName('hide')[id].style.display = 'none';
}

function getData() {
    userService.getData()
        .then(function(result) {
            console.log('Lấy dữ liệu thành công');
            console.log(result.data);
            setLocalStorage(result.data);
            renderData(result.data);
            userData = result.data;
        })
        .catch(function(err) {
            console.log('Lấy dữ liệu thất bại: ' + err);

        });
}
getData();

/**
 * Thêm mới data
 */
getEl('#btnThemNguoiDung').addEventListener('click', function() {
    var modalFooter = getEl('.modal-footer');
    getEl('#formUser').reset();
    modalFooter.innerHTML =
        `                  
        <button id = "btnThemMoi" class = "btn btn-primary" onclick = "addUser()">Thêm mới</button>
        <button id="btnTroVe" class="btn btn-danger" data-dismiss="modal" onclick = "resetNotifyInput()">Trờ về</button>

        `;
});

function resetNotifyInput() {
    getEl('#noteAcc').innerHTML = '';
    getEl('#noteName').innerHTML = '';
    getEl('#notePass').innerHTML = '';
    getEl('#noteEmail').innerHTML = '';
    getEl('#noteTypeUser').innerHTML = '';
    getEl('#noteImage').innerHTML = '';
    getEl('#noteLanguage').innerHTML = '';
    getEl('#noteDescribe').innerHTML = '';
    getEl('#noteState').innerHTML = '';

}
// getEl('#btnTroVe').addEventListener('click', function() {
//     resetNotifyInput();
// });

function addUser() {
    var account = getEl('#TaiKhoan').value;
    var name = getEl('#HoTen').value;
    var passWord = getEl('#MatKhau').value;
    var email = getEl('#Email').value;
    var picture = getEl('#HinhAnh').value;
    var typeUser = getEl('#loaiNguoiDung').value;
    var language = getEl('#loaiNgonNgu').value;
    var describe = getEl('#MoTa').value;

    var user = new Users(account, name, passWord, email, typeUser, language, describe, picture);
    if (!checkValidation(validator, userData)) {
        getEl('#noteState').innerHTML = 'Thêm mới thất bại!';
        getEl('#noteState').style.color = 'red';
        return;
    } else {
        userService.addUser(user)
            .then(function(result) {
                getData();
                setLocalStorage(user.data);
                console.log('Thêm dữ liệu thành công');
                // getEl('#myModal .close').click();
                getEl('#noteState').innerHTML = 'Thêm mới thành công!';
                getEl('#noteState').style.color = 'rgb(4, 156, 49)';

            })
            .catch(function(err) {

                console.log('Thêm dữ liệu thất bại: ' + err);
            });

    }

}

/**
 * Xóa data theo tài khoản
 */
function deleteUserByID(id) {
    getEl('#del-user').addEventListener('click', function() {
        userService.deleteUser(id)
            .then(function(result) {
                setLocalStorage(result.data);
                console.log(id);
                console.log('Xóa thành công id: ' + id);
                getEl('#modal-confirm .close').click();
                getData();

            }).catch(function(err) {
                console.log('Xóa thất bai: ' + err);
                console.log(id);
            });
    });
};



/**
 * Sửa data 
 */
function loadDataByID(id) {
    getEl('#TaiKhoan').readOnly = true;
    userService.loadDataID(id)
        .then(function(result) {
            console.log(result.data);
            getEl('#btnThemNguoiDung').click();
            getEl('#TaiKhoan').value = result.data.taiKhoan;
            getEl('#HoTen').value = result.data.hoTen;
            getEl('#MatKhau').value = result.data.matKhau;
            getEl('#Email').value = result.data.email;
            getEl('#HinhAnh').value = result.data.hinhAnh;
            getEl('#loaiNguoiDung').value = result.data.loaiND;
            getEl('#loaiNgonNgu').value = result.data.ngonNgu;
            getEl('#MoTa').value = result.data.moTa;
            // Hiên thị btn cập nhật
            var modalFooter = document.querySelector('.modal-footer');
            modalFooter.innerHTML = `
                <button type="submit" class="btn btn-success" onclick = "updateDataByID('${result.data.id}')">Cập Nhật</button>
                <button id="" class="btn btn-danger" data-dismiss="modal" onclick = "resetNotifyInput()">Trờ về</button>
                `;
            console.log('load thành công');
        }).catch(function(err) {
            console.log('Load thất bại: ' + err);
        });

};

function updateDataByID(id) {
    var account = getEl('#TaiKhoan').value;
    var name = getEl('#HoTen').value;
    var passWord = getEl('#MatKhau').value;
    var email = getEl('#Email').value;
    var picture = getEl('#HinhAnh').value;
    var typeUser = getEl('#loaiNguoiDung').value;
    var language = getEl('#loaiNgonNgu').value;
    var describe = getEl('#MoTa').value;

    var user = new Users(account, name, passWord, email, typeUser, language, describe, picture);
    if (!checkValidation(validator, userData)) {
        getEl('#noteState').innerHTML = 'Cập nhật thất bại!';
        getEl('#noteState').style.color = 'red';
        return;
    } else {
        userService.updateData(id, user)
            .then(function(result) {
                console.log('Cập nhật thành công');
                // getEl('#myModal .close').click();
                getEl('#noteState').innerHTML = 'Cập nhật thành công!';
                getEl('#noteState').style.color = 'rgb(4, 156, 49)';
                getData();
            })
            .catch(function(err) {

                console.log('Cập nhật thất bại: ' + err);
            });
    }
}


/**
 * Check validation
 */
function checkValidation(valid, data) {
    var account = getEl('#TaiKhoan').value;
    var name = getEl('#HoTen').value;
    var passWord = getEl('#MatKhau').value;
    var email = getEl('#Email').value;
    var picture = getEl('#HinhAnh').value;
    var typeUser = getEl('#loaiNguoiDung').value;
    var language = getEl('#loaiNgonNgu').value;
    var describe = getEl('#MoTa').value;
    let isVal = true;
    if (!(getEl('#TaiKhoan').readOnly)) {
        isVal &= valid.checkBlank(account, '#noteAcc') && valid.checkAccount(data, getEl('#TaiKhoan').value, '#noteAcc');
    }
    isVal &= valid.checkBlank(getEl('#MatKhau').value, '#notePass') && valid.checkPass(getEl('#MatKhau').value, '#notePass');
    isVal &= valid.checkBlank(getEl('#HoTen').value, '#noteName') && valid.checkName(getEl('#HoTen').value, '#noteName');
    isVal &= valid.checkBlank(getEl('#Email').value, '#noteEmail') && valid.checkEmail(getEl('#Email').value, '#noteEmail');
    isVal &= valid.checkBlank(getEl('#HinhAnh').value, '#noteImage');
    isVal &= valid.checkSelect(getEl('#loaiNguoiDung').value, '#noteTypeUser');
    isVal &= valid.checkSelect(getEl('#loaiNgonNgu').value, '#noteLanguage');
    isVal &= valid.checkBlank(getEl('#MoTa').value, '#noteDescribe') && valid.checkLenghtCharacter(getEl('#MoTa').value, 60, '#noteDescribe');

    return isVal;
}


console.log(userData)

function eventKeyUpInput() {
    getEl('#TaiKhoan').addEventListener('input', () => {
        validator.checkBlank(getEl('#TaiKhoan').value, '#noteAcc') &&
            validator.checkAccount(userData, getEl('#TaiKhoan').value, '#noteAcc');
    });
    getEl('#MatKhau').addEventListener('input', () => {
        validator.checkBlank(getEl('#MatKhau').value, '#notePass') && validator.checkPass(getEl('#MatKhau').value, '#notePass');
    });
    getEl('#HoTen').addEventListener('input', () => {
        validator.checkBlank(getEl('#HoTen').value, '#noteName') && validator.checkName(getEl('#HoTen').value, '#noteName');
    });
    getEl('#Email').addEventListener('input', () => {
        validator.checkBlank(getEl('#Email').value, '#noteEmail') && validator.checkEmail(getEl('#Email').value, '#noteEmail');
    });
    getEl('#MoTa').addEventListener('focus', () => {
        getEl('#MoTa').addEventListener('input', () => {
            getEl('#noteDescribe').innerHTML = "Số ký tự không vượt quá 60";
        });
    });

    getEl('#MoTa').addEventListener('change', () => {
        validator.checkBlank(getEl('#MoTa').value, '#noteDescribe') && validator.checkLenghtCharacter(getEl('#MoTa').value, 60, '#noteDescribe');
    });
}
eventKeyUpInput();