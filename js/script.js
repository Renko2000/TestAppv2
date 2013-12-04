


var myScroll;
$(document).ready(function(){
   try{
    MBP.hideUrlBarOnLoad();
   } catch(e){
   }
   
   $.mobile.allowCrossDomainPages = true;    
   $.support.cors = true;
   
   $(window).bind("resize", function(){
               $('ul.menu').removeClass('on');
               $('.square img, .company').removeClass('on');
            
        if (($('.ui-page-active.iscroll').length >0) || ($('.ui-page-active .iscroll').length>0)){
            var scrollContainer;
            
            if ($('.ui-page-active.iscroll').length > 0){
                scrollContainer = $('.ui-page-active.iscroll')
            } else{
                scrollContainer = $('.ui-page-active .iscroll')
            }
            
            
            if (!$(scrollContainer).is(':visible')){
                return;
            }
            
            
            /*
            if (($(scrollContainer).hasClass('doneIScroll'))){
                return;
            }
            $(scrollContainer).addClass('doneIScroll');
            */
            
            
            var totalWidth = 0;
            $(".section", scrollContainer).each(function(){
                
               var square = $(this).find('.square');
               $(square).width($(square).height());
               $(this).css('padding-right', $(square).css('margin-bottom') );
               $('img', square).addClass('on');
               
               //if its a company tile
               if ($(this).find('.company').length){
                    var nextPadding= $(this).parent().next().find('.square:first').css('margin-bottom');
                    $(this).css('padding-right', nextPadding);
                    
                    totalWidth += $(this).find('img').width() + $(this).outerWidth();
                } else{
                    totalWidth += $(this).outerWidth()+5;
                }
				
            });
            
            console.log(totalWidth);
			var msg = $('.messages');
			msg.css({'width' : totalWidth-20 - parseInt($('.ui-page-active .menu .square:first').css('margin-bottom'))});
			
            $('.menu', scrollContainer).css({    
                'width' : totalWidth
            });            
            
            $('.company', scrollContainer).css({
                'height': $('.menu', scrollContainer).height()
            });
			
			$('.company', scrollContainer).css({    
                'width' : totalWidth - parseInt($('.ui-page-active .menu .square:first').css('margin-bottom'))
            });
            
            $('.ui-page-active .menu').css('left', parseInt($('.ui-page-active .company img').width()) + parseInt($('.ui-page-active .menu .square:first').css('margin-bottom')));
            
            //$('ul.menu', scrollContainer).addClass('on');
            //$('.square img, #menuPage .company').addClass('on');
            
            
            var companyWidth = parseInt($('.company img', scrollContainer).outerWidth()) || 0;
            $('.scroller', scrollContainer).css({
                'width' : parseInt($('.menu', scrollContainer).outerWidth()) + parseInt($('.menu', scrollContainer).css('padding-right')) +  companyWidth
            });
            
            try{
                myScroll.destroy();
            } catch(e){
                
            }
            



            //if windows
            if (AppUtility.mobile.detectWindowsPhone()){
               if (!$('.windowsBG').length){
                  $(scrollContainer).prepend('<div class="windowsBG" style="position:fixed;width:100%;height:100%;background:#000;left:0;top:0;z-index:-1;"></div>');
               }
            } else{
               
               var scrollerID = $(scrollContainer).attr("id");
               
               myScroll = new iScroll(scrollerID, {
                   momentum: true,
                   hScroll: true,
                   vScroll: true,
                   hScrollbar: false,
                   vScrollbar: false,
                   onScrollMove: function () {
                       $(scrollContainer).addClass("dragging");
                       $('a', scrollContainer).each(function(){
                           var href = $(this).attr('href');
                           if (href.length > 0){
                               $(this).attr('data-href', href);
                               $(this).attr('href', '');
                           }
                           if (!AppUtility.mobile.detect()){
                               if ($('a', scrollContainer).hasClass('gallery-item')){
                                   $('a.gallery-item', scrollContainer).unbind().click(function() {return false;}).removeClass('photoswiped');
                               }
                           }
                           
                       })
                   
                       
                   },
                   onScrollEnd: function () {
                       $(scrollContainer).removeClass("dragging");
                       setTimeout(function(){
                           $('a', scrollContainer).each(function(){
                               var href = $(this).attr('data-href');
                               $(this).attr('href', href);
                           });
                           if (!AppUtility.mobile.detect()){
                               if ($('a', scrollContainer).hasClass('gallery-item')){
                                   $('a.gallery-item', scrollContainer).addClass('photoswiped').photoSwipe();
                               }
                           }
                           
                       }, 50);
                   }
               });
               
            }
            
            
            $('ul.menu', scrollContainer).addClass('on');
            $('.company', scrollContainer).addClass('on');
            
            setTimeout(function(){
                
                $('.company', scrollContainer).css({
                    'height': $('.menu', scrollContainer).height()
                });
                
            }, 100);
            
            
        
            
            
           }
        //end if
   
       });
       //end window resize binding
       
       
    
   /*
    window.ondeviceorientation = function(event) {
        //var a = event.alpha;
        var b = event.beta;
        var g = event.gamma;
        g *=-1;
        
        $('.menu .square').css({
            'transform': 'skewY(' + parseInt(g/10) + 'deg)',
            '-webkit-transform': 'skewY(' + parseInt(g/10) + 'deg)',
            '-moz-transform': 'skewY(' + parseInt(g/10) + 'deg)'
            
        })
    }
   */
    
    /*
    $(window).scroll(function(e){
        var scrollValue = $(window).scrollLeft() + 100;
        $('.menu').css({
            'transform-origin': scrollValue + 'px center',
           '-webkit-transform-origin': scrollValue + 'px center',
           '-moz-transform-origin': scrollValue + 'px center'
       });  
    })
    */
});

var windowLoaded = false;

var App = {
    init: function(){
        
        if (windowLoaded){
            $(window).trigger("resize");
        }
        
        $(window).load(function(){
            windowLoaded = true;
            $(window).trigger("resize");
        });
      
      
        //initialize flexsliders
        $('.flexslider').each(function(){
            if ($(this).find('li').length>1){
                
                $(this).not('.slidered').addClass('slidered').flexslider({
                    animation: "slide",
                    controlNav: true
                });
            }
        });
        
        
        //initiate photoswipe
        try{
        var options = {};
            $('a.gallery-item:not(.photoswiped)').addClass('photoswiped').photoSwipe(options);
        } catch(e){
            
        }
        
        
        $('.toggleMapHeight:not(.clickBound)').addClass('clickBound').click(function(e){
            e.preventDefault();
            
            if ($(this).hasClass('opened')){
                //console.log("here");
                $('.map').empty().removeClass('large');
                $(this).removeClass('opened').removeClass('notransform');
            } else{
                $('.map').empty().addClass('large');
                $(this).addClass('opened')
            }
            
            var btn = $(this);

            setTimeout(function(){
                App.refreshMaps();  
                //$(btn).text($(btn).attr('data-opened')).addClass('notransform');
            }, 700);
        })
        
        //this.Forms.bind();
        this.refreshMaps();
        
    },
    
    
    
    
    refreshMaps: function(){
         
         $('.map').each(function(){
              var me = $(this);
              var locationTitle = $(this).attr('data-location');
              var myId = $(me).attr('id');
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({
                   address: locationTitle
               }, function(locResult) {
                   var latVal = locResult[0].geometry.location.lat();
                   var longVal = locResult[0].geometry.location.lng();
                   App.initializeMap(myId, locationTitle, latVal, longVal);
               });
         });
    },
    
    
    initializeMap: function(locationVal, titleVal, latVal, longVal) {
               var latlng = new google.maps.LatLng(latVal, longVal);
               var settings = {
                       zoom: 16,
                       center: latlng,
                       mapTypeControl: false,
                       mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                       navigationControl: false,
                       navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                       streetViewControl: false,
                       zoomControl: true,
                       mapTypeId: google.maps.MapTypeId.ROADMAP 
               };
               var map = new google.maps.Map(document.getElementById(locationVal), settings);
               
               
               var nibrasPos= new google.maps.LatLng(latVal, longVal);
               var nibrasMarker = new google.maps.Marker({
                         position: nibrasPos,
                         map: map,
                         title:titleVal
               });
                 
         
     },
     
     
     
     
            
           /* Forms: {
               bind: function() {
                  // Add required class to inputs
                  $(':input[required]').addClass('required');
                  
                  // Block submit if there are invalid classes found
                  $('form:not(.html5enhanced)').addClass("html5enhanced").submit(function() {
                        var formEl = this;
                          $('input,textarea').each(function() {
                                  App.Forms.validate(this);
                          });
                          
                          if(($(this).find(".invalid").length) == 0){
                                  // Delete all placeholder text
                                  $('input,textarea').each(function() {
                                          if($(this).val() == $(this).attr('placeholder')) $(this).val('');
                                  });
                                  
                                  //now submit form via ajax
                                  $.ajax({
                                    url: $(formEl).attr("action"),
                                    type: $(formEl).attr("method"),
                                    data: $(formEl).serialize(),
                                    success: function(r) {
                                       $(".successMessage").slideDown('fast');
                                       $('html,body').stop().animate({
                                          scrollTop: $(".successMessage").offset().top - 30
                                       }, 300);
                                       
                                       $(formEl).find('input[type="text"], input[type="email"], input[type="tel"], select').val('');
                                       $(formEl).find('textarea').val('');
                                       setTimeout(function(){
                                          $(".successMessage").slideUp('fast');
                                       }, 4000);
                                    }
                                  })
                                  return false;
                          }else{
                                  return false;
                          }
                  });
         
               },
               is_email: function(value){
                 return (/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/).test(value);
               },
               is_url: function(value){
                       return (/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i).test(value);
               },
               is_number: function(value){
                       return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
               },
               validate: function(element) {
                  var $$ = $(element);
                  var validator = element.getAttribute('type'); // Using pure javascript because jQuery always returns text in none HTML5 browsers
                  var valid = true;
                  var apply_class_to = $$;
                  
                  var required = element.getAttribute('required') == null ? false : true;
                  switch(validator){
                          case 'email': valid = App.Forms.is_email($$.val()); break;
                          case 'url': valid = App.Forms.is_url($$.val()); break;
                          case 'number': valid = App.Forms.is_number($$.val()); break;
                  }
                  
                  // Extra required validation
                  if(valid && required && $$.val().replace($$.attr('placeholder'), '') == ''){
                          valid = false;
                  }
                  
                  // Set input to valid of invalid
                  if(valid || (!required && $$.val() == '')){
                          apply_class_to.removeClass('invalid');
                          apply_class_to.addClass('valid');
                          return true;
                  }else{
                          apply_class_to.removeClass('valid');
                          apply_class_to.addClass('invalid');
                          return false;
                  }
               }
            } */
           
     
     
};
    
    $(document).ready(function(){
        
    });

    var pageChange = function(){
        App.init();
        //alert("pc");
        //App.init();
    }
    
    $(document).bind('pagechange', pageChange);
        
        $('div').live('pagehide', function (event, ui) { 
        var page = jQuery(event.target);
    
        if (page.attr('data-cache') == 'never') { 
            page.remove(); 
        }; 
    });
	
	
function addCommas(nStr)
			{
				var sep = ',';
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + sep + '$2');
				}
				return x1 + x2;
			}	
	
        
$('#calculate1').live('click', function(e) {
		var res = $('#result1');
		var salary = $('#input1').val();
		res.html('');
		res.append('<p><strong>Your contribution:</strong> ' + formatNumber((salary*0.05),2) + '/=</p>');
		res.append('<p><strong>Employers contribution:</strong> ' + formatNumber((salary*0.1),2) + '/=</p>');
		res.append('<p><strong>Total contribution:</strong> ' + formatNumber((salary*0.15),2) + '/=</p>');
		res.addClass("ui-state-highlight");
	});

$('#calculate2').live('click', function(e) {
		zeroBlanks(document.futCalc);
		var p = $('#current').val();
		var c = $('#annual').val();
		var r = numval($('#rate').val())/100;
		var y = numval($('#years').val());
		var n = 1;
		 
		var futureValue = formatNumber(bI2(p,r/n,y*n,c/n),2);
		
		var res = $('#result2');
		res.html('');
		res.append('<p><strong>Your future value would be: ' + futureValue + '/=</strong></p>');
		res.addClass("ui-state-highlight");
	});

	function bI2(p,r,y,c)
{
	if (c == null) c = 0;
	if (y == 0) return p;
	return futureValue(p,r,y) + c*geomSeries(1+r,0,y-1);
}


function zeroBlanks(formname)
{
	var i, ctrl;
	for (i = 0; i < formname.elements.length; i++)
	{
		ctrl = formname.elements[i];
		if (ctrl.type == "text")
		{
			if (makeNumeric(ctrl.value) == "")
				ctrl.value = "0";
		}
	}
}

function filterChars(s, charList)
{
	var s1 = "" + s; // force s1 to be a string data type
	var i;
	for (i = 0; i < s1.length; )
	{
		if (charList.indexOf(s1.charAt(i)) < 0)
			s1 = s1.substring(0,i) + s1.substring(i+1, s1.length);
		else
			i++;
	}
	return s1;
}

function makeNumeric(s)
{
	return filterChars(s, "1234567890.-");
}

function numval(val,digits,minval,maxval)
{
	val = makeNumeric(val);
	if (val == "" || isNaN(val)) val = 0;
	val = parseFloat(val);
	if (digits != null)
	{
		var dec = Math.pow(10,digits);
		val = (Math.round(val * dec))/dec;
	}
	if (minval != null && val < minval) val = minval;
	if (maxval != null && val > maxval) val = maxval;
	return parseFloat(val);
}

function formatNumber(val,digits,minval,maxval)
{
	var sval = "" + numval(val,digits,minval,maxval);
	var i;
	var iDecpt = sval.indexOf(".");
	if (iDecpt < 0) iDecpt = sval.length;
	if (digits != null && digits > 0)
	{
		if (iDecpt == sval.length)
			sval = sval + ".";
		var places = sval.length - sval.indexOf(".") - 1;
		for (i = 0; i < digits - places; i++)
			sval = sval + "0";
	}
	var firstNumchar = 0;
	if (sval.charAt(0) == "-") firstNumchar = 1;
	for (i = iDecpt - 3; i > firstNumchar; i-= 3)
		sval = sval.substring(0, i) + "," + sval.substring(i);

	return sval;
}

function presentValue(fv,r,y)
{
	return fv/Math.pow(1+r,y);
}

function futureValue(p,r,y)
{
	return p*Math.pow(1+r,y);
}

function returnRate(pv,fv,y)
{
	return Math.pow(fv/pv,1.0/y) - 1.0;
}

function geomSeries(z,m,n)
{
	var amt;
	if (z == 1.0) amt = n + 1;
	else amt = (Math.pow(z,n + 1) - 1)/(z - 1);
	if (m >= 1) amt -= geomSeries(z,0,m-1);
	return amt;
}

function basicInvestment(p,r,y,c)
{
	if (c == null) c = 0;

	return futureValue(p,r,y) + c*geomSeries(1+r,1,y);
}

function annuityPayout(p,r,y)
{
	return futureValue(p,r,y-1)/geomSeries(1+r,0,y-1);
}

function mortgagePayment(p,r,y)
{
	return futureValue(p,r,y)/geomSeries(1+r,0,y-1);
}

function randN(m,s)
{
	return s*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()) + m;
}

function logNmean(m,s)
{
	return Math.log(m) - (Math.pow(logNsigma(m,s),2)/2);
}

function logNsigma(m,s)
{
	return Math.sqrt(Math.log(Math.pow(s/m,2) + 1));
}

function gmEst(r_am,s)
{
	return Math.sqrt(Math.pow(1 + r_am, 2) - Math.pow(s,2)) - 1;
}

function numOrder(n, m)
{
	return n - m;
}

$('#facebook-page').on('pagebeforeshow',function(event){
    // code to execute on that page
    //$(this) works as expected - refers the page
		//console.log('Page before show called on you tube');
		var fb = '<div id="fb-root"></div>'+
        '<div class="padpage padbottom"><div class="fb-like-box" data-href="http://www.facebook.com/home.php#!/pages/NSSF-Uganda/165007786851692" data-width="520" data-colorscheme="light" data-show-faces="false" data-show-border="false" data-connections="8" data-stream="true" data-header="false"></div></div>';
			
		$(fb).insertAfter('#above-fb');
		console.log('fb fired');
		
	});
	


$('#login-page').on('pagebeforeshow',function(event){
	$('.alert').hide();
	$('#logout_btn').hide();
	});
	
	/*$("a:jqmData(clickload='logout')").on('click', function() {
		console.log('clicked logout');
		//$.mobile.showPageLoadingMsg("b", "This is only a test", true);
	});*/
	
$('#logout_btn').live('click', function(e) {
		var url = $(this).attr('href');
		$.mobile.changePage( url, { reloadPage: true, transition: "none"} );
	});
					
$('#submit_btn2').live('click', function(e){
				e.preventDefault();
				console.log('clicked mini');
				$('.alert').hide();
				$('#logout_btn2').hide();
				
				
					//$('.alert').hide();
					var number = $('input#number2').val();
					if(number == '')
					{
						$('div#number2_alert').show();
						$('input#number2').focus();
						return false;
					}
					var password = $('input#password2').val();
					if(password == '')
					{
						$('div#password2_alert').show();
						$('input#password2').focus();
						return false;
					}
					//console.log('clicked login');
					var dataString = 'number=' + number + '&password=' + password + '&limit=true';
					
					var ajax_load = "<img class='loading' src='img/ajax-loader.gif' alt='loading...' />";
					//var loadUrl = "http://localhost/nssf/mobile/estatement";
					
					$("#mini").prepend(ajax_load);
					
					var output = $('#mini');
					$.ajax({
						url: 'http://nssfug.org/apimembers/getMStatement/?'+dataString,
						dataType: 'jsonp',
						async: false,
						jsonp: 'jsoncallback',
						timeout: 50000,
						success: function(data, status){
							if(data.error_no[0]==1)
							{
								 $('.loading').hide();
								 $("#mini").prepend('<div class="alert"><div class="typo-icon">No contributions found for the last 30 months.</div></div>');
								 
							}
							else if(data.error_no[0]==2)
							{
								$('.loading').hide();
								 $("#mini").prepend('<div class="alert"><div class="typo-icon">NSSF Number & password do not match.</div></div>');
							}
							else
							{
									//console.log(data);									
									$('#mini').html('');
									$('#mini').append('<a href="#" id="logout_btn2" data-role="button" data-clickload="logout">Log Out</a>');
									$('#mini').append('<h3>'+data.name+'</h3>');
									$('#mini').append('<h4>'+data.begin+' to '+data.end+'</h4>');
									var cont = '<table cellpadding="0" cellspacing="0" class="table3" width="99%">'+
															'<tr>'+
															'<thead>'+
																'<th>Type</th>'+
																'<th>Date</th>'+
																'<th>Amount</th>'+
															'</thead>'+
															'<tbody>';
															
									$.each(data.tr, function(i,item){ 
										//var tr = item.split(';');
										var amt = addCommas(parseInt(item.amt));
										cont += '<tr><td>'+item.type+'</td><td>'+item.date+'</td><td>'+amt+'</td></tr>';	
									});	
									
									cont += '</tbody></tr></table>';
									
									$('#mini').append(cont);					
									
									$('#mini').trigger('create');
									$('tr:last').css({fontWeight:'bolder'});
									$('tr:last').css({borderTopWidth: "1px",borderTopColor: "#333"});
									
							}
						},
						error: function(){
							$('.loading').hide();
							$("#mini").prepend('<div class="alert"><div class="typo-icon">The connection to the server timed out. Please check your internet connection.</div></div>');
						}
					});

					 
					return false;
				
				
				
									
			});					
			

$('#submit_btn').live('click', function(e){
					e.preventDefault();
					console.log('clicked full');
					$('.alert').hide();
					var number = $('input#number').val();
					if(number == '')
					{
						$('div#number_alert').show();
						$('input#number').focus();
						return false;
					}
					var password = $('input#password').val();
					if(password == '')
					{
						$('div#password_alert').show();
						$('input#password').focus();
						return false;
					}
					var dataString = 'number=' + number + '&password=' + password + '&limit=false';
					
					var ajax_load = "<img class='loading' src='img/ajax-loader.gif' alt='loading...' />";
					//var loadUrl = "http://localhost/nssf/mobile/estatement";
					
					$("#login").prepend(ajax_load);
					
					var output = $('#login');
					$.ajax({
						//url: 'http://kaingroup.net/nssf_server/index.php/members/get/?'+dataString,
						url: 'http://nssfug.org/apimembers/getMStatement/?'+dataString,
						//url: 'http://196.0.10.138/xmlrpc_server/index.php/members/get/?'+dataString,
						dataType: 'jsonp',
						jsonp: 'jsoncallback',
						timeout: 50000,
						success: function(data, status){
							if(data.error_no[0]==1)
							{
								 $('.loading').hide();
								 $("#login").prepend('<div class="alert"><div class="typo-icon">No contributions found.</div></div>');
								 
							}
							else if(data.error_no[0]==2)
							{
								$('.loading').hide();
								 $("#login").prepend('<div class="alert"><div class="typo-icon">NSSF Number & password do not match.</div></div>');
							}
							else
							{
									//console.log(data);									
									$('#login').html('');
									$('#login').append('<a href="#" id="logout_btn" data-role="button" data-clickload="logout">Log Out</a>');
									$('#login').append('<h3>'+data.name+'</h3>');
									$('#login').append('<h4>'+data.begin+' to '+data.end+'</h4>');
									var cont = '<table cellpadding="0" cellspacing="0" class="table3" width="99%">'+
															'<tr>'+
															'<thead>'+
																'<th>Type</th>'+
																'<th>Date</th>'+
																'<th>Amount</th>'+
															'</thead>'+
															'<tbody>';
															
									$.each(data.tr, function(i,item){ 
										//var tr = item.split(';');
										var amt = addCommas(parseInt(item.amt));
										cont += '<tr><td>'+item.type+'</td><td>'+item.date+'</td><td>'+amt+'</td></tr>';	
									});	
									
									cont += '</tbody></tr></table>';
									
									$('#login').append(cont);					
									
									$('#login').trigger('create');
									$('tr:last').css({fontWeight:'bolder'});
									$('tr:last').css({borderTopWidth: "1px",borderTopColor: "#333"});
							}
						},
						error: function(){
							$('.loading').hide();
							$("#login").prepend('<div class="alert"><div class="typo-icon">The connection to the server timed out. Please check your internet connection.</div></div>');
						}
					});

					 
					return false;
				});	   
    
    