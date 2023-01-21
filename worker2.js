var cells = [];
var blocks = [[], [], [], [], [], [], [], [], []];
var entropies = [1];
var snap_shots = [];
const myCanvas = document.getElementById("canvas");
var context = myCanvas.getContext("2d");
const myCanvas_width = 410;
const myCanvas_height = 410;
const cell_size = myCanvas_width / 9;


class Cell{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.value = "";
        this.cell_size = size;
        this.in_block = -1;
        this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.user_submitted = false;
    }
    draw(){
        context.strokeRect(this.x, this.y, this.cell_size, this.cell_size);
    }
    show(){
        context.strokeStyle = "black";
        context.fillRect(this.x + this.cell_size / 3.2, this.y + this.cell_size / 3.2, this.cell_size / 3, this.cell_size / 3);
        if(this.value != ""){
            context.strokeStyle = "white";
            context.strokeText(this.value, this.x + (this.cell_size / 2.5), this.y + (this.cell_size / 2));
        }
    }
}


function setUp(){
    myCanvas.width = myCanvas_width;
    myCanvas.height = myCanvas_height;
    context.strokeStyle = "white";      
}


//Drawing the grid in UI

function load_blocks(){
    let block_index = 0;
    let incriment_count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(j < 3){
                blocks[block_index].push(cells[i][j]);
                cells[i][j].in_block = block_index;
            }else if(j < 6){
                blocks[block_index + 1].push(cells[i][j]);
                cells[i][j].in_block = block_index + 1;
            }else{
                blocks[block_index + 2].push(cells[i][j]);
                cells[i][j].in_block = block_index + 2;
            }
        }
        incriment_count += 1;
        if(incriment_count == 3){
            incriment_count = 0;
            block_index += 3;
        }
    }
}


function drawGrid(){
    for(let i = 0; i < 9; i++){
        let row = [];
        for(let j = 0; j < 9; j++){
            tempCell = new Cell(cell_size * i, cell_size * j, cell_size);
            tempCell.draw();
            row.push(tempCell);
        }
        cells.push(row);
    }
    context.strokeStyle = "red";
    for(let i = 0; i < 9; i = i + 3){
        for(let j = 0; j < 9; j = j + 3){
            context.strokeRect(i * cell_size, j * cell_size, cell_size * 3, cell_size * 3);
        }
    }
    context.stroke();    
}


//Logic
function copy(){
    var new_cells = [];
    for(let i = 0; i < 9; i++){
        let row = [];
        for(let j = 0; j < 9; j++){
            let copy = new cells[i][j].constructor();
            for (var attr in cells[i][j]) {
                if (cells[i][j].hasOwnProperty(attr)){
                    copy[attr] = cells[i][j][attr];
                }
            }
            row.push(copy);      
        }
        new_cells.push(row);       
    }
    return new_cells;
}

function print(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            cells[i][j].show();      
        }       
    }
    context.stroke();
}

function load(){
    let count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let s = "cell_" + i + "" + j;
            let val = document.getElementById(s).value;
            if(val != ""){
                count += 1;
                cells[i][j].user_submitted = true;
                cells[i][j].options = [];
            }
            cells[i][j].value = val;
        }
    }
    if(count < 17){
        console.log("Minimum 17 numbers are needed");
        window.alert("Please add atleast 17 numbers.")
        return;
    }
    load_blocks();
    print();
    document.getElementById("solve_button").style.display = 'block';
}

function find_entropies(node, r, c){
    var valid_options = [];
    var temp_options = node.options.slice();
    temp_options.forEach(element => {
        for(let i = 0; i < 9; i++){
            if(cells[i][c].value == element){
                return;            
            }
        }
        for(let j = 0; j < 9; j++){
            if(cells[r][j].value == element){
                return;                      
            }
        }
        let curr_block = node.in_block;
        for(let i = 0; i < 9; i++){
            if(blocks[curr_block][i].value == element){
                return;      
            }
        }
        valid_options.push(element);
        return;
    });
    node.options = valid_options;
    return node;
}

function run(){ 
    entropies.length = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(! cells[i][j].user_submitted){
                entropies.push(find_entropies(cells[i][j], i, j));
            }
        }
    }
    entropies.sort((a, b) => {
        if(a.options.length <= b.options.length){
            return -1;
        }else{
            return 1;
        }
    });
    if(entropies.length == 0){
		return;
	}
    
    if(entropies[0].options.length == 0){
        cells.length = 0;
        cells = snap_shots.pop();
        blocks = [[], [], [], [], [], [], [], [], []];
        load_blocks();
        return;
    }else if(entropies[0].options.length > 1){
                let curr_op = entropies[0].options[0];
                entropies[0].options.splice(0, 1);
                snap_shots.push(copy());
                entropies[0].value = curr_op;
                entropies[0].user_submitted = true;
           
    }else{
            entropies[0].value = entropies[0].options[0];
            entropies[0].user_submitted = true;
        
    }
    return;
    
}

function solve(){
    var repeat = setInterval(() => {
        if(entropies.length == 0){
            clearInterval(repeat);
        }
        run();
        print();
        
    },300);
}

setUp()
drawGrid()