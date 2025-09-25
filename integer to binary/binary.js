function binary(num) {
  let array = [];
  let condition = false;
  if (num < 0) {
    num = -num;
    condition = true;
  }
  // console.log(num)
  while (num > 0) {
    let ans = num % 2;
    num = Math.floor(num / 2);
    array.unshift(ans);
  }
  if (condition) {
    array.unshift(0);
    for (let x in array) {
      if (array[x] == 1) {
        array[x] = 0;
      } else array[x] = 1;
    }

    for (let x = array.length - 1; x > 0; x--) {
      if (array[x] == 0) {
        array[x] = 1;
        break;
      } else {
        array[x] = 0;
      }
    }
  }
  console.log(array);
}


binary(-98);
