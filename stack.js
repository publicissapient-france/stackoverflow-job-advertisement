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
loadScript('https://xebia-france.github.io/stackoverflow-job-advertisement/tinybox.js', function () {
    loadCss('https://xebia-france.github.io/stackoverflow-job-advertisement/style.css', function () {
        TINY.box.show({url: 'https://xebia-france.github.io/stackoverflow-job-advertisement/popup.html', close: true});
    });
});