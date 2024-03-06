$(document).ready(function () {
    $(window).scroll(function () {
       this.scrollY > 20 ? $(".navbar").addClass("sticky") : $(".navbar").removeClass("sticky"), this.scrollY > 500 ? $(".scroll-up-btn").addClass("show") : $(".scroll-up-btn").removeClass("show")
    }), $(".column.left img").on({
       mousemove: function e(t) {
          let o = function e(t, o) {
             let n = o.getBoundingClientRect(),
                s = n.left + n.width / 2,
                a = n.top + n.height / 2,
                l = Math.atan2(t.clientY - a, t.clientX - s);
             return 180 * l / Math.PI
          }(t, this);
          $(this).css({
             transform: "perspective(1000px) rotateX(" + 20 * Math.sin(o * Math.PI / 180) + "deg) rotateY(" + 20 * Math.cos(o * Math.PI / 180) + "deg)",
             "box-shadow": "0 0 10px rgba(0, 0, 0, 0.3)"
          })
       },
       mouseleave: function e() {
          $(this).css({
             transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
             "box-shadow": "none"
          })
       }
    }), $(".home-content a").click(function (e) {
       e.preventDefault(), $("html, body").animate({
          scrollTop: $("#contact").offset().top
       }, 1e3, "swing")
    }), $(".scroll-up-btn").click(function () {
       $("html").animate({
          scrollTop: 0
       }, 1e3), $("html").css("scrollBehavior", "auto")
    }), $(".menu-btn").click(function () {
       $(".navbar .menu").toggleClass("active"), $(".menu-btn i").toggleClass("active")
    });
    let e = {
       strings: ["Video Editor", "Developer", "Et. Hacker", "Designer", "Freelancer"],
       typeSpeed: 100,
       backSpeed: 60,
       loop: !0
    };
    new Typed(".typing", e), new Typed(".typing-2", e), $(".carousel").owlCarousel({
       margin: 20,
       loop: !0,
       autoplay: !0,
       autoplayTimeout: 2e3,
       autoplayHoverPause: !0,
       responsive: {
          0: {
             items: 1,
             nav: !1
          },
          600: {
             items: 2,
             nav: !1
          },
          1e3: {
             items: 3,
             nav: !1
          }
       }
    })
 });