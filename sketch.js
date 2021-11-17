
let table;
let start_btn;
let started, meter_num;

function preload(){

  table = loadTable('rents.csv','csv','header');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  start_btn = createButton('Start').size(80,50);
  start_btn.center();
}

function draw() {
  background(220);

  if (!started){
    start_btn.mousePressed(starting);
  }
  else{

    elec_bill = window.prompt("Input Electric Bill: ");

    print(table.getRowCount());
    print(table.getColumnCount());
    print(table.getString(0,0));

  }
}

function starting(){
  started=true;
  start_btn.hide();
  meter_num = window.prompt("Input Meter No.: ");
}
