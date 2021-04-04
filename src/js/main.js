class FlexMenu {
    constructor(more_text, MoreClass, MoreDrapdawnClass) {
        this.more_text = (more_text) ? more_text : '...',
            this.MoreClass = (MoreClass) ? MoreClass : 'more-button',
            this.MoreDrapdawnClass = (MoreDrapdawnClass) ? MoreDrapdawnClass : 'more-dropdawn';

        return this;
    }

    RemoveOpened(folder) {
        folder.classList.remove('_opened');
    }

    HoverDelay(item) {
        var Time;

        item.addEventListener('mouseover', function (event) {
            this.classList.add('_opened');

            if (Time) {
                clearTimeout(Time);
            }
        });

        let parentEntity = this;
        item.addEventListener('mouseleave', function (event) {
            var folder = this;
            Time = setTimeout(function () {
                parentEntity.RemoveOpened(folder);
            }, 800);
        });

    }


    init(options) {

        let menu = document.querySelector('.menu'),
                    menuOffsetWidth = menu.offsetWidth,
                    menu_width = parseInt(getComputedStyle(menu).maxWidth.replace('px', '')),
                    menu_folder = menu.querySelectorAll('li'),
                    MaxWidth = 0,
                    TagsWidth = [];
        let more = document.createElement('li');

        if (menuOffsetWidth < menu_width) {

            more.classList.add(this.MoreClass);
            more.innerHTML = '<a href="javascript:void(0);">' + this.more_text + '</a><ul class=" ' + this.MoreDrapdawnClass + ' "></ul>';

            menu.querySelector('ul').append(more);
        } else if (menu_width == menuOffsetWidth) {
            return;
        }

        for (var i = 0, count = 0; i < menu_folder.length; i++) {


            if (menu_folder[i].parentNode.parentNode.classList.contains('menu')) {

                TagsWidth[count] = menu_folder[i].offsetWidth;

                if (MaxWidth < menuOffsetWidth - more.offsetWidth) {
                    MaxWidth += TagsWidth[count];
                } else {
                    more.querySelector("ul." + this.MoreDrapdawnClass).append(menu_folder[i]);
                }
                count++;
            }

            this.HoverDelay(menu_folder[i]);
            this.HoverDelay(more);
        }

        var last = menu.children[0].childElementCount - 2;
        more.querySelector('ul.' + this.MoreDrapdawnClass).prepend(menu.children[0].children[last]);
    }


    ReactPosition() {
        let window = document.documentElement.clientWidth,
            menu = document.querySelector('.menu'),
            submenu = menu.children[0].querySelectorAll('ul');

        submenu.forEach(function (item, i, arr) {

            var left = Math.ceil(item.getBoundingClientRect().left);
            var right = Math.ceil(item.getBoundingClientRect().right);

            // item.setAttribute('react-left', left);
            // item.setAttribute('react-right', right);


            //check direction

            if (left > window) {
                item.style.left = '100%';
                item.style.right = 'initial';
                item.setAttribute('direct', 'right');

            } else if (right > window) {

                item.style.right = '100%';
                item.style.left = 'initial';
                item.setAttribute('direct', 'left');

            } else if (item.getAttribute('direct') == 'left') {
                item.style.right = '100%';
                item.style.left = 'initial';
            } else if (item.getAttribute('direct') == 'right') {
                item.style.left = '100%';
                item.style.right = 'initial';
            }

            //sometimes all your code contains stupid ifs

            var hasAttr = item.parentElement.parentElement.hasAttribute('direct');


            if (hasAttr) {
                var value = item.parentElement.parentElement.getAttribute('direct');
                item.setAttribute('direct', value);
            }

            if (item.getAttribute('direct') == 'left') {
                item.style.right = '100%';
                item.style.left = 'initial';
            } else if (item.getAttribute('direct') == 'right') {
                item.style.left = '100%';
                item.style.right = 'initial';
            }

            item.classList.add('closed');
        });


        //.getBoundingClientRect()
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    const mediaQuery = window.matchMedia('(max-width: 769px)')

    const burger = new FlexMenu('МЕНЮ', 'more-button', 'more-dropdawn');
    burger.init();

    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay: 4000,
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        paginationClickable: true,

        pagination: {
            el: '.swiper-pagination',
        }
    });

    if (mediaQuery.matches) {
        console.log('tezx');
        const brands = new Swiper('#swiper_mobile', {
            paginationClickable: true,

            pagination: {
                el: '.swiper-paginations',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },

                768: {
                    slidesPerView: 2,
                    spaceBetween: 40
                }
            }
        });
        brands.update();
    }

    let tab = document.querySelector('.accordeon');
    tab.addEventListener("click", function (event) {
        document.querySelector('.bottom_head .wrap').classList.toggle('open');
    });

});