function loadCss(css, callback) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = css;
    link.onreadystatechange = callback;
    link.onload = callback;
    head.appendChild(link);
}
var url = "//xebia-france.github.io/stackoverflow-job-advertisement/";
loadCss(url + 'tinybox.css', function () {
    TINY.box.show({
        html: '<%= html %>',
        close: true
    });
});

document.getElementById("game").addEventListener('click', function () {
    var KICKASSVERSION='2.0';
    var s = document.createElement('script');
    s.type='text/javascript';
    document.body.appendChild(s);
    s.src='//hi.kickassapp.com/kickass.js';
});