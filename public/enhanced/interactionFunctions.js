function applyScale(s, centerX, centerY) {
    leetCurrentViewClass.zoomSf = leetCurrentViewClass.zoomSf * s;
    leetCurrentViewClass.zoomTx = centerX * (1-s) + leetCurrentViewClass.zoomTx * s;
    leetCurrentViewClass.zoomTy = centerY * (1-s) + leetCurrentViewClass.zoomTy * s;
}

function keyPressed()
{
    if (keyCode === LEFT_ARROW && leetCurrentViewClassIndex > 0)
        switchLeetView(leetCurrentViewClassIndex - 1);
    else if (keyCode === RIGHT_ARROW && leetCurrentViewClassIndex < leetViewClasses.length - 1)
        switchLeetView(leetCurrentViewClassIndex + 1);
}

function switchLeetView(newIndex)
{
    if (newIndex < 0)
        newIndex = leetViewClassesHistory.pop();
    else if (newIndex != leetCurrentViewClassIndex)
        leetViewClassesHistory.push(leetCurrentViewClassIndex);
    if (newIndex == undefined)
        return ;
    leetCurrentViewClassIndex = newIndex;
    leetCurrentViewClass = leetViewClasses[leetCurrentViewClassIndex];
    if (leetViewClassesHistory.length > 10)
        leetViewClassesHistory.splice(0, 1);
    if (leetCurrentViewClass.zoomSf === null)
        centerScene();
}

function mousePressed()
{
    ui_clicks();
    leetCurrentViewClass.check_click();
}

function mouseWheel(event)
{
    if (!ui_mouseWheel(event.delta))
    {
        if (event.delta > 0)
            applyScale(0.9, mouseX, mouseY);
        else if (event.delta < 0)
            applyScale(1.1, mouseX, mouseY);
    }
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}

function holdingKeys()
{
    if (keyIsDown(RIGHT_ARROW))
        switchLeetView(leetCurrentViewClassIndex + 1);
    else if (keyIsDown(LEFT_ARROW))
        switchLeetView(leetCurrentViewClassIndex - 1);
}

function mouseDragged()
{
// checking if the mouse is on the slider
    // if (leetDropDownStatus.active == true)
    // {
    //     let unit = ((height - 50) / leetViewClasses.length);
    //     if (mouse_in_box(sliderBox()))
    //     {
    //         console.log('in slider');
    //         let realY = mouseY - sliderBox().h / 2;
    //         leetDropDownStatus.offset = Math.floor(offset = (realY - 50) / unit);
    //         leetDropDownStatus.offset = Math.max(leetDropDownStatus.offset, 0);
    //         leetDropDownStatus.offset = Math.min(leetDropDownStatus.offset, leetViewClasses.length - 1);
    //         return ;
    //     }
    // }
    if (mouseY > 50)
    {
        leetCurrentViewClass.zoomXoff += (mouseX - pmouseX) / leetCurrentViewClass.zoomSf;
        leetCurrentViewClass.zoomYoff += (mouseY - pmouseY) / leetCurrentViewClass.zoomSf;
    }
}

function isMouseIn(element)
{
    elementX = ((element.x * leetCurrentViewClass.zoomSf) + leetCurrentViewClass.zoomTx) + leetCurrentViewClass.zoomXoff * leetCurrentViewClass.zoomSf
    elementY = ((element.y * leetCurrentViewClass.zoomSf) + leetCurrentViewClass.zoomTy) + leetCurrentViewClass.zoomYoff * leetCurrentViewClass.zoomSf
    elementW = element.w * leetCurrentViewClass.zoomSf;
    elementH = element.h * leetCurrentViewClass.zoomSf;
    if (mouseX > elementX && mouseX < elementX + elementW && mouseY > elementY && mouseY < elementY + elementH)
        return (true);
    return (false);
}