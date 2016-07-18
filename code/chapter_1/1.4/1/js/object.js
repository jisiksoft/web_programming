
$(".button").hover(function() {
                    $( this ).css({"background-color":"purple"});
                    }, function() {
                    $( this ).css({"background-color":"#1646a7"});
                   });
$(".object").hover(function() {
                    $( this ).css({"font-size":"40px"});
                    }, function() {
                    $( this ).css({"font-size":"25px"});
                   });
$("#button_1").click(function() {
                     $("#object_4").empty().html("Hello JisikSoft");
                     });
$("#button_2").click(function() {
                     $("#object_3").empty().html("Button_2 is Clicked.");
                     });
$("#button_3").click(function() {
                     $("#object_3").empty().html("object_3<div class='object' id='object_4'>object_4 is added.</div>");
                     });
$("#button_4").click(function() {
                       	$("#object_1").empty().html("for Beautiful World").css(
                       			{	"position":"relative",
                       				"top":"80px",
                       				"font-size":"60px"
                       			}).hover(function() {
                        	   				$( this ).css({"font-size":"70px",
                        	   								"color":"red"});
                              		}, function() {
                              				$( this ).css({"font-size":"60px",
                              								"color":"#1646a7"});
                              		});
                     });
