function get_leetobject_icon(name, shape)
{
    if (!isNaN(name))
    {
        if (leetComponentImages[name])
            return (leetComponentImages[name]);
    }
    let name_part = name.split(' ');

    for (let i = 0; i < name_part.length; i++)
    {
       name_part[i] = name_part[i].toLowerCase();
        name_part[i] = name_part[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    if (name_part.includes("stock") || name_part.includes("transfere"))
    {
        if (name_part.includes("liquide") || name_part.includes("liquid"))
            return (leetComponentImages['tank']);
        return (leetComponentImages['stock']);
    }
    if (name_part.includes("besoin"))
        return (leetComponentImages['besoin']);
    if (name_part.includes("production") || name_part.includes("preparation"))
        return (leetComponentImages['production']);
    if (name_part.includes("consommation") && name_part.includes("eau"))
        return (leetComponentImages['pump']);
    if (name_part.includes("eau"))
        return (leetComponentImages['water']);
    if (name_part.includes("acs") || name_part.includes("acp") || name_part.includes("acp29") || name_part.includes("acp54"))
        return (leetComponentImages['tank']);
    if (name_part.includes("soufre") && !name_part.includes("liquide"))
        return (leetComponentImages['sulfur']);
    if (name_part.includes("soufre") && name_part.includes("liquide"))
        return (leetComponentImages['tank']);
    if (name_part.includes("pulpe"))
        return (leetComponentImages['pulpe']);
    if (name_part.includes("bp"))
        return (leetComponentImages['besoin']);
    if (name_part.includes("pmp"))
        return (leetComponentImages['factory']);
    return (null);
}

let leetComponentTypeTable = [
    { type : "stock_liquide", in_name : [['stock'], ['liquide']] },
    { type : "stock_solide", in_name : [['stock']], not_in_name : [['liquide']] },
    { type : "production", in_name : [['production']], shape : [38,] },
    { type : "transfert", in_name : [['transfert']], shape : [34,] }
];

// let leetComponentTypeTable = [
// ]

function expression_in_list(or_names, name_parts)
{
    for (var i = 0; i < name_parts.length; i++)
    {
        this_name = name_parts[i];
        for (var j = 0; j < or_names.length; j++)
        {
            if (this_name.match(or_names[j]))
                return (true);
        }
    }
    return (false);
}

function ft_in_name_applies(in_name, name_parts)
{
    if (!in_name)
        return (true);
    for (var index = 0; index < in_name.length; index++)
    {
        or_names = in_name[index];
        if (!expression_in_list(or_names, name_parts))
            return (false);
    }
    return (true);
}

function ft_not_in_name_applies(not_in_name, name_parts)
{
    if (!not_in_name)
        return (true);
    if (expression_in_list(not_in_name, name_parts))
        return (false);
    return (true);
}

function ft_in_shapes_applies(shapes, shape)
{
    if (!shapes)
        return (false);
    for (var i = 0; i < shapes.length; i++)
    {
        if (shapes[i] == shape)
            return (true);
    }
    return (false);
}

function process_conditions(element, conditions)
{
    let result = null;
    name_parts = element.name.split(' ');
    for (let i = 0; i < name_parts.length; i++)
    {
       name_parts[i] = name_parts[i].toLowerCase();
        name_parts[i] = name_parts[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    let status = false;
    for (var i = 0; i < conditions.length && status == false; i++)
    {
        //  Now comparing in_name parts
        let in_name = conditions[i].in_name;
        let not_in_name = conditions[i].not_in_name;
        let shapes = conditions[i].shape;
        if ((ft_in_name_applies(in_name, name_parts) && ft_not_in_name_applies(not_in_name, name_parts)) || ft_in_shapes_applies(shapes, element.shape))
        {
            status = true;
            result = conditions[i].type;
        }
    }
    if (status)
        return (result);
    else
        return (null);
}

function get_type_and_product(element)
{
    let result = process_conditions(element, leetComponentTypeTable);
    element.iconType = result;
}