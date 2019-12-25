function get_value_or_default(value, def)
{
    if (value === null || value === undefined)
        return (def);
    return (value);
}

function get_color_or_default(value, def)
{
    if (value === null || value === undefined || value.length !== 3)
        return (def);
    return (value);
}

function preloadCallback()
{
    leetLoadedComponents++;
    if (leetLoadedComponents >= Object.keys(leetComponentImages).length)
        leetLoadedComponents = true;
}

function preloadComponentIcons()
{
    var componentURLS = {
        'logo' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/logo.png?token=AKNCIS634Z3MMRPCINE2LHC547ANW',
        'Graph' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/graph.png?token=AKNCIS5AUF6JUMU7Z4WXPY254ZZTQ',
        '48' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/cloud.png?token=AKNCIS6PGXAMUEOBQGYJ2MS54Z4B4',
        '2312' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/transfer.png?token=AKNCISYX2XVNLI5I5RL74IC54UJDQ',
        'besoin' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/coal.png?token=AKNCIS7365YJFBV6XNBEWQS54UJF2',
        'production' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/manufacture.png?token=AKNCIS44QAMKB7KAF64OBVC54UJHQ',
        'stock_solide' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/warehouse.png?token=AKNCIS5W6O54KSDZY76CYX254UJI2',
        'transfert' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/transfer.png?token=AKNCISYX2XVNLI5I5RL74IC54UJDQ',
        'arrowDown' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/arrow-down.png?token=AKNCIS7EG4N3TAXLC56LDKC54URAW',
        'home' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/home.png?token=AKNCIS77OKGWB2EYHOW424254ZDWA',
        'return' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/return.png?token=AKNCIS6Q7BPUQ4C3GXSZGJ254ZDYO',
        'pump' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/pump.png?token=AKNCISYQSJ4WTMTR3YIO3XS54ZM5K',
        'water' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/drop.png?token=AKNCISYJGHMRX3BNJK2L3IK54ZNN4',
        'stock_liquide' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/tank.png?token=AKNCIS73HGX62AAEJB5BNZC54ZQ76',
        'sulfur' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/sulfur.png?token=AKNCIS7U6NUDXWE5BX66MLC54ZRIM',
        'factory' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/factory.png?token=AKNCIS2MPEBKWKWSG7IU7IC54Z24W',
        'pulpe' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/slime.png?token=AKNCIS6UPQQDTLWTHSBLO2S546CSO',
        'center' : 'https://raw.githubusercontent.com/KernelOverseer/vensim_mdl_sketcher/master/visualizer/center.png?token=AKNCIS5GNJP5WNJSZYQPHDS55DBX2',
       // 'skyTEST' : 'https://effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg'
}
    var result = {}

    Object.keys(componentURLS).forEach((key)=>{
        result[key] = loadImage(componentURLS[key], preloadCallback);
    })
    return (result);
}

function mouse_in_box(element)
{
    if (mouseX > element.x && mouseY > element.y && mouseX < element.x + element.w && mouseY < element.y + element.h)
        return (true);
    return (false);
}

function get_object_by_id(objectList, id)
{
    for (let i = 0; i < objectList.length; i++)
    {
        if (objectList[i].id === id)
            return (objectList[i]);
    }
    return (null);
}

function get_component_image(componentName)
{
    if (leetComponentImages[componentName] !== undefined)
        return (leetComponentImages[componentName]);
    return (false);
}