window.onload = function(){
    "use strict";
    
    function _s(x){
        return document.getElementById(x);
    }
    
    var vw = window.innerWidth || 360;
    var vh = window.innerHeight || 560;
    
    var w = (vw > 400) ? 400 : vw;
    var h = (vh > 700) ? 700 : vh;
    
    var ll = (vw-w)/2;
    var ltp = (vh-h)/2;
    
    //_s("container").style.backgroundImage = //"url(assets/img/BG.jpg)";
    
    var nextBtn = _s("nextBtn");
    var completeDiv = _s("over");
    var levelDiv = _s("levelDiv");
    
    var myDomain = "assets/";
    var canPlay = false;
    var sounds = {
        "levelComplete" : new Audio(),
        "levelStart" : new Audio(),
        "right" : new Audio(),
        "wrong" : new Audio(),
        "select" : new Audio(),
        "shuffle" : new Audio(),
        "extraWord" : new Audio()
    }
    
    sounds.levelComplete.src = myDomain+"levelComplete.mp3";
    sounds.levelStart.src = myDomain+"level_start.mp3";
    sounds.right.src = myDomain+"wsnd/right.mp3";
    sounds.wrong.src = myDomain+"wrong.mp3";
    sounds.select.src = myDomain+"select.mp3";
    sounds.shuffle.src = myDomain+"shuffle.mp3";
    sounds.extraWord.src = myDomain+"wsnd/extra_word.ogg";
    
    function play(x){
        if(canPlay){
            try{
                if(sounds[x].paused){
                    sounds[x].play().catch(function(err){});
                }
                else{
                    sounds[x].currentTime = 0;
                }
            }
            catch(err){
                //alert(err);
            }
        }
    }
    
    var starCnt = _s("starCnt");
    var compl = _s("complete");
    var nextBtnCnt = _s("nextBtnCnt");
    
    function startPlay(){
        _s("st").style.display = "none";
        levelBtn.style.display = "inline-block";
        //lContainer.style.transform = "scale(1)";
        nextBtn.style.display = "inline-block";
        //startLevel(0);
        levelCnt.style.display = "block";
        starCnt.style.display = "none";
        compl.style.display = "none";
        levelBack.style.display = "none";
        nextBtnCnt.style.display = "none";
       // levelDiv.style.transform = "translateY(0)";
        canPlay = true;
        for(var x in sounds){
            try{
                sounds[x].play().catch(function(err){});
            }
            catch(err){
                //alert(err);
            }
        }
    }
    
    _s("st").addEventListener("click",startPlay);
    
    var container = _s("container");
    container.style.height = h;
    container.style.width = w;
    container.style.left = ll+"px";
    container.style.top = ltp+"px";
    
    var cw = 220;
    var ch = 220;
    var ct = h/2+(h/2-ch)/2;
    var cl = (w-cw)/2;
    var c = _s("gameContainer");
    c.height = h;
    c.width = w;
    
    
    var ctx = c.getContext("2d");
    
    //ctx.fillRect(cl,ct,cw,ch);
    
    var shuffleBtn = _s("shuffle");
    var hintBtn = _s("hint");
    
    var lContainer = _s("lContainer");
    lContainer.style.height = ch+"px";
    lContainer.style.width = cw+"px";
    lContainer.style.top = ct+"px";
    lContainer.style.left = cl+"px";
    
    var lt = [_s("l1"),_s("l2"),_s("l3"),_s("l4"),_s("l5")];
    var previewTxt = _s("previewTxt");
    
    var levels = [
                    [['TIGRE'],['TI','RE']],//1
                    [['CIRCO'],['CIR','RCO']],//2
                    [['VENTO'],['VEN','TO']],//3
                    [['PEDRA'],['PED','DRA']],//4
                    [['JOGAR'],['JOG','AR']],//5
                    [['NUVEM'],['NUV','EM']],//6
                    [['COBRE'],['CO','BRE']],//7
                    [['DISCO'],['DAS','CO']],//8
                    [['FILME'],['FI','ME']],//9
                    [['CINZA'],['CIN','ZA']],//10
                    [['NATA','ANTA'],['TA','AN']],//11
                    [['GOL','GELO'],['LO','GE','GEL']],//12
                    [['LUZ','LUIZ'],['UIZ','UZ']],//13
                    [['ASA','CASA'],['SA','SA']],//14
                    [['GAS','SAGA'],['AGA','AS']],//15
                    [['DAVI','VIDA'],['IDA','AVI']],//16
                    [['GOMA','AMIGO'],['OMA','IGO']],//17
                    [['LUTO','CULTO'],['UTO','LTO']],//18
                    [['EVA','NAVE'],['VA']],//19
                    [['BELA','BELGA'],['EBA','ELA']],//20
                    [['TEM','TOME','MONTE'],['US','USA','ACU']],//21
                    [['VER','REDE','VERDE'],['VER','R','RDE']],//22
                    [['AMA','LAMA','LHAMA'],['AMA']],//23
                    [['AMOR','ROMA','MAIOR'],['OR','OMA','IOR']],//24
                    [['GURI','RUGI','FUGIR'],['UGI','UGIR','GU']],//25
                    [['RIXA','FIXA','FIXAR'],['OR','OMA','IOR']],//26
                    [['PAZ','PARA','RAPAZ'],['ZA','ARA','PAZ']],//27
                    [['CAI','AQUI','CAQUI'],['AI','QUI']],//28
                    [['PAR','PAI','PIRA'],['AR','RA','AI']],//29
                    [['RALO','CORAL','CAROL','CLARO'],['ALO','ORA','ROL','ARO']],//30
                    [['MAR','AMOR','ROMA','MAIOR'],['OR','OMA','IOR']],//31
                    [['DIA','VAI','DIVA','VIDA'],['IDA','IA']],//32
                    [['PIRO','MIRO','RIMO','PRIMO'],['IMO','OMI','IRO']],//33
                    [['LOBO','LOGO','BOLO','GLOBO'],['OBO','OGO']],//34
                    [['COR','ARCO','RARO','CARRO'],['RRO','RO','CO']],//35
                    [['DOR','RODA','DOAR','DORAR'],['OR','ODA','RAR']],//36
                    [['RIA','MAR','RIO','MARIO'],['IA','AR','RIO']],//37
                    [['TOM','MOTA','TOMA','MATO'],['OR','ODA','RAR']],//38
                    [['LAR','BAR','LIBRA','ABRIL'],['AR','BRA','BRIL']],//39
                    [['ELA','LER','LAR','REAL'],['LA','LAR','EAL']],//40
                    [['UM','TOM','TIO','MITO','MUITO'],['ITO','IO','OM','M']],//41
                    [['GALA','GOLA','LAGO','GALO','LAGOA'],['GOA','AGO','LA']],//42
                    [['OLA','LUA','COLA','CALO','LOUCA'],['LA','UA','OLA','LO']],//43
                    [['TER','POR','RETO','PERTO','PRETO'],['LA','UA','OLA','LO']],//44
                    [['ARCO','CABO','BOCA','COBRA','BARCO'],['OCA','ABO','BRA','ARO','RCO']],//45
                    [['ELA','ERA','RETA','TELA','LETRA'],['LA','RA','ETA','TE','LET']],//46
                    [['ALFA','FALA','LATA','ALTA','FALTA'],['LA','UA','OLA','LO']],//47
                    [['AVE','UVA','EVA','SUA','SUAVE'],['VE','AV','UV','UA','SU']],//48
                    [['SAL','SOL','TALO','SOLTA','SALTO'],['SA','SO','TA','SAL','LTO']],//49
                    [['LAR','LAVA','VARA','VARAL','LARVA'],['AR','ARA','RVA']],//50

                ]
    
    var points = [[Math.round(ll+w/2),Math.round(ltp+ct+cw/8)],[Math.round(ll+cl+cw/8),Math.round(ltp+ct+ch*41.5/100)],[Math.round(ll+w-(cl+cw*25/200)),Math.round(ltp+ct+ch*41.5/100)],[Math.round(ll+cl+cw/4),Math.round(ltp+ct+ch*87.5/100)],[Math.round(ll+w-(cl+cw/4)),Math.round(ltp+ct+ch*87.5/100)]];
    var linePoints = [];
    var started = true;
    
    ctx.lineWidth = 9;
    ctx.strokeStyle = "blue";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    function drawLine(x,y){
        if(linePoints[0] >= 0){
            ctx.clearRect(0,0,w,h);
            ctx.beginPath();
            ctx.moveTo(points[linePoints[0]][0]-ll,points[linePoints[0]][1]-ltp);
            for(var n = 1; n < linePoints.length; n++){
                ctx.lineTo(points[linePoints[n]][0]-ll,points[linePoints[n]][1]-ltp);
            }
            ctx.lineTo(x-ll,y-ltp);
            ctx.stroke();
            //letterTrans(lt[linePoints[linePoints.length-1]]);
        }
    }
    
    var temp1 = [];
    var temp2 = [];
    function clearLine(){
        var wordPos = levels[currentLevel][0].indexOf(currentWord);
        if(linePoints[0] >= 0){
            if(wordPos > -1){
                ctx.strokeStyle = "lime";
                previewTxt.style.background = "lime";
                previewTxt.style.color = "#000";
                
                var txt = "";
                var wordArr = currentWord.split("");
                
                for(var n = 0; n < currentWord.length; n++){
                    txt += "<div class='wld'>"+wordArr[n]+"</div>";
                }
                wcnt[wordPos].innerHTML = txt;
                
                if(temp1.indexOf(currentWord) < 0){
                    temp1.push(currentWord);
                    updateCoin(10);
                    //play("right");
                    if(temp1.length >= levels[currentLevel][0].length){
                        temp1 = [];
                        temp2 = [];
                        setTimeout(function(){
                            levelComplete();
                        //    startLevel(currentLevel+1);
                        },2000)
                        
                        setTimeout(function(){
                            var wls = document.getElementsByClassName("wld");
                            for(var n = 0; n < wls.length; n++){
                                wls[n].style.transform = "translateY("+Math.floor(100+Math.random()*200)+"px) rotate("+Math.floor(Math.random()*90-45)+"deg)";
                                wls[n].style.opacity = 0;
                                lContainer.style.transform = "scale(0) rotate(0)";
                                levelDiv.style.transform = "translateY(-100px)";
                                shuffleBtn.style.transform = "translateX(-100px)";
                                hintBtn.style.transform = "translateX(100px)";
                            }
                        },1000);
                    }
                    setTimeout(function(){
                        play("right");
                    },100);
                }
            }
            else if(levels[currentLevel][1].indexOf(currentWord) > -1){
                ctx.strokeStyle = "orange";
                previewTxt.style.background = "orange";
                previewTxt.style.color = "#fff";
                if(temp2.indexOf(currentWord) === -1){
                    wrong--;
                    temp2.push(currentWord);
                    bonusCoin += currentWord.length;
                    updateCoin(currentWord.length);
                    setTimeout(function(){
                        play("extraWord");
                    },100)
                }
                else {
                
                }
            }
            else {
                ctx.strokeStyle = "red";
                previewTxt.style.background = "red";
                previewTxt.style.color = "#fff";
                setTimeout(function(){
                    wrong++;
                    play("wrong");
                },100);
            }
            drawLine(points[linePoints[linePoints.length-1]][0],points[linePoints[linePoints.length-1]][1]);
            setTimeout(function(){
                ctx.clearRect(0,0,w,h);
                ctx.strokeStyle = "blue";
                previewTxt.textContent = "";
                previewTxt.style.background = "rgba(240,240,240,0.8)";
                previewTxt.style.color = "#666";
                previewTxt.style.display = "none";
            },500)
        }
    }
    
    c.addEventListener("touchstart",function(e){
        e.preventDefault();
        var touchObject, tx, ty;
        if(started){
            touchObject = e.changedTouches[0];
            tx = parseInt(touchObject.clientX);
            ty = parseInt(touchObject.clientY);
            for(var n = 0; n < 5; n++){
                if(Math.sqrt(Math.pow(points[n][0]-tx,2)+Math.pow(points[n][1]-ty,2)) < 30){
                    linePoints.push(n);
                //    play("select");
                    previewTxt.textContent += lt[n].textContent;
                    previewTxt.style.display = "inline-block";
                    started = false;
                    play("select");
                }
            }
            
        }
    })
    
    c.addEventListener("touchmove",function(e){
        e.preventDefault();
        var touchObject, tx, ty;
        if(!started){
            touchObject = e.changedTouches[0];
            tx = parseInt(touchObject.clientX);
            ty = parseInt(touchObject.clientY);
            for(var n = 0; n < 5; n++){
                if(Math.sqrt(Math.pow(points[n][0]-tx,2)+Math.pow(points[n][1]-ty,2)) < 30){
                    if(linePoints.indexOf(n) === -1){
                        linePoints.push(n);
                        //play("select");
                        previewTxt.textContent += lt[n].textContent;
                        play("select");
                    }
                }
            }
            drawLine(tx,ty);
        }
    })
    
    c.addEventListener("touchend",function(){
        currentWord = "";
        for(var n = 0; n < linePoints.length; n++){
            currentWord += lt[linePoints[n]].textContent;
        }
        
        clearLine();
        linePoints = [];
        started = true;
    })
    
    //Mouse events...
    var msdn = false;
    c.addEventListener("mousedown",function(e){
        e.preventDefault();
        msdn = true;
        var touchObject, tx, ty;
        if(started){
            touchObject = e//.changedTouches[0];
            tx = parseInt(touchObject.clientX);
            ty = parseInt(touchObject.clientY);
            for(var n = 0; n < 5; n++){
                if(Math.sqrt(Math.pow(points[n][0]-tx,2)+Math.pow(points[n][1]-ty,2)) < 30){
                    linePoints.push(n);
                    //play("select");
                    previewTxt.textContent += lt[n].textContent;
                    previewTxt.style.display = "inline-block";
                    started = false;
                    play("select");
                }
            }
            
        }
    })
    
    c.addEventListener("mousemove",function(e){
        e.preventDefault();
        var touchObject, tx, ty;
        if(!started){
            touchObject = e//.changedTouches[0];
            tx = parseInt(touchObject.clientX);
            ty = parseInt(touchObject.clientY);
            for(var n = 0; n < 5; n++){
                if(Math.sqrt(Math.pow(points[n][0]-tx,2)+Math.pow(points[n][1]-ty,2)) < 30){
                    if(linePoints.indexOf(n) === -1){
                        linePoints.push(n);
                        //play("select");
                        previewTxt.textContent += lt[n].textContent;
                        play("select");
                    }
                }
            }
            drawLine(tx,ty);
        }
    })
    
    c.addEventListener("mouseup",function(){
        currentWord = "";
        for(var n = 0; n < linePoints.length; n++){
            currentWord += lt[linePoints[n]].textContent;
        }
        
        clearLine();
        linePoints = [];
        started = true;
        msdn = false;
    })
    
    
    
    
    //transitions
    function trn1(x,t){
        x.style.transform = t;
    }
    
    function letterTrans(x){
        trn1(x,"scale(0.8)");
        setTimeout(function(){
            trn1(x,"scale(1)");
        },100)
    }
    
    //Level
    
    var currentLevel = 0;
    var currentWord = ""; //
    var wcnt = document.getElementsByClassName("word");
    
    function startLevel(ln){
        currentLevel = ln;
        ctx.fillRect(0,0,w,h);
        completeDiv.style.display = "none";
        levelDiv.style.transform = "translateY(0px)";
        shuffleBtn.style.transform = "translateX(0)";
        hintBtn.style.transform = "translateX(0)";
        _s("levelNum").textContent = ln+1;
        var levelContent = levels[ln][0];
        levelContent = levelContent[levelContent.length-1].split("");
        levelContent.sort(function(x,y){return Math.random() - 0.5});
        for(var n = 0; n < levelContent.length; n++){
            lt[n].textContent = levelContent[n];
            //lt[n].style.transform = "rotate("+Math.floor(Math.random()*40-20)+"deg)";
        }
        lContainer.style.transform = "scale(1) rotate(0deg)";
        for(var n = 0; n < levels[ln][0].length; n++){
            var txt = "";
            for(var x = 0; x < levels[ln][0][n].length; x++){
                txt += "<div class='wl'>.</div>";
            }
            wcnt[n].innerHTML = txt;
        }
        
        var curvePoints = [];
        for(var n = 0; n < 20; n++){
            if(n%2 === 0){
                curvePoints.push(Math.floor(w/2-Math.random()*w/10));
            }
            else {
                curvePoints.push(Math.floor(w/2+Math.random()*w/10));
            }
        }
        
        var dx = 0;
        var fy = h/19;
        function drawAnim(){
            ctx.clearRect(0,0,w,h);
            ctx.beginPath();
            ctx.moveTo(0,0);
            for(var n = 0; n < curvePoints.length; n++){
                ctx.lineTo(curvePoints[n]-dx,fy*n);
            }
            ctx.lineTo(0,h);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(w,0);
            for(var n = 0; n < curvePoints.length; n++){
                ctx.lineTo(curvePoints[n]+dx,fy*n);
            }
            ctx.lineTo(w,h);
            ctx.fill();
            ctx.closePath();
            dx+=10;
            if(dx > w/1.5){
                clearInterval(intv);
                dx = 0;
            }
        }
        
        var intv = setInterval(drawAnim,20);
        
    }
    
    //startLevel(0);
    
    //star...
    function star(x){
        var txt = "";
        for(var n = 0; n < 3; n++){
            txt += (n < x) ? "<span><i class='fa fa-star' style='color:yellow;'></i></span>" : "<span style='visibility:hidden'><i class='fa fa-star'></i></span>";
        }
        _s("star").innerHTML = txt;
    }
    
    //menu
    
    nextBtn.addEventListener("click",function(){
        if((currentLevel+1) < levels.length){
            startLevel(currentLevel+1);
            //sounds.levelStart.play().catch(function(err){alert(err)});
            play("levelStart");
        }
        else {
            startLevel(0);
            //currentLevel = 0;
        }
    })
    
    var wrong = 0;//ERRO
    var totalCoin = 0;
    var bonusCoin = 0;
    function levelComplete(x){
        completeDiv.style.display = "block";
        var starCount;
        if(wrong < 2){
            starCount = 3;
        }
        else if(wrong < 4){
            starCount = 2;
        }
        else{
            starCount = 1;
        }
        wrong = 0;
        star(starCount);
        updateLevelMenu(currentLevel+1,bonusCoin,starCount);
        bonusCoin = 0;
        play("levelComplete");
    }
    
    function shuffle(){
        var levelContent = levels[currentLevel][0];
        levelContent = levelContent[levelContent.length-1].split("").sort(function(x,y){return Math.random() - 0.5});
        for(var n = 0; n < levelContent.length; n++){
            lt[n].textContent = levelContent[n];
            //lt[n].style.transform = "rotate("+Math.floor(Math.random()*40-20)+"deg)";
        }
        lContainer.style.transform = "scale(0.1) rotate(720deg)";
        setTimeout(function(){
            lContainer.style.transform = "scale(1) rotate(0deg)";
        },500)
        play("shuffle");
    }
    
    shuffleBtn.addEventListener("click",shuffle);
    
    var levelBtn = _s("levelBtn");
    var levelCnt = _s("levelCnt");
    var levelBack = document.querySelector("#levelBack button");
    var lvb = _s("levelBack");
    lvb.style.left = "0px";
    lvb.style.bottom = (ltp+20)+'px';
    lvb.style.width = vw+"px";
    
    levelBtn.addEventListener("click",function(){
        levelCnt.style.display = "block";
        nextBtn.style.display = "inline-block";""
        levelCnt.style.display = "block";
        starCnt.style.display = "none";
        compl.style.display = "none";
        nextBtnCnt.style.display = "none";
    })
    
    levelBack.addEventListener("click",function(){
        levelCnt.style.display = "none";
        compl.style.display = "block";
        starCnt.style.display = "block";
        nextBtnCnt.style.display = "block";
    })
    
    function levelMenu(){
        var txt = "";
        for(var n = 0; n < levels.length; n++){
            txt += "<button class='level'>";
            txt += "<span class='lt'>Level "+(n+1)+"</span>";
            txt += "<span class='cn'><i class='fa fa-bitcoin'></i> 0</span>";
            txt += "<span class='st'></span></button>";
        }
        _s("levelList").innerHTML = txt;
    }
    
    levelMenu();
    
    for(var n = 0; n < levels.length; n++){
        document.querySelector(".level:nth-child("+(n+1)+")").addEventListener("click",function(){
            startLevel(parseInt(this.textContent.slice(6))-1);
            levelCnt.style.display = "none";
            levelBack.style.display = "inline-block";
            nextBtnCnt.style.display = "block";
            starCnt.style.display = "block";
            compl.innerHTML = "Nível completo";
            compl.style.display = "block";
            play("levelStart");
        })
    }
    
    function updateLevelMenu(ln,cn,st){
        var stars = "";
        for(var n = 0; n < st; n++){
            stars += "<i class='fa fa-star'></i>";
        }
        var txt = "";
        txt += "<span class='lt finish'>Level "+ln+"</span>";
        txt += "<span class='cn'><i class='fa fa-bitcoin'></i> "+cn+"</span>"
        txt += "<span class='st'>"+stars+"</span>"
        var elm = document.querySelector(".level:nth-child("+ln+")")
        elm.innerHTML = txt;
        //localStorage.setItem("Niveis", txt);//Salvando localStorage
    }
    
    //updateLevelMenu(2,65,3);
    
    var coinElm = _s("coin");
    function updateCoin(x){
        //local = localStorage.getItem("coin")
        totalCoin += x;
        
        coinElm.innerHTML = "<span>"+totalCoin+"</span>";
        //coinElm.innerHTML = "<span>"+local+"</span>";
        localStorage.setItem("coin", totalCoin)//Salvando localStorage

        console.log(totalCoin)
        console.log(localStorage.getItem("coin"))
        
    }
    
    function hint(){
    for(var n = 0; n < levels[currentLevel][0].length; n++){
        if(temp1.indexOf(levels[currentLevel][0][n]) === -1 && totalCoin >= 20){
            currentWord = levels[currentLevel][0][n];
            var wordPos = levels[currentLevel][0].indexOf(currentWord);
            var txt = "";
            var wordArr = currentWord.split("");
            
            for(var n = 0; n < currentWord.length; n++){
                txt += "<div class='wld'>"+wordArr[n]+"</div>";
            }
            wcnt[wordPos].innerHTML = txt;
            
            if(temp1.indexOf(currentWord) < 0){
                temp1.push(currentWord);
                updateCoin(-20);
                //play("right");
                if(temp1.length >= levels[currentLevel][0].length){
                    temp1 = [];
                    temp2 = [];
                    setTimeout(function(){
                        levelComplete();
                    //    startLevel(currentLevel+1);
                    },2000)
                    
                    setTimeout(function(){
                        var wls = document.getElementsByClassName("wld");
                        for(var n = 0; n < wls.length; n++){
                            wls[n].style.transform = "translateY("+Math.floor(100+Math.random()*200)+"px) rotate("+Math.floor(Math.random()*90-45)+"deg)";
                            wls[n].style.opacity = 0;
                            lContainer.style.transform = "scale(0) rotate(0)";
                            levelDiv.style.transform = "translateY(-100px)";
                            shuffleBtn.style.transform = "translateX(-100px)";
                            hintBtn.style.transform = "translateX(100px)";
                        }
                    },1000);
                }
                setTimeout(function(){
                     play("right");
                },100);
            }
            break;
        }
    }
    }
    
    hintBtn.addEventListener("click",hint)
    
    container.style.display = "block";
}