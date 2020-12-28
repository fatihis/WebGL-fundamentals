First, I started with drawing numbers. I figured out that if I draw lines with LINE_LOOP it is
going to cost us much more time than LINE_STRIP because to draw with LINE_LOOP requires
array vertices for each number(because they have to be unique order) if I do quick math, I
had to write 9 array for our left number and 9 array for our right number, so I decided to use
LINE_STRIP to avoid that and use just multiple of lines. So instead having 18 arrays, I just have
4 arrays, 2 of them is for left number, 2 of them for right number. It is 2 for each because one of
them has vertices as horizantal order, other has vertices as vertical order. I determined origin
in the middle of two numbers, also split input into two separate numbers. I had created 4
buffer for load the data into the GPU before render function called. To change color of drawings,
I used gl_FragColor which is bind uniform “color” variable in html, I took RGB of color each
time and change it in order to slider and push them back with gl.uniform4fv. In order to position
change I take slider value as float variable then make an addition as axis-related with a for
loop, after loops ends I called buffer creation method bufferCreate() for load new numbers to
GPU. Scaling was the intensely hard for us. I used methods that learned in lectures which are
M= T(pF) *S(Xrate,Yrate)*T(-pF) and P-
 = M*P. I had created 3 matrix; matNegpF, matpF and
matX or matY, both pF matrix had separated for left and right number, after I set the matrix
I calculated m matrix, I used the m matrix for each point to scale. Actually there is a eaiser
way which is multiply vec2 variables with input that is what I done too, after scaling the points,
again I created a buffer to load vertices into the GPU. 
