/**
 * devscope-botframeworkjs
 * Integration module of bot framework web chat
 * @version v1.0.3 - 2018-02-22
 * @link https://github.com/ruisilva450/devscope-botframeworkjs
 * @author Rui Silva <rui.silva450@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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
        position: "fixed",
        background: "white",
        header_background: "#3e92d2",
        header_color: "#FFFFFF",
        border: "1px solid #DBDEE1",
        left: "null",
        left: "calc(100% - 320px)",
        animated: true,
        initMinimized: true
    };
    var config = defaultConfig;

    var minimaxHandler = function(iframeContainer) {
        if (iframeContainer.style.height == config.height) {
            iframeContainer.style.height = '40px';
        } else {
            iframeContainer.style.height = config.height;
        }
    };

    var botElement = {
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
            config.header_background = botConfig.header_background || config.header_background;
            config.header_color = botConfig.header_color || config.header_color;
            config.left = botConfig.left || config.left;
            config.right = botConfig.right || config.right;
            config.animated = botConfig.animated || config.animated;
            config.initMinimized = botConfig.initMinimized || config.initMinimized;
            var callback = function(result) {
                var iframeContainer = document.querySelector('#botFrameworkContainer');
                if (iframeContainer == null || iframeContainer == undefined) {
                    iframeContainer = document.createElement("div");
                } else {
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
                    iframeContainer.style.zIndex = 2;
                    if (config.animated)
                        iframeContainer.style.transition = "height 0.20s ease";
                    var containerHeader = document.createElement("div");
                    containerHeader.style.width = "100%";
                    containerHeader.style.height = "37px";
                    containerHeader.style.position = "absolute";
                    containerHeader.style.cursor = "pointer";
                    containerHeader.style.background = config.header_background;
                    var headerText = document.createElement("div");

                    headerText.style.cssText = "font-size:18px !important;font-family:'Segoe UI' !important;color:" + config.header_color + " !important;text-align:left !important;padding-top:7px;padding-left:15px";
                    headerText.innerHTML = "Chat";
                    containerHeader.appendChild(headerText);

                    containerHeader.onclick = function() {
                        minimaxHandler(iframeContainer);
                    };

                    if (config.initMinimized) {
                        minimaxHandler(iframeContainer);
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
    window.botFramework = botElement;
})();