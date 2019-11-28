
var leetDebugMode = true;
var leetDebugDrawMode = false;
var leetViewClasses;
var leetCurrentViewClassIndex = 0;
var leetCurrentViewClass;
var leetViewClassesHistory = [];
let leetZoomSf = 1, leetZoomTx = 0, leetZoomTy = 0;
let leetZoomXoff = 0, leetZoomYoff = 0;
var leetComponentImages;
var leetCurrentHoveredObject = null;

function preload()
{
    leetComponentImages = preloadComponentIcons();
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    leetViewClasses = [];
    for (var index = 0; index < data.length; index++)
    {
        newView = new leetView(data[index]);
        leetViewClasses.push(newView);
        current = data[index].children;
        for (var jndex = 0; jndex < current.length; jndex++)
        {
            if (current[jndex].type != 1)
            {
                try
                {
                    newView.push_object(new leetObject(current[jndex], newView));
                }
                catch (e)
                {
                    if (leetDebugMode)
                        console.log(e);
                }
            }
        }
        for (var jndex = 0; jndex < current.length; jndex++)
        {
            if (current[jndex].type == 1)
            {
                try
                {
                    newView.push_object(new leetArrow(current[jndex], newView, newView.children));
                }
                catch (e)
                {
                    if (leetDebugMode)
                        console.log(e);
                }
            }
        }
    }
    switchLeetView(0);
    leetViewClassesHistory = [];
    init_leet_ui();
}

function draw()
{
    ui_hovers();
    push();
    translate(leetZoomTx, leetZoomTy);
    scale(leetZoomSf);
    translate(leetZoomXoff, leetZoomYoff);
    leetCurrentViewClass.draw();
    pop();
    leet_draw_ui();
}