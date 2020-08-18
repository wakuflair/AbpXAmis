$(function () {

    const l = abp.localization.getResource("AbpXAmis");

    // 创建, 编辑书籍表单使用的控件
    let createEditControls = [
        {
            type: "hidden",
            name: "id"
        },
        {
            label: l("BookName"),
            type: "text",
            name: "name",
            mode: "normal",
            required: true
        },
        {
            type: "select",
            label: l("BookType"),
            name: "type",
            options: [],  // 初始为空, 具体内容通过下面的代码设置
            value: "0",
            checkAll: false,
            mode: "normal",
            defaultCheckAll: false,
            required: true
        },
        {
            type: "date",
            label: l("BookPublishDate"),
            name: "publishDate",
            inputFormat: "YYYY-MM-DD",
            mode: "normal",
            format: "YYYY-MM-DD",
            required: true
        },
        {
            type: "number",
            label: l("BookPrice"),
            name: "price",
            mode: "normal",
            min: "0",
            percision: 2,
            required: true
        }
    ];
    // 设置options
    for (let i = 0; i < 9; i++) {
        createEditControls[2].options.push({
            label: l(`Enum:BookType:${i}`),
            value: i
        });
    }

    // 书籍列表JSON
    let index = {
            type: "page",
            title: l("Book"),
            toolbar: [
                {
                    type: "button",
                    label: l("CreateBook"),
                    visibleOn: "abp.auth.isGranted('AbpXAmis.Book.Create')",
                    actionType: "dialog",
                    dialog: {
                        title: l("CreateBook"),
                        type: "dialog",
                        closeOnEsc: true,
                        showCloseButton: true,
                        body: [
                            {
                                type: "form",
                                api: {
                                    url: "/api/app/book",
                                    method: "get",
                                    adaptor: (payload, response) => {
                                        // 转换ABP API返回的结果为amis需要的结构
                                        return {
                                            status: response.status === 200 ? 0 : response.status,
                                            data: {
                                                book: payload,
                                            }
                                        };
                                    },
                                },
                                controls: createEditControls
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
                        // 处理书籍类型的本地化
                        let items = payload.items;
                        items.forEach(item => {
                            item.typeText = l(`Enum:BookType:${item.type}`);
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
                        name: "typeText",
                        label: l("BookType"),
                        sortable: true,
                        // tpl: "l('Enum:BookType:${type}')"  // 这种本地化是无效的, 所以只能在adaptor中处理
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
                    {
                        type: "operation",
                        label: l("Actions"),
                        visibleOn: "abp.auth.isGranted('AbpXAmis.Book.Update') || abp.auth.isGranted('AbpXAmis.Book.Delete')",
                        buttons: [
                            {
                                type: "button",
                                visibleOn: "abp.auth.isGranted('AbpXAmis.Book.Update')",
                                icon: "fa fa-edit",
                                iconClassName: "pull-left",
                                actionType: "dialog",
                                label: l("Edit"),
                                dialog: {
                                    title: l("EditBook"),
                                    closeOnEsc: true,
                                    showCloseButton: true,
                                    body: {
                                        type: "form",
                                        api: {
                                            url: "/api/app/book/$id",
                                            method: "put",
                                            adaptor: (payload, response) => {
                                                // 转换ABP API返回的结果为amis需要的结构
                                                return {
                                                    status: response.status === 200 ? 0 : response.status,
                                                    data: {
                                                        book: payload
                                                    }
                                                };
                                            },
                                        },
                                        controls: createEditControls,
                                        initApi: {
                                            url: "/api/app/book/$id",
                                            method: "get",
                                            adaptor: (payload, response) => {
                                                // 转换ABP API返回的结果为amis需要的结构
                                                return {
                                                    status: response.status === 200 ? 0 : response.status,
                                                    data: payload 
                                                };
                                            },
                                        },
                                    }
                                }
                            },
                            {
                                type: "button",
                                visibleOn: "abp.auth.isGranted('AbpXAmis.Book.Delete')",
                                icon: "fa fa-times text-danger",
                                iconClassName: "pull-left",
                                label: l("Delete"),
                                actionType: "ajax",
                                confirmText: l("BookDeletionConfirmationMessage", "${name}"),
                                api: {
                                    url: "/api/app/book/$id",
                                    method: "delete",
                                    adaptor: (payload, response) => {
                                        // 转换ABP API返回的结果为amis需要的结构
                                        return {
                                            status: response.status === 204 ? 0 : response.status,
                                        };
                                    },
                                },
                                messages: {
                                    success: l("SuccessfullyDeleted"),
                                }
                            }
                        ]
                    },
                ]
            }
        }
    ;

    (function () {
        let amis = amisRequire("amis/embed");
        let amisScoped = amis.embed("#root", index);
    })();
});