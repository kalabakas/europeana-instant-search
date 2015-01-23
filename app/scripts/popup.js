  var templateItem = Hogan.compile(
  	'<div class="hit">' +
  		'<img class="image-attribute" src={{edmPreview}}/>'+
  		'<span class="primary-attribute">'+
  			'<a href="{{guid}}">{{title}}</a>'+
  		'</span>'+
  		'<span class="secondary-attribute">{{dataProvider}}</span>'+
  		'<span class="clearfix"></span>'+
  	'</div>');

	$(document).ready(function() {
	  var algolia = new AlgoliaSearch("2SMV2HKN8F", "56fe227808d599d13a268d171e6b2dc8");
	  var index = algolia.initIndex('Europeana');

	  $('#typeahead-algolia').typeahead(null, {
	    source: index.ttAdapter({ "hitsPerPage": 5 }),
	    displayKey: 'title', // attribute used for display
	    templates: {
	      suggestion: function(hit) {
	      	return templateItem.render(hit);
	      }
	    }
	  }).on('typeahead:selected', function(event, suggestion, dataset) {
	    if ('guid' !== '') {
	      chrome.tabs.create({url: suggestion['guid']});
	    }
	  }).focus();
	});