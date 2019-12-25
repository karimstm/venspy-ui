function dropDownView() {
  let offset = leetDropDownStatus.offset;
  if (!leetDropDownStatus.active) {
    for (var i = 0; i < leetDropDownButtons.length; i++)
      leetDropDownButtons[i].display = false;
    return;
  }
  for (var i = offset; i < leetDropDownButtons.length; i++) {
    leetDropDownButtons[i].y = 50 + (i - offset) * 50;
    if (leetDropDownButtons[i].y > height) break;
    leetDropDownButtons[i].display = true;
    leetDropDownButtons[i].draw();
  }
  push();
  let unit = (height - 50) / leetViewClasses.length;
  let scrollHeight = unit * (height / 50 - 1);
  let y = 50 + unit * offset;
  fill(0x45, 0x45, 0x45);
  rect(width / 2 + 130, y, 20, scrollHeight);
  pop();
}

function sliderBox() {
  let unit = (height - 50) / leetViewClasses.length;
  let scrollHeight = unit * (height / 50 - 1);
  let y = 50 + unit * leetDropDownStatus.offset;

  return { x: width / 2 + 130, y: y, w: 20, h: scrollHeight };
}

function DropDownButtonDraw() {
  noStroke();
  if (leetDropDownStatus.hovered) {
    fill(0x45, 0x45, 0x45);
    rect(width / 2 - 110, 0, 240, 50);
  }
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  textFont("Roboto Mono");
  textSize(14);
  text(leetCurrentViewClass.name, width / 2 - 100, 0, 200, 50);
  if (leetDropDownStatus.active) {
    push();
    translate(width / 2 + 100 + 5, 20);
    rotate(PI);
    imageMode(CENTER);
    image(leetComponentImages["arrowDown"], -5, -5, 10, 10);
    pop();
  } else
    image(leetComponentImages["arrowDown"], width / 2 + 100 + 5, 20, 10, 10);
  dropDownView();
}

function DropDownElementClickHandler(element) {
  switchLeetView(element.args.classId);
}

function dropDownMouseWheel(delta) {
  let boxHeight = (leetViewClasses.length - leetDropDownStatus.offset) * 50;
  if (
    leetDropDownStatus.active &&
    mouse_in_box({ x: width / 2 - 110, y: 50, w: 240, h: boxHeight })
  ) {
    if (delta > 0 && leetDropDownStatus.offset > 0) leetDropDownStatus.offset--;
    else if (
      delta < 0 &&
      leetDropDownStatus.offset < leetViewClasses.length - height / 50
    )
      leetDropDownStatus.offset++;
    return true;
  }
  return false;
}

function DropDownElementHoverHandler(element) {
  if (element.hovered) {
    element.backupColor = element.color;
    element.color = [0x45, 0x45, 0x45];
  } else {
    element.color = element.backupColor;
    element.draw();
  }
}
