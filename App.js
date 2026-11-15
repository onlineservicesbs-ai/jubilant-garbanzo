
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ZARA APP</title>
<style>
*{box-sizing:border-box}
body{
  margin:0;
  font-family:Arial,sans-serif;
  background:#101827;
  color:white;
}
header{
  background:#1769ff;
  padding:22px;
  text-align:center;
  font-size:27px;
  font-weight:bold;
}
.container{
  max-width:450px;
  margin:35px auto;
  padding:20px;
}
.card{
  background:#1d293b;
  padding:25px;
  border-radius:18px;
  text-align:center;
}
input{
  width:100%;
  padding:15px;
  margin:10px 0;
  border:0;
  border-radius:10px;
  font-size:16px;
}
button{
  background:#1769ff;
  color:white;
  border:0;
  padding:14px;
  border-radius:10px;
  font-size:16px;
  width:100%;
  margin-top:10px;
}
#chatScreen{display:none}
#messages{
  height:300px;
  overflow:auto;
  background:#101827;
  padding:12px;
  border-radius:12px;
  text-align:left;
}
.message{
  background:#1769ff;
  padding:10px;
  border-radius:12px;
  margin:8px 0;
  overflow-wrap:anywhere;
}
.small{color:#bdc8d8}
</style>
</head>
<body>

<header>✨ ZARA APP</header>

<div class="container">

<div class="card" id="loginScreen">
  <h1>Welcome to ZARA</h1>
  <p class="small">आपका अपना चैट ऐप</p>
  <input id="username" placeholder="अपना नाम लिखें">
  <button onclick="login()">Login करें</button>
</div>

<div class="card" id="chatScreen">
  <h2>💬 ZARA CHAT</h2>
  <p id="welcome"></p>
  <div id="messages">
    <p class="small">ZARA में आपका स्वागत है!</p>
  </div>
  <input id="messageInput" placeholder="अपना मैसेज लिखें">
  <button onclick="sendMessage()">Send ➤</button>
  <button onclick="logout()" style="background:#dc3545">Logout</button>
</div>

</div>

<script>
function login(){
  let name=document.getElementById("username").value.trim();

  if(name===""){
    alert("पहले अपना नाम लिखें!");
    return;
  }

  document.getElementById("loginScreen").style.display="none";
  document.getElementById("chatScreen").style.display="block";
  document.getElementById("welcome").innerText="Hello, "+name+"!";
}

function sendMessage(){
  let input=document.getElementById("messageInput");
  let message=input.value.trim();

  if(message==="")return;

  let div=document.createElement("div");
  div.className="message";
  div.textContent=message;

  document.getElementById("messages").appendChild(div);
  input.value="";
  document.getElementById("messages").scrollTop=
  document.getElementById("messages").scrollHeight;
}

function logout(){
  document.getElementById("chatScreen").style.display="none";
  document.getElementById("loginScreen").style.display="block";
}
</script>

</body>
</html>
