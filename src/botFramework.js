(function() {
    'use strict';

    var constants = {
        tokenUrl: "https://webchat.botframework.com/api/tokens",
        iframeUrl: "https://webchat.botframework.com/embed/"
    };

    var defaultConfig = {
        bot_id: null,
        secret: null,
        width: "300px",
        height: "450px",
        bottom: "0",
        top: null,
        position: "sticky",
        background: "white",
        border: "1px solid #DBDEE1",
        left: "null",
        left: "calc(100% - 300px)"
    };

    var config = defaultConfig;

    var botIFrame = {
        config: function(botConfig) {
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
            config.background = botConfig.background || config.background;
            config.position = botConfig.position || config.position;
            config.border = botConfig.border || config.border;
            config.left = botConfig.left || config.left;
            config.right = botConfig.right || config.right;

            var callback = function(result) {
                var iframeContainer = document.querySelector('#botFrameworkContainer');
                if (iframeContainer == null || iframeContainer == undefined) {
                    iframeContainer = document.createElement("div");
                }else{
	                iframeContainer.innerHTML = "";
                }

                var iframe = document.querySelector('#botFramework');
                if (iframe == null || iframe == undefined) {
                    iframe = document.createElement("iframe");
                }

                try {
                    iframeContainer.setAttribute("id", "botFrameworkContainer");
                    iframeContainer.style.width = config.width;
                    iframeContainer.style.height = config.height;
                    iframeContainer.style.bottom = config.bottom;
                    iframeContainer.style.top = config.top;
                    iframeContainer.style.background = config.background;
                    iframeContainer.style.position = config.position;
                    iframeContainer.style.border = config.border;
                    iframeContainer.style.left = config.left;
                    iframeContainer.style.right = config.right;

                    var containerHeader = document.createElement("div");
                    containerHeader.style.float = "right";
                    containerHeader.style["margin-bottom"] = "-36px";
                    containerHeader.style.color = "white";
                    containerHeader.style["margin-top"] = "5px";
                    containerHeader.style["margin-right"] = "10px";
                    containerHeader.style.cursor = "pointer";

                    var icon = document.createElement("i");
                    icon.setAttribute("id","bot-header-collapse");
                    icon.className = "fa fa-angle-down fa-2x";
                    containerHeader.appendChild(icon);

                    containerHeader.onclick = function() {
                        if (iframeContainer.style.height == config.height) {
                    		icon.className = "fa fa-angle-up fa-2x";
                            iframeContainer.style.height = '40px';
                        } else {
                    		icon.className = "fa fa-angle-down fa-2x";
                            iframeContainer.style.height = config.height;
                        }
                    }
                    iframeContainer.appendChild(containerHeader);

                    iframe.setAttribute("id", "botFramework");
                    iframe.setAttribute("src", constants.iframeUrl + config.bot_id + "?t=" + result.slice(1, -1));
                    iframe.style.height = '100%';
                    iframe.style.border = '0';

                    iframeContainer.appendChild(iframe);
                    document.body.appendChild(iframeContainer);
                } catch (e) {
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
