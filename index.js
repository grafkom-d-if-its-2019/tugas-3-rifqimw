(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var canvas2 = document.getElementById("glcanvas2");
    var gl = glUtils.checkWebGL(canvas);
    var gl2 = glUtils.checkWebGL(canvas2);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl2, gl2.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader2 = glUtils.getShader(gl2, gl2.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl2, vertexShader2, fragmentShader2);
    gl.useProgram(program);
    gl2.useProgram(program2);

    //Mendefinisikan vertices
    var vertices = [
      // x,y      r,g,b
      -0.6, -0.4, 0.0, 1.0, 1.0, 
      -0.6, 0.3, 0.0, 1.0, 1.0, 
      -0.1, 0.3, 0.0, 1.0, 1.0, 
      -0.1, 0.0, 0.0, 1.0, 1.0, 
      -0.3, 0.0, 0.0, 1.0, 1.0, 
      -0.1, -0.4, 0.0, 1.0, 1.0, 
      -0.3, -0.4, 0.0, 1.0, 1.0, 
      -0.4, -0.1, 0.0, 1.0, 1.0, 
      -0.4, -0.4, 0.0, 1.0, 1.0, 
    ];

     var vertices2 = [
      // x,y      r,g,b
      0.4, 0.3,  1.0, 0.0, 1.0, 
      0.2, -0.4, 1.0, 0.0, 1.0, 
      0.2, 0.3,  1.0, 0.0, 1.0, 
      0.2, -0.4, 1.0, 0.0, 1.0, 
      0.4, 0.3,  1.0, 0.0, 1.0, 
      0.4, -0.4, 1.0, 0.0, 1.0, 
      0.4, 0.3,  1.0, 0.0, 1.0, 
      0.6, 0.3,  1.0, 0.0, 1.0, 
      0.4, 0.0,  1.0, 0.0, 1.0, 
      0.4, 0.0,  1.0, 0.0, 1.0, 
      0.6, 0.3,  1.0, 0.0, 1.0, 
      0.6, 0.0,  1.0, 0.0, 1.0, 
      0.5, 0.0,  1.0, 0.0, 1.0, 
      0.4,0.0,   1.0, 0.0, 1.0, 
      0.6, -0.4, 1.0, 0.0, 1.0, 
      0.6, -0.4, 1.0, 0.0, 1.0, 
      0.4, 0.0,  1.0, 0.0, 1.0, 
      0.45, -0.4, 1.0, 0.0, 1.0 
    ];

    //Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); //static draw karena vbo tidak banyak berubah

    var vertexBufferObject2 = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, vertexBufferObject2);
    gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices2), gl2.STATIC_DRAW);

    //Membuat sambungan untuk attribute
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  //variabel yang memegang posisi attribute di shader
      2,          //jumlah elemen per attribute
      gl.FLOAT,   //tipe data attribute
      gl.FALSE,   
      5 * Float32Array.BYTES_PER_ELEMENT,   //ukuran byte tiap vertex (overall)
      0           //offset dari posisi elemen di array
    )
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var vPosition2 = gl2.getAttribLocation(program2, 'vPosition');
    var vColor2 = gl.getAttribLocation(program2, 'vColor');
    gl2.vertexAttribPointer(vPosition, 2, gl2.FLOAT, gl2.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT,0);
    gl2.vertexAttribPointer(vColor, 3, gl2.FLOAT, gl2.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl2.enableVertexAttribArray(vPosition);
    gl2.enableVertexAttribArray(vColor);

    //Membuat sambungan untuk uniform
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0; //180 derajat dalam radian

    //Gambar sebelah kanan
    var scaleXUniformLocation = gl2.getUniformLocation(program2, 'scaleX');
    var scaleX = 1.0;
    gl2.uniform1f(scaleXUniformLocation, scaleX);
    var scaleYUniformLocation = gl2.getUniformLocation(program2, 'scaleY');
    var scaleY = 1.0;
    gl2.uniform1f(scaleYUniformLocation, scaleY);

    var melebar = 0.0076;

    function render() {
      theta += 0.0076;
      gl.uniform1f(thetaUniformLocation, theta);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.LINE_LOOP, 0, 9);

      if (scaleX >= 1.0) melebar = -0.0076;
      else if (scaleX <= -1.0) melebar = 0.0076;
      scaleX += 1.0 * melebar;
      gl2.uniform1f(scaleXUniformLocation, scaleX);
      gl2.clearColor(0.0, 0.0, 0.0, 1.0);
      gl2.clear(gl2.COLOR_BUFFER_BIT);
      gl2.drawArrays(gl2.TRIANGLES, 0, 18);
      
      requestAnimationFrame(render);
    }
    render();
  }
})();