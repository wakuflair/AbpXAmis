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
                dialog: {
                    title: "系统提示",
                    body: "对你点击了"
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