
gsap.registerPlugin(TextPlugin);

function Load() {
    var tl = gsap.timeline({
        onComplete: function () { $('.loading').fadeOut(); },
    });

    //Loading Text Anim
    var txt = $('.loading h1').text()
    tl.fromTo($('.loading h1'), { text: "" }, { duration: 2, text: txt, ease: "power2.inOut" });

    //Logo Anim
    tl.fromTo($('g[id|="Layer 1"'), { opacity: 0 }, { opacity: 1, rotation: 360, svgOrigin: "500 500", duration: 3 }, 0);
    tl.fromTo($('g[id|="Layer 3"'), { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 3 }, 0);
    tl.fromTo($('g[id|="Layer 4"'), { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 3 }, 0);
    tl.fromTo($('g[id|="Layer 2"'), { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 3 }, 0);
    tl.fromTo($('g[id|="Layer 5"'), { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 3 }, 0);
}

function changePage(from, to) {
    $('nav a[id|="' + from + '"').removeClass("active");
    $('nav a[id|="' + to + '"').addClass("active");

    var fromPage = $('.page[id|="' + from + '"')
    var toPage = $('.page[id|="' + to + '"')
    toPage.addClass("active");

    var tl = gsap.timeline({

        onComplete: function () { fromPage.removeClass("active"); },
    });
    tl.fromTo(fromPage, { height: '100%', opacity: 1, pointerEvents: "none" }, { height: '0%', opacity: 0, pointerEvents: "all", duration: 0.666, ease: 'circ.inOut' });
    tl.fromTo(toPage, { height: '0%', opacity: 0, pointerEvents: "all" }, { height: '100%', opacity: 1, pointerEvents: "none", duration: 0.666, ease: 'circ.inOut' }, 0);

}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

var currentPage = 0;

$(document).ready(function () {
    //Load();
    $('.loading').fadeOut();

    $(this).on('click', 'nav a:not(".active")', (function () {
        var newPage = $(this).attr("id");
        //$('.page[id|="'+currentPage+'"').slideToggle(1000, "swing");
        //$('.page[id|="'+newPage+'"').slideToggle(1000, "swing");
        changePage(currentPage, newPage);
        currentPage = Number(newPage);
    }));

    $(this).on('wheel', throttle(scrollChange, 1500));

    function scrollChange(e) {
        var lastPage = $('.page').last().attr("id")
        var newPage;
        if (e.originalEvent.deltaY > 0) {
            if (currentPage == lastPage) {
                newPage = 0;
            } else {
                newPage = currentPage + 1;
            }
        } else {
            if (currentPage == 0) {
                newPage = lastPage;
            } else {
                newPage = currentPage - 1;
            }
        };

        changePage(currentPage, newPage);
        currentPage = Number(newPage);
    }
})

/* iOS Hover Fix*/
var iOSHover = function () {
    $('*').on('touchstart', function () {
        $(this).trigger('hover');
    }).on('touchend', function () {
        $(this).trigger('hover');
    });
};
iOSHover();