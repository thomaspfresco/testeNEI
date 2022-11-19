var instant; //instante atual
var interval = 3000; //intervalo de troca de cor (3 segundos)
var intAux; //ajuste do intervalo de troca de cor
var time; //contador de tempo
var margin; //margens
var strokeRatio; //grossura das linhas
var opa = 0; //opacidade global
var increment = 3; //incremento da opacidade
var textSize; //tamanho font
let r1, r2; //indices das matrizes de cor

//matrizes de cor
var bgColors = [[0, 100, 72], [123, 100, 134], [209, 92, 41], [174, 197, 223], [201, 214, 94], [76, 108, 175], [213, 220, 213]];
var textColors = [[198, 187, 214], [175, 186, 64], [213, 220, 213], [209, 92, 41], [115, 77, 78], [218, 172, 203], [6, 101, 74]];


function windowResized() {
    resizeCanvas(windowWidth * 2, windowWidth * 2);
  }

function setup() {
    createCanvas(windowWidth * 2, windowWidth * 2);
    font = loadFont('fonts/Satoshi-Bold.otf');
    textFont(font);

    strokeRatio = displayHeight * displayWidth / 275000;
    
    if (displayHeight<displayWidth) textSize(displayHeight * displayWidth / 50000);
    else textSize(displayHeight * displayWidth / 10000);

    time = interval;
    intAux = interval;

    r1 = 0;
    r2 = 1;
}

function draw() {
    margin = windowHeight / 20;

    noStroke();

    instant = millis();

    if (r1 != r2) {

        //bg atual
        fill(bgColors[r1][0], bgColors[r1][1], bgColors[r1][2], opa);
        rect(0, 0, windowWidth, windowHeight);
        //bg para mudar
        fill(bgColors[r2][0], bgColors[r2][1], bgColors[r2][2], 255 - opa);
        rect(0, 0, windowWidth, windowHeight);

        //linha atual
        fill(textColors[r1][0], textColors[r1][1], textColors[r1][2], opa);
        drawLines();

        //linha para mudar
        fill(textColors[r2][0], textColors[r2][1], textColors[r2][2], 255-opa);
        drawLines();

        noStroke();

        //texto
        textAlign(LEFT, TOP);
        fill(textColors[r1][0], textColors[r1][1], textColors[r1][2], opa);
        text('NÚCLEO\nESTUDANTES\nINFORMÁTICA', margin + strokeRatio + margin / 3, windowHeight - margin - strokeRatio -textSize()*3.5 - margin / 3);

        fill(textColors[r2][0], textColors[r2][1], textColors[r2][2], 255 - opa);
        text('NÚCLEO\nESTUDANTES\nINFORMÁTICA', margin + strokeRatio + margin / 3, windowHeight - margin - strokeRatio -textSize()*3.5 - margin / 3);

        textAlign(RIGHT, TOP);
        fill(textColors[r1][0], textColors[r1][1], textColors[r1][2], opa);
        text('WEBSITE EM\nDESENVOLVIMENTO', windowWidth - margin - strokeRatio - margin / 3, margin + margin / 3);

        fill(textColors[r2][0], textColors[r2][1], textColors[r2][2], 255 - opa);
        text('WEBSITE EM\nDESENVOLVIMENTO', windowWidth - margin - strokeRatio - margin / 3, margin + margin / 3);

        /*
                textAlign(LEFT, TOP);
        fill(textColors[r1][0], textColors[r1][1], textColors[r1][2], opa);
        text('NÚCLEO\nESTUDANTES\nINFORMÁTICA', margin + strokeRatio + margin / 2, windowHeight - margin - strokeRatio - windowHeight * 5.6 / margin);

        fill(textColors[r2][0], textColors[r2][1], textColors[r2][2], 255 - opa);
        text('NÚCLEO\nESTUDANTES\nINFORMÁTICA', margin + strokeRatio + margin / 2, windowHeight - margin - strokeRatio - windowHeight * 5.6 / margin);

        textAlign(RIGHT, TOP);
        fill(textColors[r1][0], textColors[r1][1], textColors[r1][2], opa);
        text('WEBSITE EM\nDESENVOLVIMENTO', windowWidth - margin - strokeRatio - margin / 2, margin + margin / 2);

        fill(textColors[r2][0], textColors[r2][1], textColors[r2][2], 255 - opa);
        text('WEBSITE EM\nDESENVOLVIMENTO', windowWidth - margin - strokeRatio - margin / 2, margin + margin / 2);
        */
    }

    if (opa < 255) opa = opa + increment;

    if (instant - time >= 0) {
        intAux=interval;
        changeColor();
        opa = 0;
    }
}

function mousePressed() {
    intAux=interval/30;
    changeColor();
    opa=255;
}

function drawLines() {
    //topo e baixo
    rect(margin, margin, windowWidth - margin * 2, strokeRatio);
    rect(margin, windowHeight - margin, windowWidth - margin * 2, strokeRatio);
    //esquerda
    rect(margin, margin + strokeRatio - 0.5, strokeRatio, margin * 1.5);
    rect(margin, windowHeight - margin + 0.5, strokeRatio, -margin * 11);
    //direita
    rect(windowWidth - margin - strokeRatio, margin + strokeRatio - 0.5, strokeRatio, margin * 11);
    rect(windowWidth - margin - strokeRatio, windowHeight - margin + 0.5, strokeRatio, -margin * 3);
}

function changeColor() {
    time = instant + intAux;
    r2 = r1;
    while(r1==r2) r1 = int(random(7));
}

function textHeight(text, maxWidth) {
    var words = text.split(' ');
    var line = '';
    var h = this._textLeading;

    for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + ' ';
        var testWidth = drawingContext.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            line = words[i] + ' ';
            h += this._textLeading;
        } else {
            line = testLine;
        }
    }

    return h;
}
