class leetArrow
{
    constructor(parsedArrow, parentViewClass, objectsList)
    {
        this.id = get_value_or_default(parsedArrow.id, -1);
        this.type = get_value_or_default(parsedArrow.type, 0);
        this.from = get_object_by_id(objectsList, parsedArrow.fromId);
        this.to = get_object_by_id(objectsList, parsedArrow.toId);
        if (!this.from || !this.to)
        {
            if (leetDebugMode === true)
                console.log('Arrow with id is linked to unknown objects with id\'s and viewName', this.id, parsedArrow.fromId, parsedArrow.toId, parentViewClass.name);
            throw "Arrow has no from or to object";
        }
        if (isNaN(this.from.x) || isNaN(this.from.y) || isNaN(this.to.x) || isNaN(this.to.y))
        {
            if (leetDebugMode === true)
                console.log('Arrow can\'t get x and y from target objects with id\'s', parsedArrow.fromId, parsedArrow.toId);
            throw "Arrow has no target object coordinates";
        }
        this.weight = Math.max(get_value_or_default(parsedArrow.thickness, 1), 1);
        this.hidden = get_value_or_default(parsedArrow.hidden, false) ? true : false;
        this.polarity = get_value_or_default(parsedArrow.polarity, 0);
        this.delayType = get_value_or_default(parsedArrow.delayType, 0);
        this.color = get_value_or_default(parsedArrow.color, parentViewClass.arrowColor);
        this.font = get_value_or_default(parsedArrow.font, parentViewClass.font);
        this.pointsNumber = get_value_or_default(parsedArrow.pointsNumber);
        this.pointsList = get_value_or_default(parsedArrow.pointslist, []);
        this.corner = get_best_corners(this.from, this.to);
        this.baseVec = createVector(this.corner[0][0], this.corner[0][1]);
        this.vec = createVector(this.corner[1][0], this.corner[1][1]).sub(this.baseVec);
        this.interPoint = null;
        if (this.pointsList[0])
            this.interPoint = createVector(this.pointsList[0][0], this.pointsList[0][1]).sub(this.baseVec);
    }

    draw()
    {
        push();
        push();
        fill(0, 255, 0);
        stroke(0, 255, 0);
        pop();
        if (!this.color)
            console.log(this);
        fill(this.color[0], this.color[1], this.color[2]);
        stroke(this.color[0], this.color[1], this.color[2]);
        if (this.weight > 20)
        {
            strokeWeight(this.weight - 20);
            drawArrow(this.baseVec, this.vec, this.interPoint);
        }
        else
        {
            strokeWeight(this.weight);
            drawArrow(this.baseVec, this.vec, this.interPoint);
        }
        pop();
    }
}

function drawArrow(base, vec, interPoint)
{
    push();
    translate(base.x, base.y);
    stroke(0, 0, 0, 150);
    fill(0, 0, 0, 150);
    if (interPoint)
    {
        noFill();
        curve(0, 0, 0, 0, interPoint.x, interPoint.y, vec.x, vec.y);
        curve(0, 0, interPoint.x, interPoint.y, vec.x, vec.y, vec.x, vec.y);
    }
    else
    {
        line(0, 0, vec.x, vec.y);
    }
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    fill(0x45, 0x45, 0x45);
    stroke(0x45, 0x45, 0x45);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function drawDoubleArrow(base, vec)
{
    push();
    translate(base.x, base.y);
    line(-3, 0, vec.x - 3, vec.y);
    line(3, 0, vec.x + 3, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function get_corners(element)
{
        return ([
            [element.x, element.y],
            [element.x + element.w, element.y],
            [element.x, element.y + element.h],
            [element.x + element.w, element.y + element.h],
            [element.x + element.w/2, element.y],
            [element.x + element.w/2, element.y + element.h],
            [element.x, element.y + element.h/2],
            [element.x + element.w, element.y + element.h/2]]
            );
}

function get_best_corners(from, to)
{
    from_corners = get_corners(from);
    to_corners = get_corners(to);
    best_from = from_corners[0];
    best_to = to_corners[0];
    best_dist = 10000;
    for (var index = 0; index < from_corners.length; index++)
    {
        for (var jndex = 0; jndex < to_corners.length; jndex++)
        {
            new_dist = dist(from_corners[index][0], from_corners[index][1], to_corners[jndex][0], to_corners[jndex][1])
            if (new_dist < best_dist)
            {
                best_from = from_corners[index];
                best_to = to_corners[jndex];
                best_dist = new_dist;
            }
        }
    }
    return ([best_from, best_to]);
}
