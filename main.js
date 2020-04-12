// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, remote } = require('electron');
const express = require("express");

const path = require('path')

let mainWindow

app.on('ready', function(){

  var ex = express();

  mainWindow = new BrowserWindow();
  ipcMain.on("para", (event,arg) => {
    if(arg.status){
      mainWindow.hide();
    }
  });

  ex.get("/whats/:num/:msg", function(req, res){
    var telefone = req.params.num;
    var mensagem = req.params.msg;

    mainWindow.loadURL("https://web.whatsapp.com/send?phone="+telefone+"&text="+mensagem);
   // mainWindow.webContents.executeJavaScript('var {ipcRenderer, remote} = require("electron"); var enviado = false; function enviar(){ var btsend = document.getElementsByClassName("_35EW6")[0]; var inputSend = document.getElementsByClassName("_2S1VP")[0] if(typeof inputSend !== "undefined" && inputSend.textContent && !enviado){ btsend.click(); enviado = true; }else if(enviado){ ipcRenderer.send("para",{status:true}); enviado = false; } } setInterval(enviar, 3000);');
    mainWindow.show();
    res.send("teste123");
  });

  ex.listen(3400);













  
  


/*
  var {ipcRenderer, remote} = require("electron");
  var enviado = false;


  function enviar(){
    var btsend = document.getElementsByClassName("_35EW6")[0];
    var inputSend = document.getElementsByClassName("_2S1VP")[0]
    if(typeof inputSend !== "undefined" && inputSend.textContent && !enviado){
      btsend.click();
      enviado = true;
    }else if(enviado){
      ipcRenderer.send("para",{status:true});
      enviado = false;
    }    
  }

  setInterval(enviar, 3000);
*/


});