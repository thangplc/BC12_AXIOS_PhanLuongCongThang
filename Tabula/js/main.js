var positionTop = 0;
$(document).ready(function() {
    $(window).scroll(function() {
        positionTop = $(document).scrollTop();
        console.log(positionTop);
        if (positionTop >= 300) {
            document.getElementsByTagName('header')[0].classList.add('headerScroll');
            setTimeout(() => {
                document.getElementsByTagName('header')[0].classList.add('showMenu');
            }, 50)
        } else if (positionTop <= 150) {
            document.getElementsByTagName('header')[0].classList.remove('showMenu');
            document.getElementsByTagName('header')[0].classList.remove('headerScroll');
        }

    });
});
document.getElementById('subMenu__button').addEventListener('click', () => {
    console.log(positionTop);
    document.getElementById('pageContent').classList.toggle('transfo');
    document.getElementsByTagName('html')[0].classList.toggle('submenu');
    document.getElementsByClassName('navbar-brand')[0].classList.toggle('navbar-brandHiden');
});