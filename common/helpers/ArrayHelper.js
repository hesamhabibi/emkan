const { collect } = require('collect.js');

const get_children_flat = (component, all_access_components, parent_id = "parent_id", id = '_id') => {
    all_access_components = collect(all_access_components);
    const queue = [component];
    let index = 0;
    while (queue.length > index) {
        const comp = queue[index];
        const new_comp = all_access_components.
            filter((item) => { return (String(item[parent_id]) === String(comp[id])); }).all();
        if (new_comp.length > 0) {
            for (let c = 0; c < new_comp.length; c += 1) {
                let exists = false;
                for (let i = 0; i < queue.length; i += 1)
                    if (String(queue[i][id]) === String(new_comp[c][id]))
                        exists = true;
                if (!exists)
                    queue.push(...new_comp);
            }
        }
        index += 1;
        if (index > 1000) {
            console.log('out of range');
            break;
        }
    }
    return queue;
};

const arrays_equal = (a, b) => {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (!b.includes(a[i])) return false;
    }
    return true;
}

module.exports = {
    get_children_flat,
    arrays_equal,
};