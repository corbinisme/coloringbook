var coloring = {
    currentImageUrl: null,
    canvas: null,
    ctx: null,
    img: new Image(),
    isDrawing: false,
    currentColor: 'rgba(255, 0, 0, 0.5)', // Default color
    currentLineWidth: 10, // Default line width
    resizeCanvas: function() {
        var aspectRatio = this.img.width / this.img.height;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / aspectRatio;
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    },
    draw: function(x, y) {
        if (this.isDrawing) {
            this.ctx.fillStyle = this.currentColor;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.currentLineWidth / 2, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    },
    changeColor: function(newColor) {
        this.currentColor = newColor;
    },
    changeLineWidth: function(newWidth) {
        this.currentLineWidth = newWidth;
    },
    setupEvents: function() {
        var self = this;
        this.img.onload = function() {
            self.resizeCanvas();
        };
        this.img.src = this.currentImageUrl;
        window.addEventListener('resize', function() {
            self.resizeCanvas();
        });
        this.canvas.addEventListener('mousedown', function(e) {
            self.isDrawing = true;
            self.draw(e.clientX - self.canvas.getBoundingClientRect().left, e.clientY - self.canvas.getBoundingClientRect().top);
        });
        this.canvas.addEventListener('mousemove', function(e) {
            if (self.isDrawing) {
                self.draw(e.clientX - self.canvas.getBoundingClientRect().left, e.clientY - self.canvas.getBoundingClientRect().top);
            }
        });
        this.canvas.addEventListener('mouseup', function() {
            self.isDrawing = false;
        });
        document.querySelectorAll(".coloring-color").forEach(function(elem) {
            let color = elem.getAttribute("data-color");
            elem.addEventListener("click", function() {
                self.changeColor(color);
            });
        });
    },
    init: function(){
        this.currentImageUrl = 'OIP.jpg';
        this.img.src = this.currentImageUrl;
        this.setupCanvas();
        this.resizeCanvas();
        this.setupEvents();
        
    },
    setupCanvas: function(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
};

coloring.init();

/*
function setupResponsiveColoringBook(imageUrl, canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var isDrawing = false;
    var currentColor = 'rgba(255, 0, 0, 0.5)'; // Default color
    var currentLineWidth = 10; // Default line width
  
    function resizeCanvas() {
      var aspectRatio = img.width / img.height;
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth / aspectRatio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  
    img.onload = function() {
      resizeCanvas();
    };
  
    img.src = imageUrl;
  
    window.addEventListener('resize', function() {
      resizeCanvas();
    });
  
    canvas.addEventListener('mousedown', function(e) {
      isDrawing = true;
      draw(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    });
  
    canvas.addEventListener('mousemove', function(e) {
      if (isDrawing) {
        draw(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
      }
    });
  
    canvas.addEventListener('mouseup', function() {
      isDrawing = false;
    });
  
    // Add color and line width change events if needed
    // Example: You can have color and width input elements and set event listeners to change the currentColor and currentLineWidth
  
    function draw(x, y) {
      if (isDrawing) {
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(x, y, currentLineWidth / 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  
    // Function to change the current color
    function changeColor(newColor) {
      currentColor = newColor;
    }
  
    // Function to change the current line width
    function changeLineWidth(newWidth) {
      currentLineWidth = newWidth;
    }
  
    // Example usage:
    changeColor('rgba(0, 0, 255, 0.5)'); // Change color to blue
    //changeLineWidth(5); // Change line width to 5
  }
  
  
  setupResponsiveColoringBook('OIP.jpg', 'canvas')
  */