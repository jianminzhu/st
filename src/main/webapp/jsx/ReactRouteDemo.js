var Router = ReactRouter; // 由于是html直接引用的库，所以 ReactRouter 是以全局变量的形式挂在 window 上
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
var StateMixin = ReactRouter.State;
/**
 * 图书列表组件
 */
var Books = React.createClass({
    render: function () {
        return (React.createElement("ul", null,
            React.createElement("li", { key: 1 },
                React.createElement(Link, { to: "book", params: { id: 1 } }, "\u6D3B\u7740")),
            React.createElement("li", { key: 2 },
                React.createElement(Link, { to: "book", params: { id: 2 } }, "\u632A\u5A01\u7684\u68EE\u6797")),
            React.createElement("li", { key: 3 },
                React.createElement(Link, { to: "book", params: { id: 3 } }, "\u4ECE\u4F60\u7684\u5168\u4E16\u754C\u8D70\u8FC7")),
            React.createElement(RouteHandler, null)));
    }
});
/**
 * 单本图书组件
 */
var Book = React.createClass({
    mixins: [StateMixin],
    render: function () {
        return (React.createElement("article", null,
            React.createElement("h1", null,
                "\u8FD9\u91CC\u662F\u56FE\u4E66 id \u4E3A ",
                this.getParams()['id'],
                " \u7684\u8BE6\u60C5\u4ECB\u7ECD")));
    }
});
/**
 * 电影列表组件
 */
var Movies = React.createClass({
    render: function () {
        return (React.createElement("ul", null,
            React.createElement("li", { key: 1 },
                React.createElement(Link, { to: "movie", params: { id: 1 } }, "\u714E\u997C\u4FA0")),
            React.createElement("li", { key: 2 },
                React.createElement(Link, { to: "movie", params: { id: 2 } }, "\u6349\u5996\u8BB0")),
            React.createElement("li", { key: 3 },
                React.createElement(Link, { to: "movie", params: { id: 3 } }, "\u897F\u6E38\u8BB0\u4E4B\u5927\u5723\u5F52\u6765"))));
    }
});
/**
 * 单部电影组件
 */
var Movie = React.createClass({
    mixins: [StateMixin],
    render: function () {
        return (React.createElement("article", null,
            React.createElement("h1", null,
                "\u8FD9\u91CC\u662F\u7535\u5F71 id \u4E3A ",
                this.getParams().id,
                " \u7684\u8BE6\u60C5\u4ECB\u7ECD")));
    }
});
// 应用入口
var App = React.createClass({
    render: function () {
        return (React.createElement("div", { className: "app" },
            React.createElement("nav", null,
                React.createElement("a", { href: "#" },
                    React.createElement(Link, { to: "movies" }, "\u7535\u5F71")),
                React.createElement("a", { href: "#" },
                    React.createElement(Link, { to: "books" }, "\u56FE\u4E66"))),
            React.createElement("section", null,
                React.createElement(RouteHandler, null))));
    }
});
// 定义页面上的路由
var routes = (React.createElement(Route, { handler: App },
    React.createElement(Route, { name: "movies", handler: Movies }),
    React.createElement(Route, { name: "movie", path: "/movie/:id", handler: Movie }),
    React.createElement(Route, { name: "books", handler: Books }),
    React.createElement(Route, { name: "book", path: "/book/:id", handler: Book })));
// 将匹配的路由渲染到 DOM 中
Router.run(routes, Router.HashLocation, function (Root) {
    React.render(React.createElement(Root, null), document.body);
});
//# sourceMappingURL=ReactRouteDemo.js.map