function applyScale(s) {
    leetZoomSf = leetZoomSf * s;
    leetZoomTx = mouseX * (1-s) + leetZoomTx * s;
    leetZoomTy = mouseY * (1-s) + leetZoomTy * s;
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
}

function mousePressed()
{
    ui_clicks();
    leetCurrentViewClass.check_click();
}

function mouseWheel(event)
{
    if (event.delta > 0)
    {
        applyScale(0.9);
    }
    else if (event.delta < 0)
    {
        applyScale(1.1);
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
    if (mouseY > 50)
    {
        leetZoomXoff += (mouseX - pmouseX) / leetZoomSf;
        leetZoomYoff += (mouseY - pmouseY) / leetZoomSf;
    }
}

function isMouseIn(element)
{
    elementX = ((element.x * leetZoomSf) + leetZoomTx) + leetZoomXoff * leetZoomSf
    elementY = ((element.y * leetZoomSf) + leetZoomTy) + leetZoomYoff * leetZoomSf
    elementW = element.w * leetZoomSf;
    elementH = element.h * leetZoomSf;
    if (mouseX > elementX && mouseX < elementX + elementW && mouseY > elementY && mouseY < elementY + elementH)
        return (true);
    return (false);
}