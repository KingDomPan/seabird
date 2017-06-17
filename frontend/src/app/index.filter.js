export function encode() {

  return function (value) {
    if (!value) {
      return '';
    }
    var encodeValue = encodeURIComponent(value) || '';
    return encodeValue.replace(/%/g, '');
  };

}

export function boolean() {

  return function (value) {
    if (1 == value || value == true || value == 'YES' || value == 'yes') {
      return '是';
    }
    if (0 == value || value == false || value == 'NO' || value == 'no') {
      return '否';
    }
    return '';
  }
  
}
