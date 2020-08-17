$(function () {

    var l = abp.localization.getResource('AbpXAmis');
    var service = abpXAmis.books.book;

    let indexJson = {
        "type": "page",
        "body": {
            "type": "crud",
            "api": {
                "url": "/api/app/book",
                "data": {
                    "skipCount": 0,
                    "maxResultCount": 10
                },
                "adaptor": function (payload, response) {
                    console.log(response);
                    return {
                        status: response.status === 200 ? 0 : response.status,
                        data: {
                            items: payload.items,
                            total: payload.totalCount
                        }

                    };
                },
                "replaceData": true
            },
            "columns": [
                {
                    "name": "name",
                    "label": l("BookName")
                },
                {
                    "name": "type",
                    "label": l("BookType")
                },
                {
                    "name": "publishDate",
                    "label": l("BookPublishDate")
                },
                {
                    "name": "price",
                    "label": l("BookPrice")
                },
                {
                    "name": "creationTime",
                    "label": l("BookCreationTime")
                },
            ]
        }
    };

    (function () {
        let amis = amisRequire('amis/embed');
        let amisScoped = amis.embed('#root', indexJson);
    })();
});