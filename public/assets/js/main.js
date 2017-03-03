/*
	BI-Forecaster
	matsays.com | @mat_says
	Free for personal and commercial use under the CCA 3.0 license
*/


/*
	As a whole, this is a horrendously poor method for assimilating much of this data but
	it does provide the capability quickly.
	
	No, I did not use ES6 though I suppose I could have used template literals in several areas
	if I wanted to make it more robust.
	
	Create baseline variables
*/
var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
var daysofweek = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
var weathercodes = new Array();
	weathercodes[200] = 'Thunderstorm with Light Rain|thunder-rainy';
	weathercodes[201] = 'Thunderstorm with Rain|thunder-rainy-m';
	weathercodes[202] = 'Thunderstorm with Heavy Rain|thunder-rainy-h';
	weathercodes[210] = 'Light Thunderstorm|thunder';
	weathercodes[211] = 'Thunderstorm|thunder';
	weathercodes[212] = 'Heavy Thunderstorm|thunder';
	weathercodes[221] = 'Ragged Thunderstorm|thunder';
	weathercodes[230] = 'Thunderstorm with Light Drizzle|thunder-rainy';
	weathercodes[231] = 'Thunderstorm with Drizzle|thunder-rainy';
	weathercodes[232] = 'Thunderstorm with Heavy Drizzle|thunder-rainy-m';
	weathercodes[300] = 'Light Drizzle|rainy-s';	
	weathercodes[301] = 'Drizzle|rainy-s';
	weathercodes[302] = 'Heavy Drizzle|rainy-s';
	weathercodes[310] = 'Light Rain|rainy-s';
	weathercodes[311] = 'Rain|rainy-m';
	weathercodes[312] = 'Heavy Rain|rainy-h';
	weathercodes[313] = 'Rain Showers|rainy-m';
	weathercodes[314] = 'Heavy Rain Showers|rainy-h';
	weathercodes[321] = 'Showers|rainy-m';
	weathercodes[500] = 'Light Rain|rainy-s';
	weathercodes[501] = 'Moderate Rain|rainy-m';
	weathercodes[502] = 'Heavy Rain|rainy-h';
	weathercodes[503] = 'Extreme Rain|rainy-h';
	weathercodes[504] = 'Freezing Rain|rainy-snowy';
	weathercodes[511] = 'Freezing Rain|rainy-snowy';
	weathercodes[520] = 'Rain Showers|rainy-m';
	weathercodes[521] = 'Rain Showers|rainy-m';
	weathercodes[522] = 'Heavy Rain Showers|rainy-h';
	weathercodes[531] = 'Ragged Showers|rainy-m';
	weathercodes[600] = 'Light Snow|snowy-s';
	weathercodes[601] = 'Snow|snowy-m';
	weathercodes[602] = 'Heavy Snow|snowy-h';
	weathercodes[611] = 'Sleet|rainy-snowy';
	weathercodes[612] = 'Shower Sleet|rainy-snowy';
	weathercodes[615] = 'Light Rain and Snow|rainy-snowy';
	weathercodes[616] = 'Rain and Snow|rainy-snowy';
	weathercodes[620] = 'Light Shower Snow|snowy-s';
	weathercodes[621] = 'Shower Snow|snowy-m';
	weathercodes[622] = 'Heavy Shower Snow|snowy-h';
	weathercodes[701] = 'Mist|fog';
	weathercodes[711] = 'Smoke|fog';
	weathercodes[721] = 'Haze|fog';
	weathercodes[731] = 'Sand|fog';
	weathercodes[741] = 'Fog|fog';
	weathercodes[751] = 'Sand|fog';
	weathercodes[761] = 'Dust|fog';
	weathercodes[762] = 'Volcanic Ash|fog';
	weathercodes[771] = 'Squalls|windy';
	weathercodes[781] = 'Tornado|windy';
	weathercodes[800] = 'Clear Sky|sunny';
	weathercodes[801] = 'Few Clouds|partlycloudy';
	weathercodes[802] = 'Scattered Clouds|partlycloudy';
	weathercodes[803] = 'Broken Clouds|partlycloudy';
	weathercodes[804] = 'Overcast|cloudy';
	weathercodes[900] = 'Tornado|windy';
	weathercodes[901] = 'Tropical Storm|windy';
	weathercodes[902] = 'Hurricane|windy';
	weathercodes[903] = 'Cold|none';
	weathercodes[904] = 'Hot|none';
	weathercodes[905] = 'Windy|windy';
	weathercodes[906] = 'Hail|none';
	weathercodes[951] = 'Calm|none';
	weathercodes[952] = 'Light Breeze|windy';
	weathercodes[953] = 'Gentle Breeze|windy';
	weathercodes[954] = 'Moderate Breeze|windy';
	weathercodes[955] = 'Fresh Breeze|windy';
	weathercodes[956] = 'Strong Breeze|windy';
	weathercodes[957] = 'High Wind|windy';
	weathercodes[958] = 'Gale|windy';
	weathercodes[959] = 'Severe Gale|windy';
	weathercodes[960] = 'Storm|windy';
	weathercodes[961] = 'Violent Storm|windy';
	weathercodes[962] = 'Hurricane|windy';




(function($) {
	
	$(function() {
	
		var $window = $(window),
			$body = $('body');
	

		$('#get_forecast').click(function(){
			var b = '';
			
			
			
			/*
				I have API access but it's returning 401 errors sporadically so I
				have provided a sample data XML from one pull for visualization
				in case it's returning the error.
				
				NO, I didn't bother to hide the API key - this is just a sampling.
				Normally I would do a passthrough with a server side pull
			*/
			var dataurl = 'http://api.openweathermap.org/data/2.5/forecast?q='+encodeURIComponent($('#location_input').val())+',us&mode=xml&units=imperial&appid=d1d3bf30692a4f839a0e5bc85800d42b';
			//dataurl = 'sampledata.xml';
			
			
			/*
				Access the API-based data, parse the XML and assemble the new spaces
			*/
			var w = $.ajax({
					type: 'GET',
					url: dataurl,
					datatype: 'xml'
				}).done(function(xml){
					$('#location_weather').empty();
					var daynum = 1;
					$('#location_name').html( $(xml).find('name').text() );
					$('#weatherforecast').fadeIn('normal');
					$(xml).find('time').each(function(){
						/*
							this is inefficient at best but it's just quickly parsing the
							XML and finding a specific point in each day (noon), instead of
							trying to aggregate all 3-hour segments
						*/
						var time_from = $(this).attr('from').split('T');
						if(time_from[1]=='12:00:00'){
							/*
								found it, now let's muck through pulling the data nodes
							*/
							var d = new Date();
							var tdate = time_from[0].split('-');
							var wdate = d.setFullYear(tdate[0],tdate[1]-1,tdate[2],12,0,0)
							var wcode = $(this).find('symbol').attr('number');
							var descr = weathercodes[wcode].split('|');
							var tempf = parseInt($(this).find('temperature').attr('value'));
							var humid = $(this).find('humidity').attr('value');
							var windd = $(this).find('windDirection').attr('code');
							var winds = parseInt($(this).find('windSpeed').attr('mps'));
							
							/*
								Again, totally inefficient (and incorrect) way to build
								this DOM segment, but I just did not have time to do it
								with multiple .append
							*/
							var tile = '<div class="day-tile day'+daynum+'"><h3 class="day-tile-day">'+daysofweek[d.getDay()]+'</h3><h4 class="day-tile-date">'+months[d.getMonth()]+' '+d.getDate()+'</h4><div class="day-tile-visual"><img src="media/'+descr[1]+'.svg" alt="'+descr[0]+'" class="img-responsive fade"/></div><div class="day-tile-details">Temp: '+tempf+'&deg;F<br/>Wind: '+winds+'mph '+windd+'<br/>Humidity: '+humid+'%</div></div>';
							$('#location_weather').append(tile); //adds the tile to the section
							$('.day'+daynum).animate({opacity:1},2000); //fades it in slightly
							daynum++;
						}
					});

				}).fail(function(){
					$('#weatherforecast').html("Sorry, couldn't pull your forecast (or some other error message).").fadeIn('fast');
				});
			
		});


	});
	
})(jQuery);
