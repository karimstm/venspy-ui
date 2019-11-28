function dropDownView()
{
    if (!leetDropDownStatus.active)
    {
        for (var i = 0; i < leetDropDownButtons.length; i++)
            leetDropDownButtons[i].display = false;
        return ;
    }
    for (var i = 0; i < leetDropDownButtons.length; i++)
    {
        leetDropDownButtons[i].display = true;
        leetDropDownButtons[i].draw();
    }
}

function DropDownButtonDraw()
{
    noStroke();
    if (leetDropDownStatus.hovered)
    {
        fill(0x45, 0x45, 0x45);
        rect(width/2 - 110, 0, 240, 50);
    }
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textFont('Roboto Mono');
    textSize(14);
    text(leetCurrentViewClass.name, width/2 - 100, 0, 200, 50);
    if (leetDropDownStatus.active)
    {
        push();
        translate(width/2 + 100 + 5, 20);
        rotate(PI);
        imageMode(CENTER);
        image(leetComponentImages['arrowDown'], -5, -5, 10, 10);
        pop();
    }
    else
        image(leetComponentImages['arrowDown'], width/2 + 100 + 5, 20, 10, 10);
    dropDownView();
}

function DropDownElementClickHandler(element)
{
    switchLeetView(element.args.classId);
}

function DropDownElementHoverHandler(element)
{
    if (element.hovered)
    {
        element.backupColor = element.color;
        element.color = [0x45, 0x45, 0x45];
    }
    else
    {
        element.color = element.backupColor;
        element.draw();
    }
}