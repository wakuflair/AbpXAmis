$(function () {

    var l = abp.localization.getResource("AbpXAmis");

    let amisJson = {
        type: "page",
        title: l("Book"),
        toolbar: [
            {
                type: "button",
                label: l("CreateBook"),
                actionType: "dialog",
                "dialog": {
                    "title": l("CreateBook"),
                    "type": "dialog",
                    "closeOnEsc": true,
                    "showCloseButton": true,
                    "body": [
                        {
                            "type": "form",
                            "api": {
                                url: "/api/app/book",
                                adaptor: (payload, response) => {
                                    // 转换ABP CreateBook返回的结果为amis需要的结构
                                    return {
                                        status: response.status === 200 ? 0 : response.status,
                                        data: {
                                            book: payload,
                                        }
                                    };
                                },
                            },
                            "controls": [
                                {
                                    "label": l("BookName"),
                                    "type": "text",
                                    "name": "name",
                                    "mode": "normal",
                                    "required": true
                                },
                                {
                                    "type": "select",
                                    "label": l("BookType"),
                                    "name": "type",
                                    "options": [
                                        {
                                            "label": l("Enum:BookType:0"),
                                            "value": "0"
                                        },
                                        {
                                            "label": l("Enum:BookType:1"),
                                            "value": "1"
                                        },
                                        {
                                            "label": l("Enum:BookType:2"),
                                            "value": "2"
                                        },
                                        {
                                            "label": l("Enum:BookType:3"),
                                            "value": "3"
                                        },
                                        {
                                            "label": l("Enum:BookType:4"),
                                            "value": "4"
                                        },
                                        {
                                            "label": l("Enum:BookType:5"),
                                            "value": "5"
                                        },
                                        {
                                            "label": l("Enum:BookType:6"),
                                            "value": "6"
                                        },
                                        {
                                            "label": l("Enum:BookType:7"),
                                            "value": "7"
                                        },
                                        {
                                            "label": l("Enum:BookType:8"),
                                            "value": "8"
                                        }
                                    ],
                                    "value": "0",
                                    "checkAll": false,
                                    "mode": "normal",
                                    "defaultCheckAll": false,
                                    "required": true
                                },
                                {
                                    "type": "date",
                                    "label": l("BookPublishDate"),
                                    "name": "publishDate",
                                    "inputFormat": "YYYY-MM-DD",
                                    "mode": "normal",
                                    "format": "YYYY-MM-DD",
                                    "required": true
                                },
                                {
                                    "type": "number",
                                    "label": l("BookPrice"),
                                    "name": "price",
                                    "mode": "normal",
                                    "min": "0",
                                    "percision": 2,
                                    "required": true
                                }
                            ]
                        }
                    ],
                },
                icon: "fa fa-plus",
                iconClassName: "pull-left"
            }
        ],
        body: {
            type: "crud",
            api: {
                url: "/api/app/book",
                method: "post",   // 临时使用post, 下面再改回get, 原因: https://github.com/baidu/amis/issues/853
                requestAdaptor: api => {
                    let sorting = "";
                    if (api.data.orderBy) {
                        // 拼接ABP排序字符串, 例:name asc 或 price desc
                        sorting = `${api.data.orderBy} ${api.data.orderDir}`;
                    }
                    return {
                        ...api,
                        method: "get",
                        // 构造ABP GetList方法需要的参数
                        data: {
                            skipCount: (api.data.page - 1) * api.data.perPage,
                            maxResultCount: api.data.perPage,
                            sorting: sorting,
                        }
                    };
                },
                adaptor: (payload, response) => {
                    // 因为在处理书籍类型的本地化
                    let items = payload.items;
                    items.forEach(item => {
                        item.type = l(`Enum:BookType:${item.type}`);
                    });
                    // 转换ABP GetList返回的结果为amis需要的结构
                    return {
                        status: response.status === 200 ? 0 : response.status,
                        data: {
                            items: payload.items,
                            total: payload.totalCount
                        }

                    };
                },
                replaceData: true
            },
            columns: [
                {
                    name: "name",
                    label: l("BookName"),
                    sortable: true
                },
                {
                    name: "type",
                    label: l("BookType"),
                    sortable: true,
                    // tpl: l("Enum:BookType:${type}")  // 这种本地化是无效的, 所以只能在adaptor中处理
                },
                {
                    name: "publishDate",
                    label: l("BookPublishDate"),
                    sortable: true,
                    tpl: "${publishDate | date:LL:YYYY-MM-DD}"    // `LL`指定输出日期格式(本地日期格式), `YYYY-MM-DD`指定输入日期格式
                },
                {
                    name: "price",
                    label: l("BookPrice"),
                    sortable: true,
                    tpl: "${price | round:2}"
                },
                {
                    name: "creationTime",
                    label: l("BookCreationTime"),
                    sortable: true,
                    tpl: "${creationTime | date:LL:YYYY-MM-DD}"
                },
            ]
        }
    };

    (function () {
        let amis = amisRequire("amis/embed");
        let amisScoped = amis.embed("#root", amisJson);
    })();
});