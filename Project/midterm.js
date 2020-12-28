var canvas, gl, leftNumber = 6, rightNumber = 3, bufferNum1, bufferNum2, bufferNum3, bufferNum4, num1Vertices,
    num2Vertices, num3Vertices, num4Vertices, num1VerticesTemp, num2VerticesTemp, num3VerticesTemp, num4VerticesTemp,
    secim = 0, vPosition, transformationMatrix, transformationMatrixLoc, color, colors = vec4(1.0, 0.0, 0.0, 1.0),
    colorLoc, matpFLeft, matNegpFLeft, matpFRight, matNegpFRight, matX, matMRight = vec4(), matMLeft = vec4(), matY;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    //  Load shaders and initialize attribute buffers
    //var program = WebGLUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    color = vec4(1.0, 0.0, 1.0, 1.0);
    colorLoc = gl.getUniformLocation( program,"color");
    gl.uniform4fv( colorLoc, color);



    // Array of vertices

    //Left number's vertices as vertical order
    num1Vertices = [
        vec2(-0.7, 0.5), vec2(-0.5, 0.5), vec2(-0.3, 0.5), vec2(-0.1, 0.5),
        vec2(-0.7, 0.3), vec2(-0.5, 0.3), vec2(-0.3, 0.3), vec2(-0.1, 0.3),
        vec2(-0.7, 0.1), vec2(-0.5, 0.1), vec2(-0.3, 0.1), vec2(-0.1, 0.1),
        vec2(-0.7, -0.1), vec2(-0.5, -0.1), vec2(-0.3, -0.1), vec2(-0.1, -0.1),
        vec2(-0.7, -0.3), vec2(-0.5, -0.3), vec2(-0.3, -0.3), vec2(-0.1, -0.3),
        vec2(-0.7, -0.5), vec2(-0.5, -0.5), vec2(-0.3, -0.5), vec2(-0.1, -0.5)

    ];
    //Left number's vertices as horizontal order
    num2Vertices = [
        vec2(-0.7, 0.5), vec2(-0.7, 0.3), vec2(-0.7, 0.1), vec2(-0.7, -0.1), vec2(-0.7, -0.3), vec2(-0.7, -0.5),
        vec2(-0.5, 0.5), vec2(-0.5, 0.3), vec2(-0.5, 0.1), vec2(-0.5, -0.1), vec2(-0.5, -0.3), vec2(-0.5, -0.5),
        vec2(-0.3, 0.5), vec2(-0.3, 0.3), vec2(-0.3, 0.1), vec2(-0.3, -0.1), vec2(-0.3, -0.3), vec2(-0.3, -0.5),
        vec2(-0.1, 0.5), vec2(-0.1, 0.3), vec2(-0.1, 0.1), vec2(-0.1, -0.1), vec2(-0.1, -0.3), vec2(-0.1, -0.5)

    ];
    //Right number's vertices as vertical order
    num3Vertices = [
        vec2(0.1, 0.5), vec2(0.3, 0.5), vec2(0.5, 0.5), vec2(0.7, 0.5),
        vec2(0.1, 0.3), vec2(0.3, 0.3), vec2(0.5, 0.3), vec2(0.7, 0.3),
        vec2(0.1, 0.1), vec2(0.3, 0.1), vec2(0.5, 0.1), vec2(0.7, 0.1),
        vec2(0.1, -0.1), vec2(0.3, -0.1), vec2(0.5, -0.1), vec2(0.7, -0.1),
        vec2(0.1, -0.3), vec2(0.3, -0.3), vec2(0.5, -0.3), vec2(0.7, -0.3),
        vec2(0.1, -0.5), vec2(0.3, -0.5), vec2(0.5, -0.5), vec2(0.7, -0.5)

    ];
    //Right number's vertices as horizontal order
    num4Vertices = [
        vec2(0.1, 0.5), vec2(0.1, 0.3), vec2(0.1, 0.1), vec2(0.1, -0.1), vec2(0.1, -0.3), vec2(0.1, -0.5),
        vec2(0.3, 0.5), vec2(0.3, 0.3), vec2(0.3, 0.1), vec2(0.3, -0.1), vec2(0.3, -0.3), vec2(0.3, -0.5),
        vec2(0.5, 0.5), vec2(0.5, 0.3), vec2(0.5, 0.1), vec2(0.5, -0.1), vec2(0.5, -0.3), vec2(0.5, -0.5),
        vec2(0.7, 0.5), vec2(0.7, 0.3), vec2(0.7, 0.1), vec2(0.7, -0.1), vec2(0.7, -0.3), vec2(0.7, -0.5)

    ];


    /*Back up of starting vertices points, we are holding them because of calculation of position change and
    scaling are should not be cumulatively change. */

    num1VerticesTemp = [
        vec2(-0.7, 0.5), vec2(-0.5, 0.5), vec2(-0.3, 0.5), vec2(-0.1, 0.5),
        vec2(-0.7, 0.3), vec2(-0.5, 0.3), vec2(-0.3, 0.3), vec2(-0.1, 0.3),
        vec2(-0.7, 0.1), vec2(-0.5, 0.1), vec2(-0.3, 0.1), vec2(-0.1, 0.1),
        vec2(-0.7, -0.1), vec2(-0.5, -0.1), vec2(-0.3, -0.1), vec2(-0.1, -0.1),
        vec2(-0.7, -0.3), vec2(-0.5, -0.3), vec2(-0.3, -0.3), vec2(-0.1, -0.3),
        vec2(-0.7, -0.5), vec2(-0.5, -0.5), vec2(-0.3, -0.5), vec2(-0.1, -0.5)

    ];
    num2VerticesTemp = [
        vec2(-0.7, 0.5), vec2(-0.7, 0.3), vec2(-0.7, 0.1), vec2(-0.7, -0.1), vec2(-0.7, -0.3), vec2(-0.7, -0.5),
        vec2(-0.5, 0.5), vec2(-0.5, 0.3), vec2(-0.5, 0.1), vec2(-0.5, -0.1), vec2(-0.5, -0.3), vec2(-0.5, -0.5),
        vec2(-0.3, 0.5), vec2(-0.3, 0.3), vec2(-0.3, 0.1), vec2(-0.3, -0.1), vec2(-0.3, -0.3), vec2(-0.3, -0.5),
        vec2(-0.1, 0.5), vec2(-0.1, 0.3), vec2(-0.1, 0.1), vec2(-0.1, -0.1), vec2(-0.1, -0.3), vec2(-0.1, -0.5)

    ];
    num3VerticesTemp = [
        vec2(0.1, 0.5), vec2(0.3, 0.5), vec2(0.5, 0.5), vec2(0.7, 0.5),
        vec2(0.1, 0.3), vec2(0.3, 0.3), vec2(0.5, 0.3), vec2(0.7, 0.3),
        vec2(0.1, 0.1), vec2(0.3, 0.1), vec2(0.5, 0.1), vec2(0.7, 0.1),
        vec2(0.1, -0.1), vec2(0.3, -0.1), vec2(0.5, -0.1), vec2(0.7, -0.1),
        vec2(0.1, -0.3), vec2(0.3, -0.3), vec2(0.5, -0.3), vec2(0.7, -0.3),
        vec2(0.1, -0.5), vec2(0.3, -0.5), vec2(0.5, -0.5), vec2(0.7, -0.5)

    ];
    num4VerticesTemp = [
        vec2(0.1, 0.5), vec2(0.1, 0.3), vec2(0.1, 0.1), vec2(0.1, -0.1), vec2(0.1, -0.3), vec2(0.1, -0.5),
        vec2(0.3, 0.5), vec2(0.3, 0.3), vec2(0.3, 0.1), vec2(0.3, -0.1), vec2(0.3, -0.3), vec2(0.3, -0.5),
        vec2(0.5, 0.5), vec2(0.5, 0.3), vec2(0.5, 0.1), vec2(0.5, -0.1), vec2(0.5, -0.3), vec2(0.5, -0.5),
        vec2(0.7, 0.5), vec2(0.7, 0.3), vec2(0.7, 0.1), vec2(0.7, -0.1), vec2(0.7, -0.3), vec2(0.7, -0.5)

    ];



    // Load the data into the GPU
    //Made it as a function so when position or scaling methods change vertices, buffer the new nodes into GPU
    function bufferCreate() {
        bufferNum1 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(num1Vertices), gl.STATIC_DRAW);

        bufferNum2 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(num2Vertices), gl.STATIC_DRAW);

        bufferNum3 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(num3Vertices), gl.STATIC_DRAW);

        bufferNum4 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(num4Vertices), gl.STATIC_DRAW);
    }
    bufferCreate();



    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    transformationMatrixLoc = gl.getUniformLocation(program, "transformationMatrix");

    //drawing the number
    document.getElementById("inp_number").oninput = function (event) {
        secim = document.getElementById("inp_number").value;
        //splitting number into 2 separate digits if it is 2-digit number
        //drawing making on render method
        var sSecim = secim.toString().split('');
        if (sSecim.length == 2) {
            leftNumber = sSecim[0];
            rightNumber = sSecim[1];
        }
        if (sSecim.length == 1) {
            leftNumber = 0;
            rightNumber = sSecim[0];
        }

    };

    document.getElementById("inp_objX").oninput = function (event) {
        var inputX = document.getElementById("inp_objX").value;
        //As we need float instead of string we parse it float
        var float = parseFloat(inputX);


        for(i=0; i< num1Vertices.length; i ++ ){
            //calculate new point
            var tempDeger1 = num1VerticesTemp[i][0]+float;
            //Y-axis remain same, X-axis given calculated point
            num1Vertices[i] = vec2(tempDeger1,num1Vertices[i][1] );

        }
        for(i=0; i< num2Vertices.length; i ++ ){
            //calculate new point
            var tempDeger2 = num2VerticesTemp[i][0]+float;
            //Y-axis remain same, X-axis given calculated point
            num2Vertices[i] = vec2(tempDeger2,num2Vertices[i][1] );

        }

        for(i=0; i< num3Vertices.length; i ++ ){
            //calculate new point
            var tempDeger3 = num3VerticesTemp[i][0]+float;
            //Y-axis remain same, X-axis given calculated point
            num3Vertices[i] = vec2(tempDeger3,num3Vertices[i][1] );

        }
        for(i=0; i< num4Vertices.length; i ++ ){
            //calculate new point
            var tempDeger4 = num4VerticesTemp[i][0]+float;
            //Y-axis remain same, X-axis given calculated point
            num4Vertices[i] = vec2(tempDeger4,num4Vertices[i][1] );


        }
    //to send new points to draw to GPU buffer
    bufferCreate();
    };
    document.getElementById("inp_objY").oninput = function (event) {
        var inputY = document.getElementById("inp_objY").value;
        //As we need float instead of string we parse it float
        var float = parseFloat(inputY);

        for(i=0; i< num1Vertices.length; i ++ ){
            //calculate new point
            var tempDeger1Y = num1VerticesTemp[i][1]+float;
            //X-axis remain same, Y-axis given calculated point
            num1Vertices[i] = vec2(num1Vertices[i][0],tempDeger1Y );

        }
        for(i=0; i< num2Vertices.length; i ++ ){
            //calculate new point
            var tempDeger2Y = num2VerticesTemp[i][1]+float;
            //X-axis remain same, Y-axis given calculated point
            num2Vertices[i] = vec2(num2Vertices[i][0],tempDeger2Y );

        }

        for(i=0; i< num3Vertices.length; i ++ ){
            //calculate new point
            var tempDeger3Y = num3VerticesTemp[i][1]+float;
            //X-axis remain same, Y-axis given calculated point
            num3Vertices[i] = vec2(num3Vertices[i][0],tempDeger3Y );

        }
        for(i=0; i< num4Vertices.length; i ++ ){
            //calculate new point
            var tempDeger4Y = num4VerticesTemp[i][1]+float;
            //X-axis remain same, Y-axis given calculated point
            num4Vertices[i] = vec2(num4Vertices[i][0],tempDeger4Y );


        }
        //to send new points to draw to GPU buffer
        bufferCreate();
    };
    document.getElementById("inp_obj_scaleX").oninput = function (event) {
        var scaleX = document.getElementById("inp_obj_scaleX").value;
        var float = parseFloat(scaleX);
        //For calculate M matrix

        matNegpFLeft =mat4(  1.0,  0.0 , 0.0, 4.0,
                             0.0,  1.0 , 0.0, 0.0,
                             0.0,  0.0 , 1.0, 0.0,
                             0.0,  0.0 , 0.0, 1.0);
        matpFLeft    =mat4(  1.0,  0.0 , 0.0,-4.0,
                             0.0,  1.0 , 0.0, 0.0,
                             0.0,  0.0 , 1.0, 0.0,
                             0.0,  0.0 , 0.0, 1.0);

        matX         =mat4(  float,  0.0 , 0.0, 0.0,
                             0.0,  1.0 , 0.0, 0.0,
                             0.0,  0.0 , 1.0, 0.0,
                             0.0,  0.0 , 0.0, 1.0);


        // m = T(pF)*S(xRate,yRate)*T(-pF)
        matMLeft = mat4(matNegpFLeft*matX*matpFLeft);



        for(i=0; i< num1Vertices.length; i ++ ){
            var tempScale1X = num1VerticesTemp[i][0]*float;

            num1Vertices[i] = vec2(tempScale1X,num1Vertices[i][1] );


        }
        for(i=0; i< num2Vertices.length; i ++ ){
            var tempScale2X = num2VerticesTemp[i][0]*float;

            num2Vertices[i] = vec2(tempScale2X,num2Vertices[i][1] );


        }
        for(i=0; i< num3Vertices.length; i ++ ){
            var tempScale3X = num3VerticesTemp[i][0]*float;

            num3Vertices[i] = vec2(tempScale3X,num3Vertices[i][1] );


        }
        for(i=0; i< num4Vertices.length; i ++ ){
            var tempScale4X = num4VerticesTemp[i][0]*float;
            console.log(tempScale4X);

            num4Vertices[i] = vec2(tempScale4X,num4Vertices[i][1] );


        }


        /*       for(i=0; i< num1Vertices.length; i ++ ){

                   var tempScale1X = num1VerticesTemp[i]*matMLeft;
                   var newX1 = tempScale1X[0];


                   num1Vertices[i] = vec2(newX1,num1Vertices[i][1] );


               }
               for(i=0; i< num2Vertices.length; i ++ ){

                   var tempScale2X = num2VerticesTemp[i]*matMLeft;
                   var newX2 = tempScale2X[0];

                   num2Vertices[i] = vec2(newX2,num2Vertices[i][1] );


               }

               for(i=0; i< num3Vertices.length; i ++ ){

                   var tempScale3X = num3VerticesTemp[i]*matMLeft;
                   var newX3 = tempScale3X[0];

                   num3Vertices[i] = vec2(newX3,num2Vertices[i][1] );


               }
               for(i=0; i< num4Vertices.length; i ++ ){

                   var tempScale4X = num4VerticesTemp[i]*matMLeft;
                   var newX4 = tempScale4X[0];

                   num4Vertices[i] = vec2(newX4,num2Vertices[i][1] );


               }*/












        bufferCreate();
    };
    document.getElementById("inp_obj_scaleY").oninput = function (event) {
        var scaleY = document.getElementById("inp_obj_scaleY").value;
        var float = parseFloat(scaleY);
        //For calculate M matrix
        matNegpFRight =mat4(   1.0,  0.0 , 0.0, 4.0,
                               0.0,  1.0 , 0.0, 0.0,
                               0.0,  0.0 , 1.0, 0.0,
                               0.0,  0.0 , 0.0, 1.0);
        matpFRight    =mat4(   1.0,  0.0 , 0.0,-4.0,
                               0.0,  1.0 , 0.0, 0.0,
                               0.0,  0.0 , 1.0, 0.0,
                               0.0,  0.0 , 0.0, 1.0);

        matY         =mat4(   float,  0.0 , 0.0, 0.0,
                               0.0,  1.0 , 0.0, 0.0,
                               0.0,  0.0 , 1.0, 0.0,
                               0.0,  0.0 , 0.0, 1.0);


        // m = T(pF)*S(xRate,yRate)*T(-pF)
        matMRight = mat4(matNegpFRight*matY*matpFRight);

            for(i=0; i< num1Vertices.length; i ++ ){
            var tempScale1Y = num1VerticesTemp[i][1]*float;

            num1Vertices[i] = vec2(num1Vertices[i][0],tempScale1Y );


        }
        for(i=0; i< num2Vertices.length; i ++ ){
            var tempScale2Y = num2VerticesTemp[i][1]*float;
            num2Vertices[i] = vec2(num2Vertices[i][0],tempScale2Y );

        }
        for(i=0; i< num3Vertices.length; i ++ ){
            var tempScale3Y = num3VerticesTemp[i][1]*float;

            num3Vertices[i] = vec2(num3Vertices[i][0],tempScale3Y );


        }
        for(i=0; i< num4Vertices.length; i ++ ){
            var tempScale4Y = num4VerticesTemp[i][1]*float;

            num4Vertices[i] = vec2(num4Vertices[i][0],tempScale4Y );


        }
        bufferCreate();
    };
    document.getElementById("inp_rotation").oninput = function (event) {
        //TODO: fill here to adjust rotation according to slider value
    };
    document.getElementById("redSlider").oninput = function (event) {
        var colorRed = document.getElementById("redSlider").value;
        //RGB red is changing in order to sliders value, others remain same
        colors = vec4(colorRed, colors[1], colors[2], colors[3]);
        //to reach uniform variable "color" in html
        colorLoc = gl.getUniformLocation(program, "color");
        gl.uniform4fv(colorLoc, colors);



    };
    document.getElementById("greenSlider").oninput = function (event) {
        var colorGreen = document.getElementById("greenSlider").value;
        //RGB green is changing in order to sliders value, others remain same
        colors = vec4(colors[0], colorGreen, colors[2], colors[3]);
        //to reach uniform variable "color" in html
        colorLoc = gl.getUniformLocation(program, "color");
        gl.uniform4fv(colorLoc, colors);


    };
    document.getElementById("blueSlider").oninput = function (event) {
        var colorBlue = document.getElementById("blueSlider").value;
        //RGB blue is changing in order to sliders value, others remain same
        colors = vec4(colors[0], colors[1], colorBlue, colors[3]);
        //to reach uniform variable "color" in html
        colorLoc = gl.getUniformLocation(program, "color");
        gl.uniform4fv(colorLoc, colors);



    };

render();

};




function render() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //TODO: send color to shader
    //TODO: calculate and send transformation matrix
    //TODO: draw digits

    transformationMatrix = mat4();
    gl.uniformMatrix4fv(transformationMatrixLoc, false, flatten(transformationMatrix));


    //if condtion checks input then do related functions to draw numbers

   if(leftNumber == 0){
       gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
       gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
       gl.drawArrays(gl.LINE_STRIP, 0, 4);
       gl.drawArrays(gl.LINE_STRIP, 5, 2);
       gl.drawArrays(gl.LINE_STRIP, 17, 2);
       gl.drawArrays(gl.LINE_STRIP, 20, 4);


       gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
       gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
       gl.drawArrays(gl.LINE_STRIP, 0, 6);
       gl.drawArrays(gl.LINE_STRIP, 7, 4);
       gl.drawArrays(gl.LINE_STRIP, 13, 4);
       gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }

   else if(leftNumber == 1){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 2, 2);
     gl.drawArrays(gl.LINE_STRIP, 22, 2);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 12, 6);
     gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }

   else if(leftNumber == 2){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 4, 3);
     gl.drawArrays(gl.LINE_STRIP, 8, 3);
     gl.drawArrays(gl.LINE_STRIP, 13, 3);
     gl.drawArrays(gl.LINE_STRIP, 17, 3);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 2);
     gl.drawArrays(gl.LINE_STRIP, 2, 4);
     gl.drawArrays(gl.LINE_STRIP, 9, 2);
     gl.drawArrays(gl.LINE_STRIP, 13, 2);
     gl.drawArrays(gl.LINE_STRIP, 18, 4);
     gl.drawArrays(gl.LINE_STRIP, 22, 2);
   }

   else if(leftNumber == 3){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 4, 3);
     gl.drawArrays(gl.LINE_STRIP, 8, 3);
     gl.drawArrays(gl.LINE_STRIP, 12, 3);
     gl.drawArrays(gl.LINE_STRIP, 16, 3);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 2);
     gl.drawArrays(gl.LINE_STRIP, 2, 2);
     gl.drawArrays(gl.LINE_STRIP, 4, 2);
     gl.drawArrays(gl.LINE_STRIP, 13, 2);
     gl.drawArrays(gl.LINE_STRIP, 15, 2);
     gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }

   else if(leftNumber == 4){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 2);
     gl.drawArrays(gl.LINE_STRIP, 2, 2);
     gl.drawArrays(gl.LINE_STRIP, 9, 2);
     gl.drawArrays(gl.LINE_STRIP, 12, 3);
     gl.drawArrays(gl.LINE_STRIP, 22, 2);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 6, 3);
     gl.drawArrays(gl.LINE_STRIP, 12, 3);
     gl.drawArrays(gl.LINE_STRIP, 15, 3);
     gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }

   else if(leftNumber == 5){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 5, 3);
     gl.drawArrays(gl.LINE_STRIP, 9, 3);
     gl.drawArrays(gl.LINE_STRIP, 12, 3);
     gl.drawArrays(gl.LINE_STRIP, 16, 3);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 4, 2);
     gl.drawArrays(gl.LINE_STRIP, 7, 2);
     gl.drawArrays(gl.LINE_STRIP, 15, 2);
     gl.drawArrays(gl.LINE_STRIP, 18, 2);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);
   }

   else if(leftNumber == 6){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 5, 3);
     gl.drawArrays(gl.LINE_STRIP, 9, 3);
     gl.drawArrays(gl.LINE_STRIP, 13, 2);
     gl.drawArrays(gl.LINE_STRIP, 17, 2);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 6);
     gl.drawArrays(gl.LINE_STRIP, 7, 2);
     gl.drawArrays(gl.LINE_STRIP, 9, 2);
     gl.drawArrays(gl.LINE_STRIP, 15, 2);
     gl.drawArrays(gl.LINE_STRIP, 18, 2);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);
   }

   else if(leftNumber == 7){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 4, 3);
     gl.drawArrays(gl.LINE_STRIP, 22, 2);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 2);
     gl.drawArrays(gl.LINE_STRIP, 13, 5);
     gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }

   else if(leftNumber == 8){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 5, 2);
     gl.drawArrays(gl.LINE_STRIP, 9, 2);
     gl.drawArrays(gl.LINE_STRIP, 13, 2);
     gl.drawArrays(gl.LINE_STRIP, 17, 2);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 6);
     gl.drawArrays(gl.LINE_STRIP, 7, 2);
     gl.drawArrays(gl.LINE_STRIP, 9, 2);
     gl.drawArrays(gl.LINE_STRIP, 13, 2);
     gl.drawArrays(gl.LINE_STRIP, 15, 2);
     gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }

   else if(leftNumber == 9){
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 5, 2);
     gl.drawArrays(gl.LINE_STRIP, 9, 2);
     gl.drawArrays(gl.LINE_STRIP, 12, 3);
     gl.drawArrays(gl.LINE_STRIP, 16, 3);
     gl.drawArrays(gl.LINE_STRIP, 20, 4);


     gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.drawArrays(gl.LINE_STRIP, 0, 4);
     gl.drawArrays(gl.LINE_STRIP, 4, 2);
     gl.drawArrays(gl.LINE_STRIP, 7, 2);
     gl.drawArrays(gl.LINE_STRIP, 13, 2);
     gl.drawArrays(gl.LINE_STRIP, 15, 2);
     gl.drawArrays(gl.LINE_STRIP, 18, 6);
   }




    if(rightNumber == 0){
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINE_STRIP, 0, 4);
    gl.drawArrays(gl.LINE_STRIP, 5, 2);
    gl.drawArrays(gl.LINE_STRIP, 17, 2);
    gl.drawArrays(gl.LINE_STRIP, 20, 4);


    gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINE_STRIP, 0, 6);
    gl.drawArrays(gl.LINE_STRIP, 7, 4);
    gl.drawArrays(gl.LINE_STRIP, 13, 4);
    gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    else if(rightNumber == 1){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 2, 2);
      gl.drawArrays(gl.LINE_STRIP, 22, 2);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 12, 6);
      gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    else if(rightNumber == 2){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 4, 3);
      gl.drawArrays(gl.LINE_STRIP, 8, 3);
      gl.drawArrays(gl.LINE_STRIP, 13, 3);
      gl.drawArrays(gl.LINE_STRIP, 17, 3);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 2);
      gl.drawArrays(gl.LINE_STRIP, 2, 4);
      gl.drawArrays(gl.LINE_STRIP, 9, 2);
      gl.drawArrays(gl.LINE_STRIP, 13, 2);
      gl.drawArrays(gl.LINE_STRIP, 18, 4);
      gl.drawArrays(gl.LINE_STRIP, 22, 2);
    }

    else if(rightNumber == 3){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 4, 3);
      gl.drawArrays(gl.LINE_STRIP, 8, 3);
      gl.drawArrays(gl.LINE_STRIP, 12, 3);
      gl.drawArrays(gl.LINE_STRIP, 16, 3);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 2);
      gl.drawArrays(gl.LINE_STRIP, 2, 2);
      gl.drawArrays(gl.LINE_STRIP, 4, 2);
      gl.drawArrays(gl.LINE_STRIP, 13, 2);
      gl.drawArrays(gl.LINE_STRIP, 15, 2);
      gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    else if(rightNumber == 4){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 2);
      gl.drawArrays(gl.LINE_STRIP, 2, 2);
      gl.drawArrays(gl.LINE_STRIP, 9, 2);
      gl.drawArrays(gl.LINE_STRIP, 12, 3);
      gl.drawArrays(gl.LINE_STRIP, 22, 2);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 6, 3);
      gl.drawArrays(gl.LINE_STRIP, 12, 3);
      gl.drawArrays(gl.LINE_STRIP, 15, 3);
      gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    else if(rightNumber == 5){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 5, 3);
      gl.drawArrays(gl.LINE_STRIP, 9, 3);
      gl.drawArrays(gl.LINE_STRIP, 12, 3);
      gl.drawArrays(gl.LINE_STRIP, 16, 3);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 4, 2);
      gl.drawArrays(gl.LINE_STRIP, 7, 2);
      gl.drawArrays(gl.LINE_STRIP, 15, 2);
      gl.drawArrays(gl.LINE_STRIP, 18, 2);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);
    }

    else if(rightNumber == 6){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 5, 3);
      gl.drawArrays(gl.LINE_STRIP, 9, 3);
      gl.drawArrays(gl.LINE_STRIP, 13, 2);
      gl.drawArrays(gl.LINE_STRIP, 17, 2);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 6);
      gl.drawArrays(gl.LINE_STRIP, 7, 2);
      gl.drawArrays(gl.LINE_STRIP, 9, 2);
      gl.drawArrays(gl.LINE_STRIP, 15, 2);
      gl.drawArrays(gl.LINE_STRIP, 18, 2);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);
    }

    else if(rightNumber == 7){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 4, 3);
      gl.drawArrays(gl.LINE_STRIP, 22, 2);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 2);
      gl.drawArrays(gl.LINE_STRIP, 13, 5);
      gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    else if(rightNumber == 8){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 5, 2);
      gl.drawArrays(gl.LINE_STRIP, 9, 2);
      gl.drawArrays(gl.LINE_STRIP, 13, 2);
      gl.drawArrays(gl.LINE_STRIP, 17, 2);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 6);
      gl.drawArrays(gl.LINE_STRIP, 7, 2);
      gl.drawArrays(gl.LINE_STRIP, 9, 2);
      gl.drawArrays(gl.LINE_STRIP, 13, 2);
      gl.drawArrays(gl.LINE_STRIP, 15, 2);
      gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    else if(rightNumber == 9){
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum3);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 5, 2);
      gl.drawArrays(gl.LINE_STRIP, 9, 2);
      gl.drawArrays(gl.LINE_STRIP, 12, 3);
      gl.drawArrays(gl.LINE_STRIP, 16, 3);
      gl.drawArrays(gl.LINE_STRIP, 20, 4);


      gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum4);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINE_STRIP, 0, 4);
      gl.drawArrays(gl.LINE_STRIP, 4, 2);
      gl.drawArrays(gl.LINE_STRIP, 7, 2);
      gl.drawArrays(gl.LINE_STRIP, 13, 2);
      gl.drawArrays(gl.LINE_STRIP, 15, 2);
      gl.drawArrays(gl.LINE_STRIP, 18, 6);
    }

    window.requestAnimFrame(render);
}
