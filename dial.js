jQuery.fx.interval = 42;
function NtmtTesterDial(styleId,typ) {
	this.htmlId='mtrWebTesterDial'+Math.floor((Math.random()*1000000)+1);
	this.typ=typ;
	this.width=215;
	this.height=215;
	this.styleId=styleId;
	this.valueOld=0;
	this.enabled=0;
	this.DialGaugeMax=102400;
	this.DialGauge=new Array();
	this.DialGauge[0]=new Array(0,-135);
	this.DialGauge[1]=new Array(1024,-90);
	this.DialGauge[2]=new Array(5120,-45);
	this.DialGauge[3]=new Array(10240,0);
	this.DialGauge[4]=new Array(25600,45);
	this.DialGauge[5]=new Array(51200,90);
	this.DialGauge[6]=new Array(this.DialGaugeMax,135);
	this.dWrite = function(s){
        	var scripts = document.getElementsByTagName('script');
    		var lastScript = scripts[scripts.length-1];
    		lastScript.insertAdjacentHTML("afterend", s);
	}
	this.divs='<div id="'+this.htmlId+'" style="width:'+this.width+'px;height:'+this.height+'px;">';
	this.divs +='<div class="mtrwebtester_dial">';
	if (typ=='up')
		this.divs +='<div class="mtrwebtester_dial_arrow mtrwebtester_dial_arrow_up">';
	else
		this.divs +='<div class="mtrwebtester_dial_arrow">';
	this.divs+='</div>';
	this.divs+='<div class="mtrwebtester_dial_fg">';
	this.divs+='</div>';
	this.divs+='<div class="mtrwebtester_dial_text">';
	if (typ=='up')
		this.divs+='<span class="mtrwebtester_dial_text_number" style="color:#a26822">&nbsp;</span>';
	else
		this.divs+='<span class="mtrwebtester_dial_text_number" style="color:#5CA222">&nbsp;</span>';
	this.divs+='<span>Mbps</span>';
	this.divs+='</div>';
	this.divs+='</div>';
	this.divs+='</div>';
    this.dWrite(this.divs);
        $('#'+this.htmlId+' .mtrwebtester_dial_arrow').show();
	$('#'+this.htmlId+' .mtrwebtester_dial_arrow').animate({  value: -135 }, {
		step: function(now,fx) {
			$(this).css('-webkit-transform','rotate('+now+'deg)'); 
			$(this).css('-moz-transform','rotate('+now+'deg)');
			$(this).css('transform','rotate('+now+'deg)');
		},
		duration:1000
	},'linear');
	$('#'+this.htmlId ).fadeTo( 1000 , 0.25, function() {
	});
	this.drawDial = function(value) {
		if (value>=0) {
			if (this.enabled==0) {
				this.enabled=1;
				$('#'+this.htmlId ).fadeTo( 250 , 1.0, function() {
				});
			}
			$('#'+this.htmlId+' .mtrwebtester_dial_arrow').animate({  value: this.vratAngleGauge(value) }, {
					step: function(now,fx) {
						$(this).css('-webkit-transform','rotate('+now+'deg)'); 
						$(this).css('-moz-transform','rotate('+now+'deg)');
						$(this).css('transform','rotate('+now+'deg)');
					},
					duration:20,
			},'linear');
		jQuery({someValue: (this.valueOld/1024) ,  htmlID:this.htmlId }).animate({someValue: (value/1024)}, {
			duration: 20,
			easing:'linear',
			step: function() {
				$('#'+this.htmlID+' .mtrwebtester_dial_text_number').text(ntmt_getvalue(this.someValue));
			}
		});
		} else {
			$('#'+this.htmlId+' .mtrwebtester_dial_arrow').hide();
			$('#'+this.htmlId+' .mtrwebtester_dial_text_number').text("NaN");
		}
		this.valueOld=value;
	}
	this.resetDial = function() {
		if (this.enabled==1) {
                	this.enabled=0;
                        $('#'+this.htmlId ).fadeTo( 1000 , 0.25, function() {});
			$('#'+this.htmlId+' .mtrwebtester_dial_arrow').animate({  value: -135 }, {
                        	step: function(now,fx) {
                                	$(this).css('-webkit-transform','rotate('+now+'deg)');
                                	$(this).css('-moz-transform','rotate('+now+'deg)');
                                	$(this).css('transform','rotate('+now+'deg)');
                        	},
                		duration:1000
                	},'linear');
                $('#'+this.htmlId+' .mtrwebtester_dial_text_number').html("&nbsp;");
		}
	}	
	this.vratAngleGauge = function(value) {
		tmpvalue=value;
		if (tmpvalue>this.DialGaugeMax) {
			tmpvalue=this.DialGaugeMax-1;
			}
		if (value<=0) {
			return this.DialGauge[0][1];
		}
		Angle=0;
		for (var i=1;i<this.DialGauge.length;i++)
			if (tmpvalue<this.DialGauge[i][0]) {
				Angle=this.DialGauge[i-1][1] + ((tmpvalue-this.DialGauge[i-1][0])*(this.DialGauge[i][1]-this.DialGauge[i-1][1])) / (this.DialGauge[i][0]-this.DialGauge[i-1][0]);
				break;
			}
		return Angle;
	}
	this.toRadians = function(Angle) {
		return ((Angle/360)*6.28318530718);
	}
}
function NtmtTesterDialPing(styleId) {
	this.htmlId='mtrWebTesterDial'+Math.floor((Math.random()*1000000)+1);
	this.width=161;
	this.height=161;
	this.styleId=styleId;
	this.valueOld=0;
	this.enabled=0;
	this.DialGaugeMax=100;
	this.DialGauge=new Array();
	this.DialGauge[0]=new Array(0,-135);
	this.DialGauge[1]=new Array(1,-90);
	this.DialGauge[2]=new Array(5,-45);
	this.DialGauge[3]=new Array(10,0);
	this.DialGauge[4]=new Array(25,45);
	this.DialGauge[5]=new Array(50,90);
	this.DialGauge[6]=new Array(this.DialGaugeMax,135);
	this.dWrite = function(s){
        	var scripts = document.getElementsByTagName('script');
    		var lastScript = scripts[scripts.length-1];
    		lastScript.insertAdjacentHTML("afterend", s);
	}
	this.divs='<div id="'+this.htmlId+'" style="width:'+this.width+'px;height:'+this.height+'px;">';
	this.divs+='<div class="mtrwebtester_dial_ping">';
	this.divs+='<div class="mtrwebtester_dial_arrow mtrwebtester_dial_arrow_ping">';
	this.divs+='</div>';
	this.divs+='<div class="mtrwebtester_dial_fg">';
	this.divs+='</div>';
	this.divs+='<div class="mtrwebtester_dial_text">';
	this.divs+='<span class="mtrwebtester_dial_text_number" style="color:#237F89">&nbsp;</span>';
	this.divs+='<span>ms</span>';
	this.divs+='</div>';
	this.divs+='</div>';
	this.divs+='</div>';
	this.dWrite(this.divs);
        $('#'+this.htmlId+' .mtrwebtester_dial_arrow').show();
	$('#'+this.htmlId+' .mtrwebtester_dial_arrow').animate({  value: -135 }, {
		step: function(now,fx) {
			$(this).css('-webkit-transform','rotate('+now+'deg)'); 
			$(this).css('-moz-transform','rotate('+now+'deg)');
			$(this).css('transform','rotate('+now+'deg)');
		},
		duration:1000
	},'linear');
        $('#'+this.htmlId ).fadeTo( 1000 , 0.25, function() {
        });
	this.drawDial = function(value) {
		if (value>=0) {
			if (this.enabled==0) {
                                this.enabled=1;
                                $('#'+this.htmlId ).fadeTo( 250 , 1.0, function() {
                                });
                        }
			$('#'+this.htmlId+' .mtrwebtester_dial_arrow').animate({  value: this.vratAngleGauge(value) }, {
					step: function(now,fx) {
						$(this).css('-webkit-transform','rotate('+now+'deg)'); 
						$(this).css('-moz-transform','rotate('+now+'deg)');
						$(this).css('transform','rotate('+now+'deg)');
					},
					duration:250
			},'linear');
		jQuery({someValue: (this.valueOld) ,  htmlID:this.htmlId }).animate({someValue: value}, {
			duration: 250,
			easing:'linear',
			step: function() {
				$('#'+this.htmlID+' .mtrwebtester_dial_text_number').text(ntmt_getvalue(this.someValue));
			}
		});
		} else {
			$('#'+this.htmlId+' .mtrwebtester_dial_arrow').hide();
			$('#'+this.htmlId+' .mtrwebtester_dial_text_number').text("NaN");
		}
		this.valueOld=value;
	}
        this.resetDial = function() {
                if (this.enabled==1) {
                        this.enabled=0;
                        $('#'+this.htmlId ).fadeTo( 1000 , 0.25, function() {});
                        $('#'+this.htmlId+' .mtrwebtester_dial_arrow').animate({  value: -135 }, {
                                step: function(now,fx) {
                                        $(this).css('-webkit-transform','rotate('+now+'deg)');
                                        $(this).css('-moz-transform','rotate('+now+'deg)');
                                        $(this).css('transform','rotate('+now+'deg)');
                                },
                                duration:1000
                        },'linear');
                $('#'+this.htmlId+' .mtrwebtester_dial_text_number').html("&nbsp;");
                }
        }
	this.vratAngleGauge = function(value) {
		tmpvalue=value;
		if (tmpvalue>this.DialGaugeMax) {
			tmpvalue=this.DialGaugeMax-1;
			}
		if (value<=0) {
			return this.DialGauge[0][1];
		}
		Angle=0;
		for (var i=1;i<this.DialGauge.length;i++)
			if (tmpvalue<this.DialGauge[i][0]) {
				Angle=this.DialGauge[i-1][1] + ((tmpvalue-this.DialGauge[i-1][0])*(this.DialGauge[i][1]-this.DialGauge[i-1][1]))	/ (this.DialGauge[i][0]-this.DialGauge[i-1][0]);
				break;
			}
		return Angle;
	}
	this.toRadians = function(Angle) {
		return ((Angle/360)*6.28318530718);
	}
}
function ntmt_progressBar(percent, $element) {
	if(percent>0){
   		var progressBarWidth = percent * $element.width() / 100;
    	$element.find('div').animate({ width: progressBarWidth }, 20).html(percent.toFixed(0) + "%");
	} else 
		$element.find('div').animate({ width: 0 }, 1000).html("");
}
function ntmt_getvalue(value) {
	var out=0;
	if (value>=100)
		out=parseFloat(Math.ceil(value*100)/100).toFixed(0);
	else if (value>=10)
		out=parseFloat(Math.ceil(value*100)/100).toFixed(1);
	else
		out=parseFloat(Math.ceil(value*100)/100).toFixed(2);
	return out;
}
