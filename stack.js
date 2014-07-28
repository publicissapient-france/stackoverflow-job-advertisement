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
loadScript('tinybox.js', function () {loadCss('style.css', function () {TINY.box.show({url:'popup.html', close: true});});});