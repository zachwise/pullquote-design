/**
	Pullquote
	Designed and built by Zach Wise at Knight Lab
*/   

/*	Required Files
	CodeKit Import
	http://incident57.com/codekit/
================================================== */
// CORE
	// @codekit-prepend "core/KL.js";
	// @codekit-prepend "core/KL.Util.js";
	// @codekit-prepend "core/KL.Class.js";
	// @codekit-prepend "core/KL.Events.js";
	// @codekit-prepend "core/KL.Browser.js";
	// @codekit-prepend "core/KL.Load.js";
	// @codekit-prepend "data/KL.Data.js";

// ANIMATION
	// @codekit-prepend "animation/KL.Ease.js";
	// @codekit-prepend "animation/KL.Animate.js";

// DOM
	// @codekit-prepend "dom/KL.DomMixins.js";
	// @codekit-prepend "dom/KL.Dom.js";
	// @codekit-prepend "dom/KL.DomUtil.js";
	// @codekit-prepend "dom/KL.DomEvent.js";
	// @codekit-prepend "dom/KL.StyleSheet.js";

// QUOTE
	// @codekit-prepend "quote/KL.QuoteComposition.js";


 

KL.Pullquote = (function() {

	// DOM ELEMENTS
	this.el = {
		cover_content: 		KL.Dom.get("cover-content"),
		examples: 			KL.Dom.get("examples"),
		examples_content: 	{},

	};

	// OPTIONS
	this.options = {
		width: 				window.innerWidth,
		height: 			window.innerHeight,
	};
	
	// SLIDER
	this.slider = {};

	// Quote Objects
	this.quotes = [];

	// Quote Compositions
	this.quote_compositions = [];

	//this._el.menubar			= VCO.Dom.create('div', 'vco-menubar', this._el.container);
	
	// API URL
	this.api_url = "quotes.json";

	// LOAD EXAMPLE QUOTES
	this.load_quotes = function() {

		KL.getJSON(api_url ,function(d) {
			this.createQuoteObjects(d);
			this.createCompositions(d);
		});
	};

	// CREATE COMPOSITIONS
	this.createCompositions = function(d) {

		this.quote_compositions = [];
		
		// LAYOUT
		this.el.examples.innerHTML = "";
		this.el.examples_content = KL.Dom.create('div', 'editor-content', this.el.examples);


		for (i=0; i < this.quotes.length; i++) {
			this.createComposition(this.quotes[i], false);
			this.createComposition(this.quotes[i], "left");
			this.createComposition(this.quotes[i], "right");
		}

	};

	this.createComposition = function(d, anchor) {
		var composition = new KL.QuoteComposition(d, {anchor:anchor});
		composition.addTo(this.el.examples_content);
		this.quote_compositions.push(composition);
	};

	this.createQuoteObjects = function(d) {
		this.quotes = [];

		for (i=0; i < d.quotes.length; i++) {
			var quote = {
				quote: "",
				cite: "",
				credit: "",
				headline:"",
				image: ""
			};

			quote = d.quotes[i];

			this.quotes.push(quote);

		}
	};

	/*	EVENTS
	================================================== */


	window.onresize = function(event) {

		this.options.width = window.innerWidth;
		this.options.height = window.innerHeight;
	}

	/*	LISTENERS
	================================================== */
	//KL.DomEvent.addListener(this.el.btn_quote_create, 'click', this._onQuoteCreate, this);

	/*	INIT
	================================================== */
	this.load_quotes();
	

})();





