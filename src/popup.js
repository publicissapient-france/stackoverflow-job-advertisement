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
var url = "https://xebia-france.github.io/stackoverflow-job-advertisement/";
loadCss(url + 'tinybox.css', function () {
    TINY.box.show({
        html: '<%= html %>',
        close: true
    });
});