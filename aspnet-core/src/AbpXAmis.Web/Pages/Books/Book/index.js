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
                    "title": "添加书籍",
                    "type": "dialog",
                    "closeOnEsc": true,
                    "showCloseButton": true,
                    "body": [
                        {
                            "type": "form",
                            "controls": [
                                {
                                    "label": "书名",
                                    "type": "text",
                                    "name": "name",
                                    "mode": "normal",
                                    "required": true
                                },
                                {
                                    "type": "select",
                                    "label": "类型",
                                    "name": "type",
                                    "options": [
                                        {
                                            "label": "未定义",
                                            "value": "0"
                                        },
                                        {
                                            "label": "冒险",
                                            "value": "1"
                                        },
                                        {
                                            "label": "传记",
                                            "value": "2"
                                        },
                                        {
                                            "label": "反乌托邦",
                                            "value": "3"
                                        },
                                        {
                                            "label": "幻想",
                                            "value": "4"
                                        },
                                        {
                                            "label": "恐怖",
                                            "value": "5"
                                        },
                                        {
                                            "label": "科学",
                                            "value": "6"
                                        },
                                        {
                                            "label": "科幻",
                                            "value": "7"
                                        },
                                        {
                                            "label": "诗歌",
                                            "value": "8"
                                        }
                                    ],
                                    "value": "0",
                                    "checkAll": false,
                                    "mode": "normal",
                                    "defaultCheckAll": false,
                                    "checkAllLabel": "全选",
                                    "required": true
                                },
                                {
                                    "type": "date",
                                    "label": "出版日期",
                                    "name": "publishDate",
                                    "inputFormat": "YYYY年MM月DD日",
                                    "mode": "normal",
                                    "format": "LL",
                                    "required": true
                                },
                                {
                                    "type": "number",
                                    "label": "价格",
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