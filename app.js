window.addEventListener('load', init, false);
function init() {
    let x = 300;
    let y = 200;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pool = [];
    let canvas = document.createElement('canvas');
    canvas.addEventListener('click', clickHandler, false);
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = AppColors().backgroundColor;
    let context = canvas.getContext('2d');

    let grid = Grid(Vector(0, 0), width, height, 20, AppColors().lineColor1, context);
    pool.push(grid);

    let lineVert = Line(x, 0, x, height, 2, 'round', AppColors().lineColor2, context);
    pool.push(lineVert);

    let lineHorz = Line(0, y, width, y, 2, 'round', AppColors().lineColor2, context);
    pool.push(lineHorz);

    let ball = Ball(Vector(x, y), 5, AppColors().myred, context);
    pool.push(ball);

    let vector = Line(x, y, x, y, 3, 'round', AppColors().myred, context);
    pool.push(vector);

    let xtext = new TextBox(20, 40, 25, 'x: 0', AppColors().xcolor, context);
    pool.push(xtext);

    let ytext = new TextBox(20, 65, 25, 'x: 0', AppColors().ycolor, context);
    pool.push(ytext);

    let ctext = new TextBox(20, 90, 25, 'cos: 0', AppColors().textColor, context);
    pool.push(ctext);

    let stext = new TextBox(20, 115, 25, 'sin: 0', AppColors().textColor, context);
    pool.push(stext);

    function clickHandler(e) {
        context.clearRect(0, 0, width, height);

        let mx = Math.round(e.clientX / 20) * 20;
        let my = Math.round(e.clientY / 20) * 20;

        ball.position = Vector(mx, my);
        vector.x2 = mx;
        vector.y2 = my;

        xtext.text = 'x: ' + (mx - x) / 20;
        ytext.text = 'y: ' + (my - y) / 20;

        var angler = Vector(vector.x1, vector.y1).angleTo(Vector(vector.x2, vector.y2));
        //console.log(angle);

        ctext.text = 'cos: ' + Math.fround(Math.cos(angler));
        stext.text = 'sin: ' + Math.fround(Math.sin(angler));

        pool.forEach(function (object) {
            object.update();
        }, this);

    }
}