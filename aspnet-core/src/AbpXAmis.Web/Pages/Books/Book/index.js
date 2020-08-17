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
                    "sorting": "${orderBy} ${orderDir}" 
                },
/*
                "requestAdaptor": function (api) {
                    console.log(api);
                    return {
                        data: {
                            // skipCount: (api.data.page - 1) * api.data.perPage,
                            // maxResultCount: "${perPage}"
                            "sorting": {
                                "type": "tpl",
                                "tpl": "${orderBy} ${orderDir}"
                            }
                        }
                    }
                },
*/
                "adaptor": function (payload, response) {
                    let items = payload.items;
                    items.forEach(item => {
                        item.type = l(`Enum:BookType:${item.type}`); 
                    });
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
                    "label": l("BookName"),
                    "sortable": true
                },
                {
                    "name": "type",
                    "label": l("BookType"),
                    "sortable": true,
                },
                {
                    "name": "publishDate",
                    "label": l("BookPublishDate"),
                    "sortable": true,
                    "tpl": "${publishDate | date:LL}"
                },
                {
                    "name": "price",
                    "label": l("BookPrice"),
                    "sortable": true,
                    "tpl": "${price | round:2}"
                },
                {
                    "name": "creationTime",
                    "label": l("BookCreationTime"),
                    "sortable": true,
                    "tpl": "${publishDate | date:LL}"
                },
            ]
        }
    };

    (function () {
        let amis = amisRequire('amis/embed');
        let amisScoped = amis.embed('#root', indexJson);
    })();
});