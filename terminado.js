var Terminado = {
    
    preload: function(){
        
    },
    
    create: function(){
        var mxp = localStorage.getItem("maxScore");
        if (score > mxp ){
            localStorage.setItem("maxScore", score);
        }
  		juego.stage.backgroundColor = "990000";
        GameOver = juego.add.text(70,20, "GAME OVER",{font: "bold 24px Arial",fill: "#fff"});
        juego.add.text(30,60, "Puntaje Máximo: ",{font: "bold 20px Arial",fill: "#fff"});
        juego.add.text(240,60, mxp,{font: "bold 20px Arial",fill: "#fff"});

        juego.add.text(30,100, "Su Puntaje: ",{font: "bold 20px Arial",fill: "#fff"});
        juego.add.text(240,100, score,{font: "bold 20px Arial",fill: "#fff"});

        if (score > mxp ){
            GameOver = juego.add.text(40,150, "NUEVO RECORD",{font: "bold 24px Arial",fill: "#fff"});
        }
    }
    
   
};