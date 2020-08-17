$(function () {

    var l = abp.localization.getResource('AbpXAmis');
    var service = abpXAmis.books.book;

    let indexJson = {
        "type": "page",
        "title": l("Book"),
        "toolbar": [
            {
                "type": "button",
                "label": l("CreateBook"),
                "actionType": "dialog",
                "dialog": {
                    "title": "系统提示",
                    "body": "对你点击了"
                },
                "icon": "fa fa-plus",
                "iconClassName": "pull-left"
            }
        ],
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
                    "tpl": "${publishDate | date:LL:YYYY-MM-DD}"
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
                    "tpl": "${creationTime | date:LL:YYYY-MM-DD}"
                },
            ]
        }
    };

    (function () {
        let amis = amisRequire('amis/embed');
        let amisScoped = amis.embed('#root', indexJson);
    })();
});