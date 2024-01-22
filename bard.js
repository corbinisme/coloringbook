var coloring = {
    canvas: null,
    canvasWrapper: document.getElementById("canvasWrapper"),
    ctx: null,
    currentPage: "intro",
    img: null,
    isErasing: false,
    imgSrc: "images/intro.png",
    drawing: false,
    color: "black",
    thickness: 5,
    imgOutlineCanvas: null,
    imgOutlineCtx: null,


    init: function() {
        const self = this;
        this.canvas = document.getElementById("coloringCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.img = new Image();
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, 0);
        };
        this.img.src = this.imgSrc;

        window.addEventListener('resize', function () {
            self.resizeCanvas();
        });

       

        



        this.binding();
        window.setTimeout(function(){self.resizeCanvas()}, 500);
    },
    resizeCanvas: function () {
        const aspectRatio = this.img.width / this.img.height;

        // Set canvas dimensions based on screen width
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / aspectRatio;

        // Redraw the image on the resized canvas
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    },
    updateImage: function(newImage) {
        this.imgSrc = newImage;
        this.img.src = this.imgSrc;
        
        
    },
    updateColor: function(newColor) {
        this.color = newColor;
    },
    updateThisckness: function(newThickness) {
        this.thickness = newThickness;
    },
    binding: function(){
        const self = this;
        document.getElementById("pageSelect").addEventListener("change", function(e){
            let val = e.target.value;
            let newImage = "images/" + val + ".png";
            coloring.currentPage = val;
            coloring.updateImage(newImage);
            coloring.reset();
        });

        this.canvas.addEventListener("mousedown", (e) => {
            this.drawing = true;
        });
        this.canvas.addEventListener("mouseup", () => {
            this.drawing = false;
        });
        this.canvas.addEventListener("mousemove", (e) => {
            
            self.drawLine(e);
            
        });
        this.canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            self.drawing = true;
            console.log("touchstart")
            var touch = e.touches[0];
            self.drawLine(touch);
        });
        this.canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            console.log("touchmove")
            if (self.drawing) {
            
                var touch = e.touches[0];
                self.drawLine(touch);
            }
        });
        this.canvas.addEventListener('touchend', function() {
            self.drawing = false;
        });
    },

    drawLine: function(e) {
        if (this.drawing) {

            const x = e.clientX - this.canvas.offsetLeft;
            const y = e.clientY - this.canvas.offsetTop;

            this.ctx.beginPath();
            this.ctx.lineWidth = this.thickness;
            this.ctx.lineCap = "round";

            if (this.isErasing) {
                // If erasing, use the destination-out composite operation
                //this.ctx.globalCompositeOperation = "destination-out";
                this.ctx.strokeStyle = "rgba(255,255,255,1)"; // Color doesn't matter for erasing
            } else {
                // If drawing, use the source-over composite operation
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.strokeStyle = this.color;
            }
            
            this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
            this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.drawImage(this.img, 0, 0); 
        // Redraw the image
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    },

    changeColor: function(newColor) {
        this.color = newColor;
    },

    changeThickness: function(newThickness) {
        this.thickness = newThickness;
    },
    reset: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, 0, 0);
    },
    save: function() {
        let dataURL = this.canvas.toDataURL();
        let a = document.createElement("a");
        a.href = dataURL;
        a.download = "coloring.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

coloring.init(); // Call the initialization function

