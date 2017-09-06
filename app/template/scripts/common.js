$(document).ready(function($) {

	$('[data-info-toggle]').click(function() {
		var info = $(this).parents('.info'),
			infoWrap = info.find('.info__wrap');
		infoWrap.fadeToggle(300);
		info.toggleClass('info_active');
	});
	



	/* Labels */
	

	function label() {
		$('.label').each(function() {
			var input = $(this).find('input'),
				span = $(this).find('span'),
				spanText = span.html();
			input.val(spanText);
			input.attr({
				value: spanText,
				name: 'label-' +spanText
			});
		});
	}
	label();

	function labelDel() {
		$('.label .icon').click(function() {
			var label = $(this).parents('.label');
			label.remove();
		});
	}
	labelDel();


	function labelAdd() {
		$(".labels__input input").keyup(function(event){
			if(event.keyCode == 13){
				event.preventDefault();
				var value = $(this).val(),
					list = $(this).parents('.labels__input').siblings('.labels__list');
				if (value != '') {
					list.append('<div class="label"><input type="text" name="label-'+ value +'" value="'+ value +'"><span>'+ value +'</span><i class="icon icon-cross"></i></div>')
					$(this).val('');
				}
				labelDel();
			}
		});
	}

	labelAdd();


	$('.checkbox').each(function(index, el) {
		var checkboxInput = $(this).find('input'),
			checkboxLabel = $(this).find('label');
		checkboxInput.attr('id','checkbox-'+index);
		checkboxLabel.attr('for','checkbox-'+index);
	});


	var paymentPrice = $('.payment__price');

	/* Select */
	var select = $('.select');
	select.each(function() {
		var parent = $(this),
			selectTitle = $(this).find($('.select__title')),
			selectList = $(this).find($('.select__list')),
			selectParsing = $(this).find($('.select__parsing')),
			selectParsingItem = $(this).find($('.select__parsing option'));

		if (selectParsing) {
			selectParsingItem.each(function() {
				selectParsingItemText = $(this).text();
				selectParsingItemValue = $(this).attr('value');
				
				if (parent.hasClass('select_payment')) {
					var selectPrice = $(this).attr('data-option-price'),
						selectLabel = $(this).attr('label'),
						selectString = '<li class="select__list-item" data-option-price="'+ selectPrice +'" data-target="' + selectParsingItemValue + '"><span>' + selectParsingItemText+ '</span> '+ selectLabel + '</li>';
				}
				else {
					var selectString = '<li class="select__list-item" data-target="' + selectParsingItemValue + '">' + selectParsingItemText + '</li>';
					
				}
				selectList.append(selectString);
				if ($(this).attr('selected')) {
					selectTitle.text(selectParsingItemText);
					
					if (parent.hasClass('select_payment')) {
						paymentPrice.html(selectPrice);
						selectTitle.html('<span>'+selectParsingItemText + '</span>: ' + selectLabel);
					} else {
						selectTitle.html(selectParsingItemText);
					}
				}
				selectParsingItemText = selectParsingItemValue = null;
			});
		}
		parent = selectTitle = selectList = selectParsing = selectParsingItem = selectString = null;
	});
	function selectOpen(){
		$('.select__title').click(function() {
			var parent = $(this).parents('.select');
			parent.toggleClass('select_open');
			parent = null;

		});
	}
	selectOpen();

	function selectItemActive() {
		$('.select__list-item').click(function() {
			var parent = $(this).parents('.select'),
				parsingItem = parent.find($('.select__parsing option')),
				attr = $(this).attr('data-target'),
				title = parent.find($('.select__title'));

			parsingItem.each(function() {
				$(this).removeAttr('selected');
				if ($(this).attr('value') == attr) {
					var text = $(this).text();
					if (parent.hasClass('select_payment')) {
						var price = $(this).attr('data-option-price'),
							label = $(this).attr('label');
						title.html('<span>'+text+'</span>: ' + label);
						paymentPrice.html(price);
					} else {
						title.html(text);
					}
					
					$(this).attr('selected', 'selected');
				}
			});
			parent.toggleClass('select_open');
			parent = parsingItem = attr = title = null;

		});
	}
	selectItemActive();
	select = null;



	/* Example */
	var exampleInput = $('.example__input input'),
		exampleWrapP = $('.example__wrap p');


	function exampleTitle() {
		var exampleValue = exampleInput.val();
		if(exampleValue){
			exampleWrapP.html(exampleValue);
		}
		
	}

	exampleTitle();

	exampleInput.on('input', function() {
		exampleTitle();
	});



	



	$.mask.definitions['h'] = "[AaPp]";
	$.mask.definitions['k'] = "[0-5]";
	$.mask.definitions['n'] = "[1-2]";
	$.mask.definitions['m'] = "[0-3]";
	
	$(".card-number").mask("9999 - 9999 - 9999 - 9999 - 9999");
	$(".mmyy").mask("m9 / n9");
	$(".cvc").mask("999");

	/* Accs */
	var accsCount = $('.accounts__title span'),
		accsItem = $('.account_login'),
		accsTitle = $('.accounts__title'),
		accsList = $('.accounts__list'),
		accsItemLength = accsItem.length;

	accsCount.html(accsItemLength);

	accsTitle.click(function() {
		accsList.slideToggle(300);
	});

	var timeInputStart = $('.time__input_start  input'),
		timeInputEnd = $('.time__input_end  input');

	


	/* Loggin page */
	var dots = $('.dots'),
		step = $('.step'),
		steps = $('.steps'),
		stepLength = step.length;
	for (var i = 1; i <= stepLength; i++) {
		dots.append('<span></span>');
		if (i == 1) {
			var dot = dots.find('span:nth-of-type(1)');
			dot.addClass('active')

		}
	}

	var dot = dots.find('span');

	dot.each(function(index, el) {
		$(this).attr('data-dot-count', index+2);
	});


	step.each(function(index, el) {
		var thisWidth = $(this).width(),
				stepsWidth = steps.width();
		$(this).attr('data-step-count', index+2);
		steps.width(stepsWidth + thisWidth)
	});

	$('.loggin__next').click(function() {
		var parent = $(this).parents('.step'),
				next = parent.next('.step'),
				count = parent.attr('data-step-count');
				activeDot = $('.dots span:nth-of-type('+Number(count)+')'),
				input = parent.find('input'),
				inputLength = input.length,
				inputLengthNew = inputLength;

		input.each(function(index, el) {
			var val = $(this).val();
			if (val == '' || val == null) {
				$(this).css('border-color', 'red');
				inputLengthNew = inputLength - 1;
			}
			else {
				$(this).css('border-color', 'white');
			}
		});
		if (inputLength == inputLengthNew) {
			dot.removeClass('active');
			activeDot.addClass('active');
			parent.css('transform', 'translateX(-'+count*100 +'%)');
			next.css('transform', 'translateX(-'+(count-1)*100 +'%)');
		}
		
	});


	/* Responsive */
	$(window).on('load resize', function(event) {
		var windowWidth = $(window).width();
		if (windowWidth > 767) {
			$(".time__input input").mask("9.k9");
			accsList.removeAttr('style');
			$('.example__input input').attr('placeholder','Promotional text of your company');
		} else {
			$(".time__input input").mask("9.k9 hM");
			timeInputStart.attr('placeholder','9.00 AM');
			timeInputEnd.attr('placeholder','9.00 PM');
			$('.example__input input').attr('placeholder','Promotional text...');
		}
		if (windowWidth < 610) {
			if (dots) {
				var loginWidth = $('.loggin').width();
				step.each(function(index, el) {
					$(this).width(loginWidth);
				});
			}
		}
	});

	/* Slider */
	$('.reviews__list').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon icon-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon icon-arrow-right"></i></button>',
		responsive: [{
			breakpoint: 1200,
      		settings: {
      			slidesToShow: 2,
				slidesToScroll: 2
      		}}, {
      		breakpoint: 768,
      		settings: {
      			arrows: true,
      			dots: false,
      			slidesToShow: 1,
				slidesToScroll: 1
      		}
		}]
	})

	/* Feture */

	var whyItem = $('.why__item'),
		fetureItem = $('.feture__item');

	function feture() {
		whyItem.each(function(index, el) {
			$(this).attr('data-why-count', index +1);
		});
	}
	feture();


	if (whyItem.hasClass('why__item_active')) {
		var count = $('.why__item.why__item_active').attr('data-why-count'),	
			item = $('.feture__item[data-feture-count='+count+']');
		item.slideDown(0);
	}

	whyItem.click(function(event) {
		var count = $(this).attr('data-why-count'),	
			item = $('.feture__item[data-feture-count='+count+']');
		if (!$(this).hasClass('why__item_active')) {
			whyItem.removeClass('why__item_active');
			$(this).addClass('why__item_active');
			fetureItem.slideUp(300);
			item.slideDown(300);
		} else{
			
		}
	});
	
});