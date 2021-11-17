
let table;

let started=false;
let start_btn, again_btn;
let meter_num, elec_bill, owed;

function preload(){

  table = loadTable('uttar.csv','csv','header');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  start_btn = createButton('Start').size(100,70);
  start_btn.center();
  start_btn.style('font-size: 30px');
}

function draw() {
  background(220);

  if (!started){
    start_btn.mousePressed(starting);
  }
  else{

    all_meters = table.getColumn('meter_no');
    
    let row_no = all_meters.indexOf(meter_num);

    let flat = table.getString(row_no,1);
    let rent = table.getString(row_no,2);
    let gas_bill = table.getString(row_no,3);

    drawTable(flat,rent,gas_bill,elec_bill,owed);

    again_btn.mousePressed( function(){
      starting();
    })
  }
}

function takeInput(){
  meter_num = window.prompt("Input Meter No.: ");
  elec_bill = window.prompt("Input Electric Bill: ");
  owed = window.prompt("Input Owed (If any): ");
}

function starting(){
  started=true;
  start_btn.hide();
  takeInput();
}

function drawTable(){
  fill(0);
  textSize(32);
  text('word', 20, 50);
}

function drawBox(txt,txt_sz,x,y,w,h){
  fill(200);
  strokeWeight(3);
  rect(x,y,w,h);
  fill(0);
  textSize(txt_sz);
  text(txt,x+w/4.6,y+10,w,h);
}

function drawTable(flat_name,rent,gas,elec,owed){
  let x,y,w,h,sum=0;
  x=windowWidth/2;
  y=50;
  w=300;
  h=50;
  x=x-w/2;
  drawBox(flat_name,32,x,y,w,h);
  y=y+h;
  w=w/2;
  drawBox('Rent: ',22,x,y,w+30,h);
  drawBox(rent,22,x+w+30,y,w-30,h);
  sum+=int(rent);
  y=y+h;
  drawBox('Gas Bill: ',22,x,y,w+30,h);
  drawBox(gas,22,x+w+30,y,w-30,h);
  sum+=int(gas);
  y=y+h;
  drawBox('Electric Bill: ',22,x,y,w+30,h);
  drawBox(elec,22,x+w+30,y,w-30,h);
  sum+=int(elec);
  y=y+h;
  drawBox("OWED",22,x,y,w+30,h);
  drawBox(owed,22,x+w+30,y,w-30,h);
  sum+= (owed) ? int(owed):0;
  y=y+h;

  drawBox('Total: ',32,x,y,w+30,h);
  drawBox(sum,22,x+w+30,y,w-30,h);

  again_btn = createButton('Another').size(100,60);
  x=windowWidth/2;
  again_btn.position(x-w/3,y+h+15);
  again_btn.style('font-size: 22px');
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  start_btn.hide();
  start_btn = createButton('Start').size(100,70);
  start_btn.center();
  start_btn.style('font-size: 30px');
}