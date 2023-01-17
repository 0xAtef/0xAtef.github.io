// var TxtRotate = function (el, toRotate, period) {
//     this.toRotate = toRotate;
//     this.el = el;
//     this.loopNum = 0;
//     this.period = parseInt(period, 10) || 2000;
//     this.txt = '';
//     this.tick();
//     this.isDeleting = false;
// };

// TxtRotate.prototype.tick = function () {
//     var i = this.loopNum % this.toRotate.length;
//     var fullTxt = this.toRotate[i];

//     if (this.isDeleting) {
//         this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//         this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

//     var that = this;
//     var delta = 150 - Math.random() * 100;

//     if (this.isDeleting) {
//         delta /= 2;
//     }

//     if (!this.isDeleting && this.txt === fullTxt) {
//         delta = this.period;
//         this.isDeleting = true;
//     } else if (this.isDeleting && this.txt === '') {
//         this.isDeleting = false;
//         this.loopNum++;
//         delta = 500;
//     }

//     setTimeout(function () {
//         that.tick();
//     }, delta);
// };

// window.onload = function () {
//     var elements = document.getElementsByClassName('txt-rotate');
//     for (var i = 0; i < elements.length; i++) {
//         var toRotate = elements[i].getAttribute('data-rotate');
//         var period = elements[i].getAttribute('data-period');
//         if (toRotate) {
//             new TxtRotate(elements[i], JSON.parse(toRotate), period);
//         }
//     }
// };

new Typed('#typed', {
    strings: ["⚡ I goes online by 0xAtef",
        "but $Whoami",
        "I&#39;m a Cyber Security Engineer.",
        "Enthusiastic about Incident Response,",
        "Enthusiastic about Digital Forensics,",
        "Enthusiastic about Threat Detection",
        "Enthusiastic about Threat Hunting.",
        "Enthusiastic about Threat Emulation,",
        "Mainly more into Blue/Purple teams.",
        "I&#39;m also a Coder and a Scripts Holic 😄",
        "Automation is one of my easiest games",
        "I always work on automate any repetitive task that would face me daily along with my work.",
        "I&#39;m Fond about learning or gaining new knowledge&#39;s always seek to sharpen my Skills set.",
        "Currently, I&#39;m interested in dockerize 🐳 any new implementation/technology",
        "👉 Enjoy my work as a Senior SOC Analyst, Incident Responder with over a year of experience in Security Operation Center Analysis.",
        "⚡ For Me, nothing is better than a quiet night, a cup of coffee ,and dark mode IDE",
        "💬 A Wise Man once said &#39;You Need To understand what you protect&#39;",
        "👋👋👋"
    ],
    stringsElement: null,
    // typing speed
    typeSpeed: 60,
    // time before typing starts
    startDelay: 600,
    // backspacing speed
    backSpeed: 20,
    // time before backspacing
    backDelay: 500,
    // loop
    loop: true,
    // false = infinite
    loopCount: false,
    // show cursor
    showCursor: true,
    // character for cursor
    cursorChar: "|",
    // attribute to type (null == text)
    attr: null,
    // either html or text
    contentType: 'html',
});
// new Typed('#about_typed', {
//     strings: ["Cyber Defense",
//         "Blue Team",
//         "DFIR Enthusiastic",
//         "Code Holic"
//     ],
//     stringsElement: null,
//     // typing speed
//     typeSpeed: 75,
//     // time before typing starts
//     startDelay: 600,
//     // backspacing speed
//     backSpeed: 20,
//     // time before backspacing
//     backDelay: 500,
//     // loop
//     loop: true,
//     // false = infinite
//     loopCount: false,
//     // show cursor
//     showCursor: false,
//     // character for cursor
//     cursorChar: "|",
//     // attribute to type (null == text)
//     attr: null,
//     // either html or text
//     contentType: 'html',
// });