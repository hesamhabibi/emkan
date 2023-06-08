>## Models:
>create your Models in `/backend/models/` folder and register that in `/backend/models/index.js` file.

>## Controllers:
>create your typeDefs and resolvers in `/backend/controllers/<controllerName>/` folder and register them in `/backend/index.js` file.

>## Middlewares:
>create your middleware in `/backend/middlewares/` folder and register in `/backend/index.js` file.  
>middleware is a function that get `(resolve,parent,args,ctx,info)` then run `resolve` function with `(parent,args,ctx,info)` arguments and return result.  
>for example: 
>````javascript
>(resolve,parent,args,ctx,info) => {  
>/*before*/
>const result = resolve(parent,args,ctx,info);
>/*after*/
>return result
>}
>````

>## Helpers:
> create your helper in `/backend/helpers/` and register that in `/backend/index.js` file.

>## Tips:
>to use `models` in `resolver` function, get models from `ctx` argumanet.  
for example: 
>````javascript
> (parent,args,{models:{ <modelsName> }},info) => {
>    // user models here...
>}
>````
