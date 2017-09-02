$(document).ready(function($) {

	$('[data-info-toggle]').click(function() {
		var info = $(this).parents('.info'),
			infoWrap = info.find('.info__wrap');
		infoWrap.fadeToggle(300);
		info.toggleClass('info_active');
	});
	
	$('.label .icon').click(function() {
		var label = $(this).parents('.label');
		label.fadeOut(300);
	});


	$('.checkbox').each(function(index, el) {
		var checkboxInput = $(this).find('input'),
			checkboxLabel = $(this).find('label');
		checkboxInput.attr('id','checkbox-'+index);
		checkboxLabel.attr('for','checkbox-'+index);
	});


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
				var selectString = '<li class="select__list-item" data-target="' + selectParsingItemValue + '">' + selectParsingItemText + '</li>';
				selectList.append(selectString);
				if ($(this).attr('selected')) {
					selectTitle.text(selectParsingItemText);
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
					title.text(text);
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



	/* Time Mask */
	$(".time__input").mask("9.99");
});