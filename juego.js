var fondo, carro, cursores, enemigos, timer, pause, boolPause;
var score, txtScore, vidas, txtVidas, niveles = 1, txtNivel;
var velocity_pista;
var velocidadObj =0;
var GameOver;
var Juego = {
    preload: function() {
        juego.load.image('bg','img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('gasolina', 'img/gas.png');
        juego.forceSingleUpdate = true;
    },
    create: function() {
        velocity_pista = 5;
        fondo = juego.add.tileSprite(0,0,290,540,'bg');

        carro = juego.add.sprite(juego.width/2, 490, 'carro');
        carro.anchor.setTo(0.5);
        //carro.enableBody = true;

        enemigos = juego.add.group();
        juego.physics.arcade.enable(enemigos, true);
        enemigos.enableBody = true;
        enemigos.createMultiple(20, 'carroMalo');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);


        gasolinas = juego.add.group();
        juego.physics.arcade.enable(gasolinas, true);
        gasolinas.enableBody = true;
        gasolinas.createMultiple(20, 'gasolina');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);

        timer       = juego.time.events.loop(1500, this.crearCarroEnemigo, this);
        timerGas    = juego.time.events.loop(2000, this.crearGasolina, this);

        cursores=juego.input.keyboard.createCursorKeys();
        score = 0;
		juego.add.text(40,20, "Score: ",{font: "bold 24px Arial",fill: "red"});
		txtScore = juego.add.text(130,20, "0",{font: "bold 24px Arial",fill: "red"});

        vidas = 1;
		juego.add.text(40,50, "Vidas: ",{font: "bold 24px Arial",fill: "red"});
		txtVidas = juego.add.text(130,50, "1",{font: "bold 24px Arial",fill: "red"});

        pause =juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        boolPause =  false ;

		juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(carro);
        carro.body.collideWorldBounds=true;
    },
    update: function() {
        if(score%10 == 0 && score !=0)
        {
            velocity_pista += 0.011;
        }
        fondo.tilePosition.y += velocity_pista;

        juego.physics.arcade.overlap(carro, enemigos, this.fnCollision, null, this);
        juego.physics.arcade.overlap(carro, gasolinas, this.fnRecogerGas, null, this);

        if(cursores.right.isDown &&
            carro.position.x <240){
            carro.position.x +=5;
        }

        if(cursores.left.isDown &&
            carro.position.x >50){
            carro.position.x -=5;
        }

    },
    crearCarroEnemigo: function(){
        var pos     = Math.floor(Math.random()*3)+1;
        var enemy   = enemigos.getFirstDead();
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.reset(pos*73,0); 
        if(score%10 == 0 && score !=0)
        {
            velocidadObj += 15;
        }
        enemy.body.velocity.y = 200 + velocidadObj;
        enemy.anchor.setTo(0.5);
    },
    crearGasolina: function(){
        var pos     = Math.floor(Math.random()*3)+1;
        var gas     = gasolinas.getFirstDead();
        gas.physicsBodyType = Phaser.Physics.ARCADE;
        gas.reset(pos*73,0); 
        if(score%10 == 0 && score !=0)
        {
            velocidadObj += 15;
        }
        gas.body.velocity.y = 200+ velocidadObj;
        gas.anchor.setTo(0.5);
    },
    fnCollision: function(b,m){
		b.kill();
		m.kill();
		var audio = new Audio('media/choque.mp3');
		audio.play();
        juego.state.start('Terminado');
	},
    fnRecogerGas: function(b,m){
        m.kill();
        score++;
		txtScore.text = score;
        var audio = new Audio('media/gasadd.mp3');
		audio.play(); 

    }
}