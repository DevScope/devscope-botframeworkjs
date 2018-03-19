/**
 * devscope-botframeworkjs
 * Integration module of bot framework web chat
 * @version v1.0.4 - 2018-02-22
 * @link https://github.com/DevScope/devscope-botframeworkjs
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
        username: null,
        user_id: null,
        width: "300px",
        height: "450px",
        max_height: "100%",
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
            iframeContainer.style.height = '37px';
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
            config.username = botConfig.username;
            config.user_id = botConfig.user_id;
            config.width = botConfig.width || config.width;
            config.height = botConfig.height || config.height;
            config.max_height = botConfig.max_height || config.max_height;
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
            var callback = function() {
                var iframeContainer = document.querySelector('#botFrameworkContainer');
                if (iframeContainer == null || iframeContainer == undefined) {
                    iframeContainer = document.createElement("div");
                } else {
                    iframeContainer.innerHTML = "";
                }

                try {
                    iframeContainer.setAttribute("id", "botFrameworkContainer");
                    iframeContainer.style.width = config.width;
                    iframeContainer.style.height = config.height;
                    iframeContainer.style.maxHeight = config.max_height;
                    iframeContainer.style.bottom = config.bottom;
                    iframeContainer.style.top = config.top;
                    iframeContainer.style.background = config.background;
                    iframeContainer.style.position = config.position;
                    iframeContainer.style.border = config.border;
                    iframeContainer.style.left = config.left;
                    iframeContainer.style.right = config.right;
                    iframeContainer.style.zIndex = 1500;
                    if (config.animated)
                        iframeContainer.style.transition = "height 0.20s ease";
                    var containerHeader = document.createElement("div");
                    containerHeader.style.width = "100%";
                    containerHeader.style.height = "37px";
                    containerHeader.style.position = "absolute";
                    containerHeader.style.cursor = "pointer";
                    containerHeader.style.zIndex = "2";
                    containerHeader.style.background = config.header_background;
                    var headerText = document.createElement("div");

                    headerText.style.cssText = "font-size:18px !important;font-family:'Segoe UI' !important;color:" + config.header_color + " !important;text-align:left !important;padding-top:7px;padding-left:15px";
                    headerText.innerHTML = "Chat 2";
                    containerHeader.appendChild(headerText);

                    containerHeader.onclick = function() {
                        minimaxHandler(iframeContainer);
                    };

                    if (config.initMinimized) {
                        minimaxHandler(iframeContainer);
                    }

                    iframeContainer.appendChild(containerHeader);
                    document.body.appendChild(iframeContainer);

                    var botDiv = document.querySelector('#botFramework');
                    if (botDiv == null || botDiv == undefined) {
                        botDiv = document.createElement("div");
                    }
                    botDiv.setAttribute("id", "botFramework");

                    iframeContainer.appendChild(botDiv);
                    var botOptions = {
                        directLine: {
                            secret: config.secret
                        },
                        bot: {
                            id: config.bot_id
                        },
                        resize: 'detect'
                    };

                    if (config.user_id && config.user_id != "") {
                        botOptions.user = {
                            id: config.user_id,
                            name: config.username
                        };
                    }

                    BotChat.App(botOptions, botDiv);

                    botDiv.style.height = '100%';
                    botDiv.style.border = '0';
                } catch (e) {
                    console.log(e);
                }
            };

            var loadBot = function() {
                callback();
            };

            var link = document.createElement("link");
            link.href = "https://cdn.botframework.com/botframework-webchat/latest/botchat.css";
            link.type = "text/css";
            link.rel = "stylesheet";

            document.getElementsByTagName("head")[0].appendChild(link);

            var script = document.createElement('script');
            script.onload = function() {
                loadBot();
            };
            script.src = "https://cdn.botframework.com/botframework-webchat/latest/botchat.js";

            document.head.appendChild(script); //or something of the likes
        }
    };
    window.botFramework = botElement;
})();