Last version: v1.0.3

## To install: ##

* **NPM** // TODO: Get internal Url that has npm package
    * npm install devscope-botframeworkjs
* **Manual**
    * [Fazer download do código](https://raw.githubusercontent.com/ruisilva450/devscope-botframeworkjs/master/src/botFramework.js?token=AFYvWufX5ZpuKUCoo90d824b1Sokg_pxks5amEb3wA%3D%3D)

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
    bottom: "0",
    top: null,
    position: "fixed",
    background: "white",
    header_background: "#3e92d2",
    header_color: "#FFFFFF",
    border: "1px solid #DBDEE1",
    left: "null",
    left: "calc(100% - 300px)",
    animated: true,
    initMinimized: true
}
```

### Para obter o bot de QnA com reporting no PBIRobots: ###

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