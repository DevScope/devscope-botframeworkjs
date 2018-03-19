Last version: v1.5.0

Docs: https://DevScope.github.com/devscope-botframeworkjs

## To install: ##

* **NPM** // TODO: Get internal Url that has npm package
    * npm install devscope-botframeworkjs
* **Manual**
    * [Download code](https://raw.githubusercontent.com/DevScope/devscope-botframeworkjs/master/src/botFramework.js)

## To use: ##

```
botFramework.config(
    {
        bot_id:"YOUR_BOT_ID",
        secret:"YOUR_SECRET_ID"
    });
```
## Optional parameters ##
```
{
    bot_id: null,
    secret: null,
    user_id: null,
    username: null,
    width: "300px",
    height: "450px",
    max_height:"100%",
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
}
```

## To obtain an QnA bot with reporting for PBIRobots: ##

``` 
<script type="text/javascript">
    (function () {
        botFramework.config(
            {
                bot_id: "Powerbi_Robots",
                secret: "ovMeJRj3x6w.cwA.2ac.X_nVXspKtICvJlj_CSZ_1WZSGxJnG7iLgKP4h3JT2Ws"
            });
    })();
</script>
```