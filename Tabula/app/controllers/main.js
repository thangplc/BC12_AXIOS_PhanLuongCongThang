var userService = new UserService();
const $$ = document.querySelector.bind(document);

function getListUser() {
    userService.getData().then((result) => {
        console.log('Lay du lieu thanh cong')
        renderUser(result.data);
        console.log(result.data)
    }).catch((err) => {
        console.log('Lay du lieu that bai: ' + err);
    });
}
getListUser();

function renderUser(listUser) {
    var content = '';
    listUser.filter(function(user) {
        if (user.loaiND === "GV") {
            content += `
                <div class="teacher__contentItem text-center col-12 col-sm-6 col-lg-3">
                                <div class="contentItem__content">
                                    <div class="contentItem__img">
                                        <img src="../../img/${user.hinhAnh}" alt="">
                                    </div>
                                    <div class="contentItem__text">
                                        <h4 class="contentItem__info">
                                            <p class="info__nation">'${user.ngonNgu}'</p>
                                            <p class="info__name">'${user.hoTen}'</p>
                                        </h4>
                                        <p class="contentItem__desc">
                                           '${user.moTa}'
                                        </p>
                                    </div>
                                </div>
                        </div>
            `;
        }
    });
    $$('.teacher__content').innerHTML = content;
}