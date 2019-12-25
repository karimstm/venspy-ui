var leetDropDownStatus = {active: false, hovered: false, button: null, offset : 0, scrollAccu : 0.0};
var leetDropDownButtons = [];
var leetUiButtons = [];

class   leetUiButton
{
    constructor(name, clickHandler, hoverHandler, args, x, y, w, h, display, font, fontSize, color, textColor, active)
    {
        this.name = name;
        this.clickHandler = clickHandler;
        this.hoverHandler = hoverHandler;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.args = args;
        this.display = get_value_or_default(display, true);
        this.font = get_value_or_default(font, 'Roboto Mono');
        this.fontSize = get_value_or_default(fontSize, 14);
        this.color = get_color_or_default(color, [0x2c, 0x2c, 0x2c]);
        this.backupColor = this.color;
        this.textColor = get_color_or_default(textColor, [255, 255, 255]);
        this.hovered = false;
        this.active = get_value_or_default(active, true);
        leetUiButtons.push(this);
    }

    draw()
    {
        if (typeof(this.name) != 'string')
            return (this.draw_image());
        push();
        noStroke();
        fill(...this.color);
        rect(this.x, this.y, this.w, this.h);
        fill(...this.textColor);
        textAlign(CENTER, CENTER);
        textFont(this.font);
        textSize(this.fontSize);
        text(this.name, this.x, this.y, this.w, this.h);
        pop();
    }

    draw_image()
    {
        push();
        if (this.hovered && this.active)
        {
            fill(0x45, 0x45, 0x45);
            rect(this.x, this.y, this.w, this.h);
        }
        if (!this.active)
            tint(255, 127);
        image(this.name, this.x + this.w * 0.3, this.y + this.h * 0.3, this.w - this.w * 0.6, this.h - this.h * 0.6);
        pop();
    }

    click()
    {
        console.log("clicked on button ", this);
        if (this.clickHandler)
            this.clickHandler(this);
    }

    hover()
    {
        if (this.hoverHandler)
            this.hoverHandler(this);
    }

    is_mouse_in()
    {
        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.w && mouseY < this.y + this.h)
            return (true);
        return (false);
    }
}

/////////////

function leet_draw_navbar()
{
    push();
    noStroke();
    fill(0x2c, 0x2c, 0x2c);
    rect(0, 0, width, 50);
    let logoWidth = 50 / 1.2749;
    let margin = (50 - logoWidth) / 2;
    let logoHeight = 50;
    image(leetComponentImages['logo'], width - 50 + margin - 10, height - logoHeight - 10, logoWidth, logoHeight);
    pop();
}

function leet_draw_ui()
{
    leet_draw_navbar();
    for(var i = 0; i < leetUiButtons.length; i++)
    {
        if (leetUiButtons[i].display)
            leetUiButtons[i].draw();
    }
}

function init_leet_ui()
{
    let dropDownButton = new leetUiButton('', null, null, null, width/2 - 100, 0, 220, 50);
// creating the home button
    //new leetUiButton(leetComponentImages['home'], ()=>{switchLeetView(0);}, null, null, 0, 0, 50, 50);
    new leetUiButton(leetComponentImages['home'], ()=>{window.location.replace('http://localhost:3000');}, null, null, 0, 0, 50, 50);
// creating the return button
    new leetUiButton(leetComponentImages['return'], ()=>{switchLeetView(-1);}, null, null, 50, 0, 50, 50);
// creating the center button
    new leetUiButton(leetComponentImages['center'], ()=>{centerScene();}, null, null, width - 50, 0, 50, 50);
    dropDownButton.draw = DropDownButtonDraw;
    leetDropDownStatus.button = dropDownButton;
    for (var i = 0; i < leetViewClasses.length; i++)
        leetDropDownButtons.push(new leetUiButton(leetViewClasses[i].name, DropDownElementClickHandler, DropDownElementHoverHandler, {classId: i}, width/2 - 110, 50 + 50*i, 240, 50, false));
}

function ui_mouseWheel(delta)
{
    return (dropDownMouseWheel(delta));
}

function ui_clicks()
{
    let oldvalue = leetDropDownStatus.active;
    if (leetDropDownStatus.button.is_mouse_in())
        leetDropDownStatus.active = leetDropDownStatus.active ? false : true;
    if (oldvalue == leetDropDownStatus.active && !mouse_in_box(sliderBox()))
        leetDropDownStatus.active = false;
    for (var i = 0; i < leetUiButtons.length; i++)
    {
        if (leetUiButtons[i].display == true && leetUiButtons[i].is_mouse_in())
            leetUiButtons[i].click();
    }
}

function ui_hovers()
{
    if (document.body.style.cursor == "pointer")
        document.body.style.cursor = "default";
    leetDropDownStatus.hovered = false;
    leetCurrentHoveredObject = null;
    if (leetDropDownStatus.button.is_mouse_in())
    {
        document.body.style.cursor = "pointer";
        leetDropDownStatus.hovered = true;
    }
    for (var i = 0; i < leetUiButtons.length; i++)
    {
        if (leetUiButtons[i].display == true && leetUiButtons[i].is_mouse_in())
        {
            document.body.style.cursor = "pointer";
            if (leetUiButtons[i].hovered == false)
            {
                leetUiButtons[i].hovered = true;
                leetUiButtons[i].hover();
            }
        }
        else if (leetUiButtons[i].hovered)
        {
            leetUiButtons[i].hovered = false;
            leetUiButtons[i].hover();
        }
    }
    for (var i = 0; i < leetCurrentViewClass.children.length; i++)
    {
        current = leetCurrentViewClass.children[i];
        current.hovered = false;
        if (current.is_clicked && current.is_clicked())
        {
            if (current.isClickable)
                document.body.style.cursor = "pointer";
            current.hovered = true;
            leetCurrentHoveredObject = current;
        }
    }
}

function leet_draw_tooltip(element)
{
    if (!element)
        return ;
    if (!element.name || element.name.length == 0)
        return ;
    let popWidth = element.name.length * 16 + 10;
    let popHeight = 32;
    let popX = element.x + element.w/2 - popWidth / 2;
    let popY = element.y - 10 - popHeight;
    push();
    noStroke();
    fill(0x2c, 0x2c, 0x2c);
    rect(popX, popY, popWidth, popHeight);
    triangle(popX + popWidth / 2, element.y, popX + popWidth / 2 - 5, popY + popHeight, popX + popWidth / 2 + 5, popY + popHeight);
    textSize(16);
    fill(0xe5, 0xe5, 0xe5);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(element.name, popX, popY, popWidth, popHeight);
    pop();
}