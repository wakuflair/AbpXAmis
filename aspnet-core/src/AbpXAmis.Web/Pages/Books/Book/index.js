$(function () {

    var l = abp.localization.getResource('AbpXAmis');
    var service = abpXAmis.books.book;

    (function () {
        let amis = amisRequire('amis/embed');
        let amisScoped = amis.embed('#root', {
            type: 'page',
            title: 'AMIS Demo',
            body: 'hello world'
        });
    })();
});