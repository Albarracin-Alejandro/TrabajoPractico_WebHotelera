jQuery(document).ready(function($){
	//abre/cierra filtro lateral
	$('.cd-filter-trigger').on('click', function(){
		triggerFilter(true);
	});
	$('.cd-filter .cd-close').on('click', function(){
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	//cierra el filtro dropdown dentro del lateral .cd-filter 
	$('.cd-filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix filtro lateral y galeria cuando scrolleas
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = $('.cd-main-content').offset().top,
		scrollTop = $(window).scrollTop();
		( scrollTop >= offsetTop ) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
	}

	/************************************ parte de codigo bajado de 
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		*************************************/

		buttonFilter.init();
		$('.cd-gallery ul').mixItUp({
			controls: {
				enable: false
			},
			callbacks: {
				onMixStart: function(){
					$('.cd-fail-message').fadeOut(200);
				},
				onMixFail: function(){
					$('.cd-fail-message').fadeIn(200);
				}
			}
		});

	//filtrado de busqueda
	var inputText;
	var $matching = $();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	$(".cd-filter-content input[type='search']").keyup(function(){
	  	// Delay function invoked to make sure user stopped typing
	  	delay(function(){
	  		inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
	   		// Check to see if input field is empty
	   		if ((inputText.length) > 0) {            
	   			$('.mix').each(function() {
	   				var $this = $(this);

		        	// add item to be filtered out if input text matches items inside the title   
		        	if($this.attr('class').toLowerCase().match(inputText)) {
		        		$matching = $matching.add(this);
		        	} else {
		          		// removes any previously matched item
		          		$matching = $matching.not(this);
		          	}
		          });
	   			$('.cd-gallery ul').mixItUp('filter', $matching);
	   		} else {
	      		// resets the filter to show all item if input is empty
	      		$('.cd-gallery ul').mixItUp('filter', 'all');
	      	}
	      }, 200 );
	  });
});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
	*****************************************************/
	var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',

  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

    	self.$filters = $('.cd-main-content');
    	self.$container = $('.cd-gallery ul');

    	self.$filters.find('.cd-filters').each(function(){
    		var $this = $(this);

    		self.groups.push({
    			$inputs: $this.find('.filter'),
    			active: '',
    			tracker: false
    		});
    	});

    	self.bindHandlers();
    },

  	// "bindHandlers" escuchara por si cualquier boton en cliqueado. 
  	bindHandlers: function(){
  		var self = this;

  		self.$filters.on('click', 'a', function(e){
  			self.parseFilters();
  		});
  		self.$filters.on('change', function(){
  			self.parseFilters();           
  		});
  	},

  	parseFilters: function(){
  		var self = this;

		// loop a traves de cada grupo de filtros y agarra el filtro activo de cada uno
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.$inputs.each(function(){
	    		var $this = $(this);
	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
	    			if($this.is(':checked') ) {
	    				group.active.push($this.attr('data-filter'));
	    			}
	    		} else if($this.is('select')){
	    			group.active.push($this.val());
	    		} else if( $this.find('.selected').length > 0 ) {
	    			group.active.push($this.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
	},

	concatenate: function(){
		var self = this;

    	self.outputString = ''; // Reset string de salida

    	for(var i = 0, group; group = self.groups[i]; i++){
    		self.outputString += group.active;
    	}

		// si el string de salida esta vacio, muestra todos en vez de nada  
	    !self.outputString.length && (self.outputString = 'all'); 

		// envia el string de salida a MixItUp a traves del metodo 'filter'  
    	if(self.$container.mixItUp('isLoaded')){
    		self.$container.mixItUp('filter', self.outputString);
    	}
    }
};

	//// ----  relayout  ---- ////
	var layout        = 'grid', // guarda el layout actual como una variable
	    $mixContainer = $('#mixContainer'); // Cache the MixItUp mixContainer

	    $('#ChangeToGrid').on('click', function () {
	    	layout = 'grid';
	    	$(this).find('span').removeClass('inactive').addClass('active');
	    	$('#ChangeToList span').removeClass('active').addClass('inactive');
	    	$('.mix img').css({ 'display': 'block', 'opacity': '0', maxHeight: "400px", width: "", height: "" });
	    	$('.mix').css({ width: "", height: "" });

	    	goGrid();

	    	dropdownFilter.filterDates();

	    	function showImg () {
	    		$('.mix img').each(
	    			function ( i ) {
	    				$(this).delay(0 + (i * 34)).animate({ opacity: 1 }, 134, "swing");
	    			}
	    			)
	    	};
	    	function goGrid () {
	    		$mixContainer.mixItUp('changeLayout', {
				containerClass: layout // cambia la clase de mixContainer a 'list'
			}, showImg());
	    	}
	    });
	    $('#ChangeToList').on('click', function () {
	    	layout = 'list';
	    	$(this).find('span').removeClass('inactive').addClass('active');
	    	$('#ChangeToGrid span').removeClass('active').addClass('inactive');
	    	hideImg();

	    	dropdownFilter.filterDates();

	    	function hideImg () {
	    		$('.mix img').each(
	    			function ( i ) {
	    				$(this).css({ 'display': 'block', 'opacity': '0', height: "0" });
	    			}, goList())
	    	}; 
	    	function goList () {
	    		$('.mix').each(function ( i ) {
	    			$(this).css({ 'width': '100%', 'opacity': '0.25', 'margin-top': '100px' });
	    			$(this).delay(0 + (i * 34)).animate({ marginTop: '0px', 'opacity': '1' }, 200, "swing");
	    		});

	    		$mixContainer.mixItUp('changeLayout', {
				containerClass: layout // cambia la clase de mixContainer a 'list'
			});
	    	};
	    }); 

	//// ---- </ relayout >---- ////


