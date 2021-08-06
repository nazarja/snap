export default Object.freeze({
    q: query => document.querySelector(query),
    qAll: queryAll => document.querySelectorAll(queryAll),
    tag: tag => document.getElementsByTagName(tag),
    id: id => document.getElementById(id),
    class: className => document.getElementsByClassName(className),
});