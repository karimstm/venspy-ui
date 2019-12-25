class leetView
{
    constructor(parsedView)
    {
        this.name = get_value_or_default(parsedView.name, "unnamed");
        this.arrowColor = get_value_or_default(parsedView.iniarrow, [0, 0, 0]);
        this.font = 'Roboto Mono';
        this.fontSize = get_value_or_default(parsedView.fontsize, 12) * 1.33;
        this.fontColor = get_value_or_default(parsedView.fontColor, [0, 0, 0]);
        this.shapeColor = get_value_or_default(parsedView.shapeColor, [100, 100, 100]);
        this.arrowColor = get_value_or_default(parsedView.arrowColor, [0, 0, 255]);
        this.backgroundColor = get_value_or_default(parsedView.backgroundColor, [0xe5, 0xe5, 0xe5]);
        this.children = []
        this.minX = 10000;
        this.maxX = -10000;
        this.minY = 10000;
        this.maxY = -10000;
        this.zoomSf = null;
        this.zoomTx = null;
        this.zoomTy = null;
        this.zoomXoff = 0;
        this.zoomYoff = 0;
    }

    push_object(new_child)
    {
        if (new_child instanceof leetObject)
        {
            this.minX = Math.min(this.minX, new_child.x);
            this.maxX = Math.max(this.maxX, new_child.x);
            this.minY = Math.min(this.minY, new_child.y);
            this.maxY = Math.max(this.maxY, new_child.y);
        }
        if (new_child !== null && new_child !== undefined)
            this.children.push(new_child);
        return (new_child);
    }

    draw_children()
    {
        for (var i = 0; i < this.children.length; i++)
            this.children[i].draw();
    }

    draw()
    {
        push();
        background(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        textFont(this.font);
        textSize(this.fontSize);
        this.draw_children();
        leet_draw_tooltip(leetCurrentHoveredObject);
        pop();
    }

    check_click()
    {
        for (var i = 0; i < this.children.length; i++)
        {
            current = this.children[i];
            if (current.type != 1 && current.is_clicked())
                return (current.click());
        }
    }
}