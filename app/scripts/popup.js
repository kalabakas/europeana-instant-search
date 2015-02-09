  var templateItem = Hogan.compile(
  	'<div class="hit">' +
  		'<img class="image-attribute" src="{{edmPreview}}"/>'+
  		'<span class="primary-attribute">'+
  			'<a href="{{guid}}">{{title}}</a>'+
  		'</span>'+
  		'<span class="secondary-attribute">{{dataProvider}}</span>'+
  		'<span class="clearfix"></span>'+
  	'</div>');

	$(document).ready(function() {
	  var algolia = new AlgoliaSearch('2SMV2HKN8F', '56fe227808d599d13a268d171e6b2dc8');
	  var index = algolia.initIndex('Europeana');

	  $('#typeahead-algolia').typeahead(null, {
	    source: index.ttAdapter({ "hitsPerPage": 5 }),
	    displayKey: 'title', // attribute used for display
	    templates: {
	      suggestion: function(hit) {
	      	console.log(hit);
	      	console.log("and after");
	      	if (hit.edmPreview === undefined){
					      		
	      		//TEXT, VIDEO, SOUND, IMAGE, 3D    	
	      		switch(hit.type) {
				    case 'TEXT':
				        hit.edmPreview = ['http://europeanastatic.eu/api/image?size=FULL_DOC&type=TEXT'];
				        break;
				    case 'VIDEO':
				        hit.edmPreview = ['http://europeanastatic.eu/api/image?size=FULL_DOC&type=VIDEO'];
				        break;
				    case 'SOUND':
				    	hit.edmPreview = ['http://europeanastatic.eu/api/image?size=FULL_DOC&type=SOUND'];
				        break;
				    case 'IMAGE':
				    	hit.edmPreview = ["http://europeanastatic.eu/api/image?size=FULL_DOC&type=IMAGE"];
				        break;
				    case '3D':
				    	hit.edmPreview = ["http://europeanastatic.eu/api/image?size=FULL_DOC&type=3D"];
				        break;
				    default:
				        hit.edmPreview = ["http://europeanastatic.eu/api/image?size=FULL_DOC&type=TEXT"];
				        break;
				}
		
	      	} 
	      	return templateItem.render(hit);
	      }
	    }
	  }).on('typeahead:selected', function(event, suggestion, dataset) {
	    if (suggestion['guid'] !== '') {
	      chrome.tabs.create({url: suggestion['guid']});
	    }
	  }).focus();
	});