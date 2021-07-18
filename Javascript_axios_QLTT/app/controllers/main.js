var userService = new UserService();


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
                    <button class="btn btn-primary" >Sửa</button>
                    <button class="btn btn-danger" >Xóa</button>
                </td>
            </tr>
        `;
    });
    getEl('#tblDanhSachNguoiDung').innerHTML = content;
}

function getData() {
    userService.getData()
        .then(function(result) {
            renderData(result.data);
            console.log('Lấy dữ liệu thành công');
            console.log(result.data);
        })
        .catch(function(err) {
            console.log('Lấy dữ liệu thất bại: ' + err);

        });
}
getData();