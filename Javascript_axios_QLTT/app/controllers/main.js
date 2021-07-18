var userService = new UserService();

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
                <td>${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-primary" onclick = "loadDataByID('${user.id}')" >Sửa</button>
                    <button data-toggle="modal" data-target="#modal-confirm" class="btn btn-danger" onclick = "deleteUserByID('${user.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
    getEl('#tblDanhSachNguoiDung').innerHTML = content;
}

function getData() {
    userService.getData()
        .then(function(result) {
            console.log('Lấy dữ liệu thành công');
            console.log(result.data);
            setLocalStorage(result.data);
            renderData(result.data);
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
        <button class = "btn btn-danger" data-dismiss="modal">Trờ về</button>
        `;
});

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

    userService.addUser(user)
        .then(function(result) {
            getData();
            setLocalStorage(user.data);
            console.log('Thêm dữ liệu thành công');
            getEl('#myModal .close').click();
        })
        .catch(function(err) {
            console.log('Thêm dữ liệu thất bại: ' + err);
        });
}

/**
 * Xóa data theo tài khoản
 */
function deleteUserByID(id) {
    getEl('#del-user').addEventListener('click', function() {
        userService.deleteUser(id)
            .then(function(result) {
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
                <button type="button" id ='' class="btn btn-danger" data-dismiss="modal">Trở Về</button>
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

    userService.updateData(id, user)
        .then(function(result) {
            console.log('Cập nhật thành công');
            getEl('#myModal .close').click();
            getData();
        })
        .catch(function(err) {
            console.log('Cập nhật thất bại: ' + err);
        });
}