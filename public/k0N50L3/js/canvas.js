/**
 * Created by Usuário on 02/02/2015.
 */

/* keys */
keypress={any:false,enter:false,left:false,right:false,up:false,down:false};//press event
keypressed={any: false,enter:false,left:false,right:false,up:false,down:false};//pressed event
alarm=0;//alarm to show the text
alarmspeed=0.1;
fn=0;//function line
elem=document.getElementById('screen');//canvas
ctx=elem.getContext('2d');//context
controler={active:0};
rooms=[];
resources={
    images:[],
    sounds:[],
    fonts:[],
    loaded:0,
    ready:false
};
activeStart=0;

window.addEventListener('keydown',function(e){
    keypressed.any=true;keypress.any=true;
    if (e.keyCode==13){keypress.enter=true;keypressed.enter=true;}//enter
    if (e.keyCode==37){keypress.left=true;keypressed.left=true;}//esquerda
    if (e.keyCode==38){keypress.up=true;keypressed.up=true;}//cima
    if (e.keyCode==39){keypress.right=true;keypressed.right=true;}//direita
    if (e.keyCode==40){keypress.down=true;keypressed.down=true;}//baixo
},false);//keydown
window.addEventListener('keyup',function(e){
    keypressed.any=false;keypress.any=false;
    if (e.keyCode==13){keypress.enter=false;keypressed.enter=false;}//enter
    if (e.keyCode==37){keypress.left=false;keypressed.left=false;}//esquerda
    if (e.keyCode==38){keypress.up=false;keypressed.up=false;}//cima
    if (e.keyCode==39){keypress.right=false;keypressed.right=false;}//direita
    if (e.keyCode==40){keypress.down=false;keypressed.down=false;}//baixo
},false);//keyup
function resetKeys(){
    keypressed.any=false;//anykey
    keypressed.enter=false;//enter
    keypressed.left=false;//esquerda
    keypressed.up=false;//cima
    keypressed.right=false;//direita
    keypressed.down=false;//baixo
}//reset pressed event
function add_image(path){
    var img=new Image();
    img.src=path;
    resources.images.push(img);
    return img;
}
function add_sound(path,volume){
    var snd=new Audio();
    snd.src=path;
    snd.volume=volume;
    resources.sounds.push(snd);
    return snd;
}
function check(add){
    resources.loaded+=add;
    var total=0;
    var img=resources.images;
    var snd=resources.sounds;
    total+=(img.length);
    total+=(snd.length);
    if (resources.loaded>=total){resources.ready=true;console.log('##### RESOURCES LOADED ('+resources.loaded+'/'+total+') #####'); console.log(resources);}else{console.log(resources.loaded+'/'+total);}
}
function f(argument0){
    return (Math.sin(argument0/5)*2 + Math.sin(argument0*Math.PI) + Math.sin(argument0*5-2) + Math.sin(argument0/2) + (argument0 % Math.PI) - (argument0 % 4))/5;
}//function for rgb shift
function clear(){
    elem.width=Math.max(800,window.innerWidth);
    elem.height=Math.max(600,window.innerHeight);
    /* draw back*/
    ctx.fillStyle='#000000';
    ctx.fillRect(0,0,elem.width, elem.height);
}//function to clear canvasS
function run(){
    start();
    step();
    end();
    //requestAnimationFrame(run);
    setTimeout(run,1000/30)

}//function order events
function draw_hud(){
    /* draw points*/

    ctx.font="30px edit_undo_brkregular";
    ctx.fillStyle='#FFFFFF';
    ctx.textAlign='left';
    ctx.fillText('1 credit', 10, 35);
    ctx.textAlign='right';
    ctx.fillText('hi score: 24, 051, 994', elem.width-10, 35);
    ctx.fillText('CONTROLS: ARROWS, ENTER', elem.width-10, elem.height-20);
    /* draw footer */
    ctx.textAlign='left';
    ctx.fillText('© 2015 KONSOLE STUDIO', 10, elem.height-20);
}
function room_goto(room){
    controler.active=room;
    create_screen(controler.active);
}
function draw_screen(screen){
    var room=rooms[screen];
    room.draw();
    draw_hud();
}
function step_screen(screen){
    var room=rooms[screen];
    room.stepEvent();
}
function create_screen(screen){
    var room=rooms[screen];
    room.create();
}
function draw_effect(){
    ctx.globalAlpha =0.4;

    ctx.fillStyle='#000000';
    var i;
    for(i=0;i<elem.height;i+=4){
        ctx.fillRect(0,i,elem.width,2);
    }
    ctx.globalAlpha =1;
}
function room_add(nm, create, step, draw){
    var stg={
        name:nm,
        draw: draw,
        stepEvent:step,
        create: create,
        active:0,
        x:0,
        y:0
    };
    return rooms.push(stg)-1;
}//insert room
function start(){
    clear();
    alarm+=alarmspeed;
    fn+=0.3;
    room={
        width:elem.width,
        height: elem.height
    };

}
function step(){
    step_screen(controler.active);//step once
    var room=controler.active;
    var sett=rooms[room];


    ctx.save();
    ctx.globalAlpha =0.5;
    ctx.translate(sett.x,sett.y+(f(fn/1.4+3)*3));
    draw_screen(room);
    ctx.globalAlpha =0.1;
    ctx.restore();

    ctx.save();
    ctx.globalAlpha =0.5;
    ctx.translate(sett.x,sett.y+(f(fn/1.7+9)*9));
    draw_screen(room);
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle='#00EE00';
    ctx.fillRect(0,0,elem.width,elem.height);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha =0.5;
    ctx.translate(sett.x,sett.y+(f(fn/1.5+2)*3));
    draw_screen(room);
    ctx.globalCompositeOperation = "ligter";
    ctx.fillStyle='#0000EE';
    ctx.fillRect(0,0,elem.width,elem.height);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha =0.5;
    ctx.translate(sett.x,sett.y+(f(fn/1.2+3)*3));
    draw_screen(room);
    ctx.globalCompositeOperation = "darken";
    ctx.fillStyle='#EE0000';
    ctx.fillRect(0,0,elem.width,elem.height);
    ctx.restore();

    draw_screen(room);

    draw_effect();

}
function end(){
    if (alarm>=2){alarm=0;}
    resetKeys();
}

/* draw functions */
function draw_image(image,x,y){
    ctx.drawImage(image,x,y);
}
function draw_image_border_centered(image,x,y){
    ctx.drawImage(image,x-image.width/2,y-image.height/2);
    draw_rectangle(x-image.width/2,y-image.height/2,x+image.width/2,y+image.height/2,1);
}

function sound_play(sound){
    sound.play();
}
function draw_text(text,x,y){
    ctx.fillText(text, x, y);
}
function draw_set_alpha(alpha){
    ctx.globalAlpha =alpha;
}
function draw_set_align(align){
    ctx.textAlign=align;
}
function draw_set_valign(align){
    ctx.textBaseline=align;
}
function draw_set_color(c_color){
    ctx.fillStyle=c_color;
    ctx.strokeStyle=c_color;
}
function draw_set_font(font){
    ctx.font=font;
}
function draw_rectangle(x1,y1,x2,y2,outline){
    if (!outline)
    {
        ctx.fillRect(x1,y1,x2-x1,y2-y1)
    }else{
        ctx.strokeRect(x1,y1,x2-x1,y2-y1)
    }
}
function draw_set_line_width(width){
    ctx.lineWidth=width;
}


/*run game*/
window.addEventListener('load',run, false);//run when window loads
//sound1=add_sound('sounds/nintendo_02.wav',0.1);
sound2=add_sound('sounds/Asteroids_Tone02.wav',0.1);
sound1=add_sound('sounds/Frogger_Hop.wav',0.4);
image=add_image('img/konsole_logo.png');
avatar1=add_image('img/AVATAR_1.png');
avatar2=add_image('img/AVATAR_2.png');

var room_start=room_add('START',
    function(){
        activeStart=0;
        alarmspeed=0.1;
    },
    function(){/*step*/},
    function(){
    /*draw center*/
    draw_set_color('#00FF99');
    draw_set_line_width(10);
    var W=500;
    var H=100;
    var OFF=40;
    var xx=elem.width/2-W/2;
    var yy=elem.height/2-H/2-15-OFF;
    draw_rectangle(xx, yy, xx+W, yy+H,1);
    draw_set_color('#00FF99');
    draw_set_font("60px edit_undo_brkregular");
    draw_set_align('center');
    draw_text("KONSOLE STUDIO",elem.width/2,elem.height/2-OFF);
    draw_set_font("40px edit_undo_brkregular");
    draw_set_color('#FFFF66');
    draw_set_align('center');
    if (alarm>1){
        draw_text("PRESS ANY KEY",elem.width/2,elem.height/2+60);
    }
    if (keypressed.any && activeStart==0){
        activeStart=1;
        sound_play(sound1);
        alarmspeed=1;
        setTimeout(function(){
            room_goto(room_menu);
        },1000);
    }
});

var room_menu=room_add('MENU',
    function(){
        menuativo=0;
        animationX=0;
        gotoRoom=undefined;
        menu=[];
        menu.push({
            optionName:'PROJECTS',
            optionCallback:function(){animationX=-room.width; this.active=1;},
            optionComplete:function(){room_goto(room_projects)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0

        });
        menu.push({
            optionName:'THE KONSOLE',
            optionCallback:function(){animationX=-room.width;this.active=1;},
            optionComplete:function(){room_goto(room_about)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0

        });
        menu.push({
            optionName:'MINIGAME',
            optionCallback:function(){animationX=-room.width;this.active=1;},
            optionComplete:function(){room_goto(room_start)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0

        });
        menu.push({
            optionName:'CONTACT',
            optionCallback:function(){animationX=-room.width;this.active=1;},
            optionComplete:function(){room_goto(room_start)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0
        });
        menu.push({
            optionName:'BACK',
            optionCallback:function(){animationX=-room.width;this.active=1;},
            optionComplete:function(){room_goto(room_start)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0
        });


    },
    function(){
        var Execute=1;
        for(s=0;s<menu.length;s++) {
            var menuCheck=menu[s];
            if (menuCheck.active==1){Execute=0;}
        }
        if (Execute==1){
            if (keypressed.up==true){sound_play(sound2);menuativo-=1;}
            if (keypressed.down==true){sound_play(sound2);menuativo+=1;}
            if (menuativo<0){menuativo=0;}
            if (menuativo>menu.length-1){menuativo=menu.length-1}
            if (keypressed.enter==true){sound_play(sound1);menu[menuativo].optionCallback();}
        }
    },
    function(){
        draw_set_align('center');
        draw_set_font('40px edit_undo_brkregular');
        draw_set_line_width(6);
        var itemH=64;
        var menuWidth=500;
        var margin=20;
        var menuHeight=(menu.length*itemH)+(margin*menu.length);
        for(i=0;i<menu.length;i++){
            var main=menu[i];
            main.optionX+=(animationX-main.optionX)/(10)*2;
            if (main.active==1 && (Math.abs(animationX-main.optionX)<3)){
                main.optionComplete();
            }
            main.optionX=Math.round(main.optionX);
            if (i==menuativo){
                draw_set_color(main.optionColor);
            }else{
                draw_set_color('#FFFFFF');
            }
            draw_rectangle((room.width/2)-(menuWidth/2)+main.optionX,(room.height/2)-(menuHeight/2)+(i*(itemH+margin)),(room.width/2)-(menuWidth/2)+menuWidth+main.optionX,(room.height/2)-(menuHeight/2)+(i*(itemH+margin))+itemH,1)
            draw_set_align('center');
            draw_set_valign('middle');
            draw_text(main.optionName,room.width/2+main.optionX,(room.height/2)+(itemH/2)+((itemH+margin)*i)-(menuHeight/2));
        }

    });

var room_projects=room_add('PROJECTS',
    function(){
        menuativo=0;
        animationX=0;
        gotoRoom=undefined;
        menu=[];
        menu.push({
            optionName:'ALIVE',
            optionCallback:function(){animationX=-room.width; this.active=1;},
            optionComplete:function(){room_goto(room_menu)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0
        });
        menu.push({
            optionName:'BACK',
            optionCallback:function(){animationX=-room.width; this.active=1;},
            optionComplete:function(){room_goto(room_menu)},
            optionColor:'#00FF99',
            optionX:+room.width,
            active:0
        });
    },
    function(){
        var Execute=1;
        for(s=0;s<menu.length;s++) {
            var menuCheck=menu[s];
            if (menuCheck.active==1){Execute=0;}
        }
        if (Execute==1){
            if (keypressed.up==true){sound_play(sound2);menuativo-=1;}
            if (keypressed.down==true){sound_play(sound2);menuativo+=1;}
            if (menuativo<0){menuativo=0;}
            if (menuativo>menu.length-1){menuativo=menu.length-1}
            if (keypressed.enter==true){sound_play(sound1);menu[menuativo].optionCallback();}
        }
    },
    function(){
        draw_set_align('center');
        draw_set_font('40px edit_undo_brkregular');
        draw_set_line_width(6);
        var itemH=64;
        var menuWidth=500;
        var margin=20;
        var menuHeight=(menu.length*itemH)+(margin*menu.length);
        for(i=0;i<menu.length;i++){
            var main=menu[i];
            main.optionX+=(animationX-main.optionX)/(10)*2;
            if (main.active==1 && (Math.abs(animationX-main.optionX)<3)){
                main.optionComplete();
            }
            main.optionX=Math.round(main.optionX);
            if (i==menuativo){
                draw_set_color(main.optionColor);
            }else{
                draw_set_color('#FFFFFF');
            }
            draw_rectangle((room.width/2)-(menuWidth/2)+main.optionX,(room.height/2)-(menuHeight/2)+(i*(itemH+margin)),(room.width/2)-(menuWidth/2)+menuWidth+main.optionX,(room.height/2)-(menuHeight/2)+(i*(itemH+margin))+itemH,1)
            draw_set_align('center');
            draw_set_valign('middle');
            draw_text(main.optionName,room.width/2+main.optionX,(room.height/2)+(itemH/2)+((itemH+margin)*i)-(menuHeight/2));
        }

    });
var room_about=room_add('THE KONSOLE',
    function(){
        this.next=0;
        this.yy=-room.height;
        this.marginTop=250;
        this.margin=20;
        this.carousel=[];
        this.carousel.push({
            name:'William Lima',
            image: avatar1,
            depth:0,
            dir:0
        });
        this.carousel.push({
            name:'Bruno Vieira',
            image: avatar2,
            depth:0,
            dir:0
        });
        this.carousel.push({
            name:'William Lima',
            image: avatar1,
            depth:0,
            dir:0
        });
        this.carousel.push({
            name:'Bruno Vieira',
            image: avatar2,
            depth:0,
            dir:0
        });

        this.rotation=0;
        this.selected=0;
        this.selectedReal=0;
        this.distance=(room.width/4);
    },
    function(){
        if (keypressed.left){this.selected-=1;this.selectedReal-=1;}
        if (keypressed.right){this.selected+=1;this.selectedReal+=1}
        if (this.selectedReal>this.carousel.length-1){this.selectedReal=0;}
        if (this.selectedReal<0){this.selectedReal=this.carousel.length-1;}

        this.piece=360/(this.carousel.length);
        this.actualpiece=this.selected*this.piece;
        this.rotation+=((270-(this.actualpiece))-(this.rotation))/3;
        this.yy+=(this.next-this.yy)/5;
    },
    function(){
        draw_set_color('#00FF99');
        draw_set_line_width(10);
        draw_set_valign('middle');
        draw_set_align('center');
        draw_set_font('30px edit_undo_brkregular');
        draw_rectangle(room.width/2-this.margin-avatar1.width,25+40+this.yy,room.width/2+this.margin+avatar2.width,25+120+this.yy,1);
        draw_text('THE KONSOLE',room.width/2,25+80+this.yy);
        draw_set_color('#FFFFFF');
        draw_text('SELECT YOUR PLAYER',room.width/2,room.height-this.yy-this.marginTop/3);
        draw_text(this.carousel[this.selectedReal].name,room.width/2,room.height-this.yy-this.marginTop/3+40);
        var item;
        var reorder=new Array();
        for(i=0;i<this.carousel.length;i+=1) {
            item=this.carousel[i];
            item.dir=((i*this.piece)+this.rotation)*Math.PI/180;
            item.x=(Math.cos(item.dir)*this.distance);
            item.y=-(Math.sin(item.dir)*this.distance/10);
            item.depth=Math.round((this.distance*2)-((this.distance)-(item.y*2)));

            if (this.selectedReal==i){item.ativo=1}else{item.ativo=0;}
            while(reorder[item.depth]!=undefined){
                item.depth+=1;
            }
            reorder[item.depth]=item;
        }
        ctx.save();
        ctx.translate(room.width/2,room.height/2);
        reorder.forEach(function(item2){
            if (item2.ativo==1){draw_set_color('#00FF99');}else{draw_set_color('#FFFFFF');}
            draw_image_border_centered(item2.image,item2.x,item2.y);
        });
        ctx.translate(0,0);
        ctx.restore();

    });