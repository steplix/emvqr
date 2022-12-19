const scheme = {
    '00': {
        name: 'Payload Format Indicator',
    },
    '01': {
        name: 'Point of Initiation Method',
    },
    '02-51': {
        name: 'Merchant Account Information',
        scheme: {
            '00': {
                name: 'Globally Unique Identifier',
            },
            '01-63': {
                name: 'Context Specific Data',
            },
            '98': {
                name: 'Globally Unique Identifier',
            },
            '99': {
                name: 'Globally Unique Identifier',
            },
        }
    },
    52: {
        name: 'Merchant Category Code',
    },
    53: {
        name: 'Transaction Currency',
    },
    54: {
        name: 'Transaction Amount',
    },
    55: {
        name: 'Tip or Convenience Indicator',
    },
    56: {
        name: 'Value of Convenience Fee Fixed',
    },
    57: {
        name: 'Value of Convenience Fee Percentage',
    },
    58: {
        name: 'Country Code',
    },
    59: {
        name: 'Merchant Name',
    },
    60: {
        name: 'Merchant City',
    },
    61: {
        name: 'Postal Code',
    },
    62: {
        name: 'Additional Data Field Template',
        scheme: {
            '01': {
                name: 'Additional Data Field',
            },
            '03': {
                name: 'Additional Data Field',
            },
            '05': {
                name: 'Additional Data Field',
            },
            '07': {
                name: 'Additional Data Field',
            },
            '08': {
                name: 'Additional Data Field',
            },
        }
    },
    63: {
        name: 'CRC',
    },
    64: {
        name: 'Merchant Information— Language Template',
    },
    '65-79': {
        name: 'RFU for EMVCo',
    },
    '80-99': {
        name: 'Unreserved Templates',
    },
};

const getTag = (tagId) => {
    const tag = scheme[tagId];

    if (!tag) {
        const id = parseInt(tagId);

        switch (true) {
        case id >= 2 && id <= 51:
            return scheme['02-51'];
        case id >= 65 && id <= 79:
            return scheme['65-79'];
        case id >= 80 && id <= 99:
            return scheme['80-99'];

        default:
            return;
        }
    }

    return tag;
};

const getSubTag = (tagId, subTagid) => {
    const tag = getTag(tagId);

    if (!tag || !tag.scheme) {
        return;
    }

    const subTag = tag.scheme[subTagid];

    if (!subTag) {
        const id = parseInt(subTagid);

        switch (true) {
        case id >= 1 && id <= 63:
            return tag.scheme['01-63'];
        case id >= 2 && id <= 51:
            return tag.scheme['02-51'];
        case id >= 65 && id <= 79:
            return tag.scheme['65-79'];
        case id >= 80 && id <= 99:
            return tag.scheme['80-99'];
        default:
            return;
        }
    }

    return subTag;
};

module.exports = {
    getTag,
    getSubTag
};
