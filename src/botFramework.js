(function () {
    'use strict';

	var constants = {
		tokenUrl:"https://webchat.botframework.com/api/tokens",
		iframeUrl:"https://webchat.botframework.com/embed/"
	};

	var defaultConfig = {
		bot_id:null,
		secret: null,
		width: "300px",
		height: "450px",
		bottom: "0",
		top: null,
		position: "sticky",
		border: "1px solid #DBDEE1",
		left: "null",
		left: "calc(100% - 300px)"
	};

	var config = defaultConfig;

    var botIFrame = {
    	config: function (botConfig) {
			if (botConfig.bot_id == null || botConfig.bot_id == undefined || botConfig.bot_id == "") {
				return "bot_id is required!";
			}

			if (botConfig.secret == null || botConfig.secret == undefined || botConfig.secret == "") {
				return "secret is required!";
			}

    		config.bot_id = botConfig.bot_id;
    		config.secret = botConfig.secret;

			config.width = botConfig.width || config.width;
			config.height = botConfig.height || config.height;
			config.bottom = botConfig.bottom || config.bottom;
			config.top = botConfig.top || config.top;
			config.position = botConfig.position || config.position;
			config.border = botConfig.border || config.border;
			config.left = botConfig.left || config.left;
			config.right = botConfig.right || config.right;

			var callback = function (result) {
				var iframe = document.querySelector('#botFramework');
				if (iframe == null || iframe == undefined) {
					iframe = document.createElement("iframe");
				}

				try{
					iframe.setAttribute("id","botFramework");
					iframe.setAttribute("src", constants.iframeUrl + config.bot_id + "?t=" + result.slice(1, -1));
					iframe.style.width = config.width;
					iframe.style.height = config.height;
					iframe.style.bottom = config.bottom;
					iframe.style.top = config.top;
					iframe.style.position = config.position;
					iframe.style.border = config.border;
					iframe.style.left = config.left;
					iframe.style.right = config.right;
					document.body.appendChild(iframe);
				}catch(e){
					console.log(e);
				}
			};

    		var xmlHttp = new XMLHttpRequest();
		    xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		            callback(xmlHttp.responseText);
		    }
		    xmlHttp.open("GET", constants.tokenUrl, true); // true for asynchronous 
		    xmlHttp.setRequestHeader("Authorization", "BotConnector " + config.secret);
		    xmlHttp.send(null);
    	}
    };

    window.botFramework = botIFrame;
})();