let homepage=true;
let building,table,row_no;
let meter_num, elec_bill, owed;
let start_btn, again_btn;

let bn_numbers = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

function convertEn2Bn(num){
  bnNum = ''
  for(let digit of num){
    bnNum+=bn_numbers[int(digit)];
  }
  return bnNum;
}


function preload(){
  table = loadTable('rents.csv','csv','header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  start_btn = createButton('শুরু করুন').size(150,100);
  again_btn = createButton('আবার').size(100,60);
}

function draw() {
  background(210);

  // HOMEPAGE
  if (homepage){
    start_btn.show();
    again_btn.hide();

    start_btn.position(windowWidth/2-75,windowHeight/2-70);
    start_btn.style('font-size: 30px');

    start_btn.mousePressed( function(){
      takeInput();
    })
  }
  // TABLE PAGE
  else{
    start_btn.hide();
    again_btn.show();

    let flat = table.getString(row_no, 2);
    let rent = table.getString(row_no, 3);
    let gas_bill = table.getString(row_no, 4);

    drawTable(flat,rent,gas_bill,elec_bill,owed);

    again_btn.mousePressed( function(){
      takeInput();
    })
  }

}

function takeInput(){
  homepage=false;
  all_meter_nums = table.getColumn('meter_no');
  row_no = getMeterNum(all_meter_nums);
  building = table.getString(row_no,0);
  elec_bill = window.prompt("ইলেক্ট্রিক বিল লিখুনঃ ");
  if (!elec_bill) elec_bill = '0';
  owed = window.prompt("বকেয়াঃ ");
  if (!owed) owed = '0';
}

function getMeterNum(all_meter_nums){
  let str = "মিটার নাম্বার দিন: ";
  while (true){
    meter_num = window.prompt(str);
    row = all_meter_nums.indexOf(meter_num);
    if (row==-1){
      str = "মিটার নাম্বারটি ভুল হয়েছে\nসঠিক মিটার নাম্বার দিনঃ ";
    }
    else{
      return row;
    }
  }
}

function drawBox(txt,txt_sz,x,y,w,h){
  fill(200);
  strokeWeight(3);
  rect(x,y,w,h);
  fill(0);
  textSize(txt_sz);
  text(txt,x+w/10,y+15,w,h);
}

function drawTable(flat_name,rent,gas,elec,owed){
  let x,y,w,h,sum=0;
  x=windowWidth/2;
  y=50;
  w=300;
  h=50;
  x=x-w/2;

  //At first Printing Building Name
  drawBox(building,35,x,y,w,h+10);
  y=y+1.5*h;

  //Now draw the actual table
  // drawBox(flat_name+'\n#'+meter_num,32,x,y,w,h+40);
  drawBox(flat_name,32,x,y,w,h+10);
  y=y+h+10;
  drawBox('মিটার নং #'+meter_num,28,x,y,w,h+10);
  y=y+h+10;
  w=w/2;
  drawBox('ভাড়াঃ ',22,x,y,w+30,h);
  drawBox(convertEn2Bn(rent)+'/=',22,x+w+30,y,w-30,h);
  sum+=int(rent);
  y=y+h;
  drawBox('গ্যাস বিলঃ ',22,x,y,w+30,h);
  drawBox(convertEn2Bn(gas)+'/=',22,x+w+30,y,w-30,h);
  sum+=int(gas);
  y=y+h;
  drawBox('ইলেক্ট্রিক বিলঃ ',22,x,y,w+30,h);
  drawBox(convertEn2Bn(elec)+'/=',22,x+w+30,y,w-30,h);
  sum+=int(elec);
  y=y+h;
  drawBox("বকেয়াঃ ",22,x,y,w+30,h);
  drawBox(convertEn2Bn(owed)+'/=',22,x+w+30,y,w-30,h);
  sum+= int(owed);
  y=y+h;

  drawBox('মোটঃ ',32,x,y,w+30,h);
  drawBox(convertEn2Bn(str(sum))+'/=',22,x+w+30,y,w-30,h);

  x=windowWidth/2;
  again_btn.position(x-w/3,y+h+15);
  again_btn.style('font-size: 22px');
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);

  start_btn.position(windowWidth/2-75,windowHeight/2-70);
}