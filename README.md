# emvqr
Javascript library to parse EMV QR codes based on [@walletfactory/emvqr](https://www.npmjs.com/package/@walletfactory/emvqr/v/0.1.1) package.

## how to use
```
const emvqr = require('@steplix/emvqr');

const example = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';

const result = emvqr.decode(example);
console.log('result', result);
//  => result {
//   '29': {
//     id: '29',
//     name: 'Merchant Account Information',
//     len: 30,
//     data: { '00': [Object], '05': [Object] }
//   },
//   '31': {
//     id: '31',
//     name: 'Merchant Account Information',
//     len: 28,
//     data: { '00': [Object], '03': [Object] }
//   },
//   '52': { id: '52', name: 'Merchant Category Code', len: 4, data: '4111' },
//   '53': { id: '53', name: 'Transaction Currency', len: 3, data: '156' },
//   '54': { id: '54', name: 'Transaction Amount', len: 5, data: '23.72' },
//   '55': {
//     id: '55',
//     name: 'Tip or Convenience Indicator',
//     len: 2,
//     data: '01'
//   },
//   '58': { id: '58', name: 'Country Code', len: 2, data: 'CN' },
//   '59': { id: '59', name: 'Merchant Name', len: 14, data: 'BEST TRANSPORT' },
//   '60': { id: '60', name: 'Merchant City', len: 7, data: 'BEIJING' },
//   '62': {
//     id: '62',
//     name: 'Additional Data Field Template',
//     len: 33,
//     data: '030412340603***0708A60086670902ME'
//   },
//   '63': { id: '63', name: 'CRC', len: 4, data: 'A13A' },
//   '64': {
//     id: '64',
//     name: 'Merchant Information— Language Template',
//     len: 20,
//     data: '0002ZH0104最佳运输0202北京'
//   },
//   '91': {
//     id: '91',
//     name: 'Unreserved Templates',
//     len: 32,
//     data: '0016A011223344998877070812345678'
//   },
//   '00': { id: '00', name: 'Payload Format Indicator', len: 2, data: '01' },
//   '01': { id: '01', name: 'Point of Initiation Method', len: 2, data: '12' }
// }
```

Result can be also decoded into `small` format

```
const emvqr = require('@steplix/emvqr');

const example = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';

const result = emvqr.decode(example,false);
console.log('result', result);
// => result {
//   '29': { '00': 'D15600000000', '05': 'A93FO3230Q' },
//   '31': { '00': 'D15600000001', '03': '12345678' },
//   '52': '4111',
//   '53': '156',
//   '54': '23.72',
//   '55': '01',
//   '58': 'CN',
//   '59': 'BEST TRANSPORT',
//   '60': 'BEIJING',
//   '62': '030412340603***0708A60086670902ME',
//   '63': 'A13A',
//   '64': '0002ZH0104最佳运输0202北京',
//   '91': '0016A011223344998877070812345678',
//   '00': '01',
//   '01': '12'
// }
```