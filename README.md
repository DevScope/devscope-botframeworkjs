Last version: v1.0.4

Docs: https://DevScope.github.com/devscope-botframeworkjs

## To install: ##

* **NPM** // TODO: Get internal Url that has npm package
    * npm install devscope-botframeworkjs
* **Manual**
    * [Fazer download do código](https://raw.githubusercontent.com/DevScope/devscope-botframeworkjs/master/src/botFramework.js)

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

## Para obter o bot de QnA com reporting no PBIRobots: ##

``` 
<script type="text/javascript">
    (function () {
        botFramework.config(
            {
                bot_id: "Powerbi_Robots",
                secret: "Pj21yov1Jto.cwA.DtI.yP3cBZahWvW6xPJh4UqwE602MqPKB1TWYHrGuupqLy0"
            });
    })();
</script>
```