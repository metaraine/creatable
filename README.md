# DEPRECATED

Creatable was created a long time ago, long before React. React is I think the realization of the vision of Creatable. It has a similar syntax when ReactDOM is used directly. React solves the performance issue with immutability and virtual DOM diffing, a new standard. And while React does not have anything to say about data binding itself, frameworks like Redux and many others provide opinions about managing data in cooperation with your view. 

In short, I highly recommend React on any size project. In order to reflect the terse, Javascript-centric syntax of Creatable, eschew JSX in favor of [ReactDOM](https://facebook.github.io/react/docs/react-without-jsx.html) or Uber's [r-dom](https://github.com/uber/r-dom). 

---

Create DOM Elements with nestable arrays that reflect the structure of HTML:

```javascript
document.body.appendChild(Creatable.create(
	["#content", [
		["h1.prominent", "Blogs"],
		["ul", [
			["li a", { href: "http://functionsource.com" }, "FunctionSource"],
			["li a", { href: "http://javascriptweblog.wordpress.com" }, "Javascript, Javascript"],
			["li a", { href: "http://ejohn.org/category/blog" }, "John Resig"]
		]]
	]]
))
```

Results in:

```html
<div id="content">
	<h1 class="prominent">Blogs</h1>
	<ul>
		<li><a href="http://functionsource.com">FunctionSource</a></li>
		<li><a href="http://javascriptweblog.wordpress.com">Javascript, Javascript</a></li>
		<li><a href="http://ejohn.org/category/blog">John Resig</a></li>
	</ul>
</div>
```

It all happens with one function: **Creatable.create**

```javascript
Creatable.create([TAGNAME, ATTRIBUTES, CHILDREN|CONTENT]) // returns a native DOM element
Creatable.create(["a", { href: "http://google.com" }, "Google"]);
```

Why?
-----------
* Switching in and out of Javascript and whatever templating language you use is ugly.
* No special templating language syntax. 100% pure Javascript.
* Implement view composition using plain, old functions.
* Properly formatted input still reflects the actual structure of HTML for readability.

Documentation
===========

Specify ids and classes with css-syntax
-----------

```javascript
Creatable.create(["div#footer", [
	["p.fine-print", "Don't forget to read this!"]
]])
```

```html
<div id="footer">
	<p class="fine-print">Don't forget to read this!</p>
</div>
```

Document Fragments
-----------

```javascript
Creatable.create([[
	["p", "First paragraph!!!"],
	["p", "Second paragraph!!!"],
	["p", "Third paragraph I'm bored"]
]]);
```

```html
<p>First paragraph!!!"</p>
<p>Second paragraph!!!"</p>
<p>Third paragraph I'm bored</p>
```

HTML is automatically escaped
-----------

```javascript
Creatable.create(['p', 'Something <strong>important</strong> to say.'])
```

```html
<p>Something &lt;strong&gt;important&lt;/strong&gt; to say.</p>
```

You can unescape HTML by adding { html: true }

```javascript
Creatable.create(['p', { html: true }, 'Something <strong>important</strong> to say.'])
```

```html
<p>Something <strong>important</strong> to say.</p>
```

Highly compatible with underscore and functional programming
-----------

```javascript
var links = [
	{ url: "http://functionsource.com", label: "FunctionSource" },
	{ url: "http://javascriptweblog.wordpress.com", label: "Javascript, Javascript" },
	{ url: "http://ejohn.org/category/blog", label: "John Resig" }
];

var buildLinkItem = function(model) {
	return ["li", [
		["a", { href: model.url }, model.label]
	]];
};

Creatable.create(["ul", _.map(links, buildLinkItem)])
```

```html
<ul>
	<li><a href="http://functionsource.com">FunctionSource</a></li>
	<li><a href="http://javascriptweblog.wordpress.com">Javascript, Javascript</a></li>
	<li><a href="http://ejohn.org/category/blog">John Resig</a></li>
</ul>
```

Built-in support for jQuery elements
-----------
```javascript
Creatable.create(["#myModule", [
	["h1", "This is a header"],
	"Some text.",
	$("<div><p>Go, Go jQuery</p></div>")
]])
```

```html
<div id="myModule">
	<h1>This is a header</h1>
	Some text.
	<div><p>Go, Go jQuery</p></div>
</div>
```

Use it to return a string of HTML instead of a DOM node
-----------
```javascript
var html = Creatable.createHtml(['a#go.small.button', 'test']);
console.log(html); //<a id="go" class="small button">test</a>
```


Unit Tests
===========

**creatable** has full [unit test coverage](https://github.com/RaineOrShine/creatable/tree/master/test) using mocha.

Speed Tests
===========
**creatable** [speed tested against underscore] (http://jsperf.com/creatable-vs-underscore-cached-vs-dom) using Benchmark.js

Installation
===========

Just include creatable.js in your HTML:

```html
<script src="creatable.js"></script>
```


