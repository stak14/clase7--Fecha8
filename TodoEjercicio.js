for (let i = 1; i <= 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

for (var k = 1; k <= 10; k++) {
  (function (currentK) {
    setTimeout(() => {
      console.log(currentK);
    }, currentK * 1000);
  })(k);
}
console.log("Comienza el timer con bucle for:");
