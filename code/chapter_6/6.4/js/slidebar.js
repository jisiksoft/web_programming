makeSlidebarTwoCursor = function(cur1, cur2, max, container) {

	var idSlidebar = container + 'slidebar';

	var idSafe = container + 'slidebar_safe';
	var idWarning = container + 'slidebar_warning';
	var idDanger = container + 'slidebar_danger';
	
	var idInner1 = container + 'slidebar_inner1';
	var idCursor1 = container + 'slidebar_cursor1';
	var idInner2 = container + 'slidebar_inner2';
	var idCursor2 = container + 'slidebar_cursor2';

	var valCursor1 = container + 'cursor1_value';
	var valCursor2 = container + 'cursor2_value';
	
	var originX = $('#'+container).offset().left;

	var width = $('#'+container).width();
	var len = width - 10;
	var pos1 = (len * cur1) / max;
	var pos2 = (len * cur2) / max;
	var widthInner1 = pos2 + 10;
	var widthInner2 = width - pos1;
	var widthSafe = pos1 + 5;
	var widthWarning = pos2 - pos1;
	var widthDanger = width - pos2 - 5;

	var str = '<div id="' + idSlidebar + '" style="position:absolute;width:' + width
			  + 'px;height:13px;background-size:100% 100%;background-repeat:no-repeat; \
			  	background-image:url(\'./img/bar_slider.png\');"> \
            	<div id="' + idSafe + '" style="position:absolute;width:' + widthSafe
            	+ 'px;height:13px;background-size:100% 100%;background-repeat:no-repeat; \
            	background-image:url(\'./img/bar_slider_safe.png\');"></div> \
            	<div id="' + idWarning + '" style="position:absolute;left:' + (pos1 + 5) + 'px;width:' 
            	+ widthWarning + 'px;height:13px;background-size:100% 100%;background-repeat:no-repeat; \
            	background-image:url(\'./img/bar_slider_warning.png\');"></div> \
            	<div id="' + idDanger + '" style="position:absolute;left:' + (pos2 + 5) + 'px;width:' 
            	+ widthDanger + 'px;height:13px;background-size:100% 100%;background-repeat:no-repeat; \
            	background-image:url(\'./img/bar_slider_danger.png\');"></div> \
            	<div id="' + idInner1 + '" style="position:absolute;width:' + widthInner1 + 'px;height:13px;"> \
            		<div id="' + idCursor1 + '" style="position:absolute;left:' + pos1
            		+ 'px;width:10px;height:13px;z-index:51;cursor:pointer; \
            		background-image:url(\'./img/cursor_slider.png\')"></div> \
            	</div> \
            	<div id="' + idInner2 + '" style="position:absolute;left:' + pos1 + 'px;width:' 
            	+ widthInner2 + 'px;height:13px;"> \
            		<div id="' + idCursor2 + '" style="position:absolute;left:' + widthWarning
            		+ 'px;width:10px;height:13px;z-index:51;cursor:pointer; \
            		background-image:url(\'./img/cursor_slider.png\')"></div> \
            	</div> \
              </div>'
			  + '<div id="' + valCursor1 + '" style="position:absolute;left:' + pos1
			  + 'px;top:-20px;z-index:50;color:#555555;">' + cur1 + '</div>'
			  + '<div id="' + valCursor2 + '" style="position:absolute;left:' + pos2
			  + 'px;top:-20px;z-index:50;color:#555555;">' + cur2 + '</div>';

	$('#'+container).html(str);

	var slideAreaSafe = $('#' + idSafe);
	var slideAreaWarning = $('#' + idWarning);
	var slideAreaDanger = $('#' + idDanger);

	var slideInnerFirst = $('#' + idInner1);
	var slideInnerSecond = $('#' + idInner2);
	var slidecursorFirst = $('#' + idCursor1);
	var slidecursorSecond = $('#' + idCursor2);

	var valueCursor1 = $('#' + valCursor1);
	var valueCursor2 = $('#' + valCursor2);

	slidecursorFirst.draggable({
		
		containment : '#' + idInner1,
		
		drag : function(ev, ui) {
			var z1 = parseInt(slidecursorFirst.css("z-index"), 10);
			var z2 = parseInt(slidecursorSecond.css("z-index"), 10);
			if (z1 <= z2) { slidecursorFirst.css("z-index", z2 + 1); }

			var posX1 = ui.offset.left - originX;
			var posX2 = (len - posX1) - (len - (slidecursorSecond.offset().left - originX));

			slideInnerSecond.css({
				left : posX1,
				width : len - posX1 + 10
			});
			
			slidecursorSecond.css({
				left : posX2
			});

			slideAreaSafe.css({
				width : posX1 + 5
			});
			
			slideAreaWarning.css({
				left : posX1 + 5,
				width : slideInnerFirst.width() - posX1 - 5
			});

			var aValue = Math.round(((posX1) * max) / len);
			valueCursor1.css({
				left : posX1
			});
			valueCursor1.html(aValue);
		}
	});

	slidecursorSecond.draggable({
		
		containment : '#' + idInner2,
		
		drag : function(ev, ui) {
			var z1 = parseInt(slidecursorFirst.css("z-index"), 10);
			var z2 = parseInt(slidecursorSecond.css("z-index"), 10);
			if (z1 >= z2) { slidecursorSecond.css("z-index", z1 + 1); }

			var posX1 = slidecursorFirst.offset().left - originX;
			var posX2 = ui.offset.left - originX;

			slideInnerFirst.css({
				width : posX2 + 10
			});

			slideAreaWarning.css({
				width : posX2 - posX1
			});
			
			slideAreaDanger.css({
				left : posX2 + 5,
				width : len - posX2 + 5
			});

			var aValue = Math.round((posX2 * max) / len);
			valueCursor2.css({
				left : posX2
			});
			valueCursor2.html(aValue);
		}
	});
}
