Function Parameters
Rest Parameters
Spread
Currying 
Higher Order Function
Default Parameters
Callback 
Recursion 
Function Return
Closure
Anonymous 

Async Functions:
- Functions are default "Synchronous".
- A function locks all other tasks in the background while executing the given task.
- Async allows to perform the given task in background.
- It can execute your task without blocking other tasks.
- It improves the performance of application.

Syntax:
        async function Name(params)
        {
            var ref = await values;
        }

Ex:
<script>
     let data;
     fetch("https://fakestoreapi.com/products")
     .then(async function(response){
         return await response.json();
     })
     .then(async function(products){
          data = await products;
          data.map(function(item){
             document.write(item.title + "<br>");
          })
     })
</script>

Function Promise: 
- It is used to configure an async function. 
- JavaScript E5+ version have default async function with promise. 
- Promise provides 
    a) resolve 
    b) reject
- Resolve is executed when condition evaluates to true.
- Reject is executed when condition is false.

Syntax:
    var  ref = new Promise(function(resolve, reject){
        
                  if(condition) {
                 resolve();
          } 
          else {
            reject();
          }
       });

    ref
    .then(function(){
        on success..
    })
    .catch(function(){
         on failure..
     })
    .finally(function(){
         always...
     })

Note: Promise can configure multiple then() blocks on success [resolve]


Ex: callback

<script>
     function Validate(password, success, failure)
     {
         if(password==="abc"){
             success("Login Success..");
         } else {
             failure("Invalid Password");
         }
     }
     Validate(
        prompt("Enter Password"),
        function(response) {
           document.write(response);
        },
        function(error) {
           document.write(error);
        }
     );
</script>


Ex:
<script>
     var Validate = new Promise(function(resolve, reject){
         var password = prompt("Enter Password");
         if(password==="abc"){
              resolve("Login Success..");
         } else {
             reject("Invalid Password");
         }
     });

     Validate
     .then(function(response){
         document.write(response);
     })
     
      .then(function(){
          var now = new Date();
          console.log("Request for verifying password sent.." + now.toLocaleTimeString());
      })
      .then(function(){
         var now = new Date();
         console.log("Password verified result is ready.." + now.toLocaleTimeString());
      })
    
     .catch(function(error){
        document.write(error);
     })
     .finally(function(){
        document.write("<br>Program End");
     })
</script>

FAQ: What is difference between callback and promise?
FAQ: What is difference between async function and promise function?

Arrow Functions:
- It is a shorthand technique of writing function expression.

    ()        refers to a function
    =>        refers to return 
    => { }    a set of statements to execute
    (params)    function with parameters

Syntax:
     var hello = function(name) {
         document.write(`Hello ! ${name`);
     }

    var hello = (name) => document.write(`Hello ! ${name}`);
    var hello  = name => document.write(`Hello ! ${name}`);
    hello('John');

    var add = function(a, b) {
        return a + b;
    }

    var add = (a, b) => a + b;

Ex:
<script>
    var add = (a,b)=> a + b;

    document.write(`Addition=${add(10,30)}`);
</script>

Ex:
<script>
     fetch(`https://fakestoreapi.com/products`)
     .then(response=> response.json())
     .then(products=> {
         products.map((product, index)=>{
             document.write(`[${index + 1}]. ${product.title}<br>`);
         })
     })
</script>


                           JavaScript Events

1. What is Event?
A. Event is a message sent by sender to its subscriber in order to notify change.
    It uses a delegate mechanism, which is a function pointer mechanism. 
    Event uses a software design pattern called "Observer", which is a communication pattern.

2. Event Handler
- It refers to event name and the function name that executes on trigger.

Syntax:
    <button onclick="InsertClick()">

        onclick                => Event
        onclick="InsertClick()"    => Event handler

3. Event Listener 

- It configures events for elements dynamically. 
- JavaScript provides "addEventListener()" to configure event for any element. 

Syntax:
 document.querySelector("button").addEventListener("eventName", function(){

 })

    onclick        => handler name
    click            => listener name

Ex:
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
   <script>
      function bodyload(){
         var btn = document.createElement("button");
         btn.innerHTML = "Insert";
         btn.addEventListener("click", function(){
             document.write("Record Inserted..");
         })
         document.getElementById("container").appendChild(btn);

         document.getElementById("btnDelete").addEventListener("click",()=>{
              document.write(`Record Deleted..`);
         })

      }
      
      
   </script>
</head>
<body onload="bodyload()">
   <div id="container">
      <button id="btnDelete">Delete</button>
   </div>
</body>
</html>