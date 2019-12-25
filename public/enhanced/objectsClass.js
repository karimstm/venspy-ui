class leetObject {
  constructor(parsedObject, parentViewClass) {
    this.parsedObject = parsedObject;
    this.parentViewClass = parentViewClass;

    // analysing the name to find graphs

    let name_parts = get_value_or_default(parsedObject.name, "").split(",");
    this.name = name_parts[0];
    if (name_parts.length > 1) this.componentType = name_parts[1];
    if (parsedObject.oldname) {
      if (!isNaN(this.name)) {
        this.componentType = parsedObject.oldname;
        this.name = "";
      }
    }

    // just parsing the plain data

    this.type = parsedObject.type;
    this.id = get_value_or_default(parsedObject.id, null);
    if (this.id === null) {
      if (leetDebugMode === true)
        console.log("the following object is without id : ", parsedObject);
      return null;
    }
    this.w = get_value_or_default(parsedObject.w, null);
    this.h = get_value_or_default(parsedObject.h, null);
    this.x = get_value_or_default(parsedObject.x, null);
    this.y = get_value_or_default(parsedObject.y, null);
    this.shape = get_value_or_default(parsedObject.shape, null);
    // getting the type and product

    this.iconType = null;
    this.iconProduct = null;
    get_type_and_product(this);
    if (this.iconType) {
      this.image = leetComponentImages[this.iconType];
      this.h = Math.min(this.w, this.h);
      this.w = this.h;
    }
    if (this.iconProduct)
      this.productImage = leetComponentImages[this.iconProduct];

    // getting an icon for the elements

    // if (this.componentType)
    // {
    //     this.image = get_leetobject_icon(this.componentType, this.shape);
    //     if (!this.image)
    //         this.image = get_leetobject_icon(this.name, this.shape);
    // }
    // else
    //     this.image = get_leetobject_icon(this.name, this.shape);
    // if (this.image)
    // {
    //     this.w = Math.min(this.w, this.h);
    //     this.h = this.w;
    // }

    // small verification of element coordinates

    if (
      this.w === null ||
      this.h === null ||
      this.x === null ||
      this.y === null ||
      this.shape == null ||
      isNaN(this.w) ||
      isNaN(this.h) ||
      isNaN(this.x) ||
      isNaN(this.y) ||
      isNaN(this.shape)
    ) {
      if (leetDebugMode === true)
        console.log(
          "the following object has unvalid coordinates or shape : ",
          parsedObject
        );
    }

    // loading the rest of the properties

    this.hidden = parsedObject.hidden;
    this.hasFont = parsedObject.hasFont;
    this.textPosRelative = get_value_or_default(
      parsedObject.textPosRelative,
      0
    );
    //////////////////////////////////////// this is a debug and test thing
    this.textPosRelative = 0;
    //////////////////////////////////////// this is a test thing
    this.boxWidth = get_value_or_default(parsedObject.boxWidth);
    this.nav1 = get_value_or_default(parsedObject.nav1, 0);
    this.nav2 = get_value_or_default(parsedObject.nav2, 0);

    // Separating the bits into different boolean values

    this.is_io = parsedObject.bits & (1 << 3) ? true : false;

    // Loading colors

    this.wordColor = get_color_or_default(
      get_color_or_default(parsedObject.fontColor, parsedObject.boxColor),
      parentViewClass.fontColor
    );
    this.fillColor = get_color_or_default(parsedObject.fillColor, [
      0x2c,
      0x2c,
      0x2c
    ]);

    // More processing to simplify things

    this.hovered = false;
    this.fontSize = parentViewClass.fontSize;
    let text_offset = [
      [0, 0],
      [0, this.h],
      [-this.w, 0],
      [0, -this.h],
      [this.w, 0]
    ];
    let current_offset = text_offset[0];
    if (this.textPosRelative < 5 && this.textPosRelative >= 0)
      current_offset = text_offset[this.textPosRelative];
    this.isClickable = this.nav2 === 0 ? true : false;
    this.clickTargetView = this.isClickable ? this.nav1 : 0;
    if (isNaN(this.clickTargetView) || this.clickTargetView == 0)
      this.isClickable = false;
    this.textBox = [
      this.x + current_offset[0],
      this.y + current_offset[1],
      this.w,
      this.h
    ];
  }

  draw() {
    // debug mode with all background white and borders black
    if (leetDebugDrawMode) return this.debug_draw();
    if (this.image) return this.draw_icon();
    return this.alternative_draw_mode();
    push();
    // changing the box fill color
    fill(...this.fillColor);
    // drawing the box
    if (this.shape == 40) fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    // changing the text color
    fill(...this.wordColor);
    // aligning the text
    textAlign(CENTER, CENTER);
    // drawing the text
    text(this.name, ...this.textBox);
    pop();
  }

  alternative_draw_mode() {
    push();
    noStroke();
    // if this is hovered, display it in a lighter color
    if (this.hovered && this.isClickable) fill(0x45, 0x45, 0x45);
    else fill(...this.fillColor);
    //fill(0x2c, 0x2c, 0x2c);
    // draw the element background reclangle
    rect(this.x, this.y, this.w, this.h);
    // check if the object is inside the box to give it a light color
    if (this.textPosRelative <= 0 || this.textPosRelative > 4)
      fill(...this.wordColor);
    else fill(...this.wordColor);
    //fill(0x2c, 0x2c, 0x2c);
    textStyle(BOLD);
    textSize(this.fontSize);
    // check if the object can fit inside the object in terms of height
    if (
      (this.textPosRelative <= 0 || this.textPosRelative > 4) &&
      2 * this.fontSize > this.h
    ) {
      textAlign(CENTER);
      let margin = (this.h - this.fontSize) / 2;
      if (margin < 0) margin = 0;
      text(this.name, this.x, this.y + margin, this.w, this.h);
    } else {
      textAlign(CENTER, CENTER);
      text(this.name, ...this.textBox);
    }
    pop();
  }

  draw_icon() {
    push();
    // drawing the image
    image(this.image, this.x, this.y, this.w, this.h);
    if (this.componentType == "Graph")
      image(
        leetComponentImages["Graph"],
        this.x,
        this.y + (3 * this.h) / 4 - this.fontSize,
        this.w / 4,
        this.h / 4
      );
    fill(0x2c, 0x2c, 0x2c);
    //rect(this.x - 2, this.y + this.h / 2 - this.fontSize - 2, this.w + 4, this.fontSize + 4, 5);
    // changing the text color
    //fill(255, 255, 255);
    // adding the text
    textSize(Math.min(this.fontSize, this.h * 0.2));
    textStyle(BOLD);
    textAlign(CENTER);
    // check if there is enough space to fit the name of the object
    if (this.fontSize > this.h * 0.2) {
      /*textAlign(CENTER, CENTER);
            fill(0x2c, 0x2c, 0x2c, 100);
            rect(this.x, this.y, this.w, this.h, 3);
            fill(0xFA, 0xFA, 0xFA);
            text(this.name, this.x, this.y, this.w, this.h);*/
    } else {
      rect(
        this.x,
        this.y + this.h - this.fontSize - 2,
        this.w,
        this.fontSize + 4
      );
      fill(0xe5, 0xe5, 0xe5);
      text(
        this.name,
        this.x,
        this.y + this.h - this.fontSize,
        this.w,
        this.fontSize + 4
      );
    }
    pop();
  }

  debug_draw() {
    push();
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(this.name, ...this.textBox);
    pop();
  }

  is_clicked() {
    return isMouseIn(this);
  }

  click() {
    if (
      this.isClickable &&
      !isNaN(this.clickTargetView) &&
      this.clickTargetView != 0
    )
      switchLeetView(this.clickTargetView - 1);
    if (leetDebugMode === true) console.log("Clicked on element : ", this);
  }
}
