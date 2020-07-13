const crc = require('./crc');
const { getTag, getSubTag } = require('./scheme');

const validate = text => {
    const data = text.substring(0, text.length - 4);
    const checksum = text.substring(text.length - 4);

    const hash = crc.computeCRC(data);
    return hash === checksum;
};

const read = (text, describe, tagId) => {
    const id = text.substring(0, 2);
    const len = parseInt(text.substring(2, 4));
    let data = text.substring(4, len + 4);
    const next = text.substring(len + 4);

    if (!len || !data.length || len !== data.length) {
        return {};
    }

    const tag = getTag(id);
    if (!tagId && !tag) {
        return {};
    }

    const subtag = getSubTag(tagId, id);
    if (tagId && !subtag) {
        return {};
    }

    const subdata = read(data, describe, id);

    if (Object.keys(subdata).length) {
        data = subdata;
    }

    let value = {};
    if (describe) {
        value = {
            id,
            name: subtag ? subtag.name : tag.name,
            len,
            data,
        };
    }
    else {
        value = data;
    }

    if (next.length) {
        return {
            [id]: value,
            ...read(next, describe, tagId),
        };
    }
    else {
        return {
            [id]: value,
        };
    }
};

const decode = (text, tiny = false) => {
    if (!validate(text)) {
        throw new Error('Checksum validation failed.');
    }

    return read(text, !tiny);
};

module.exports = {
    decode,
    validate,
};
