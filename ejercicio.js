console.log("Comienza el timer con bucle for (usando let):");

// Este bucle 'for' se ejecutará 10 veces, con la variable 'i' tomando valores de 1 a 10.
for (let i = 1; i <= 10; i++) {
  // 'setTimeout' es una función asíncrona en JavaScript.
  // Programa la ejecución de una función (o un fragmento de código)
  // después de un cierto retraso en milisegundos.
  setTimeout(() => {
    // Dentro de esta función que se ejecutará con retraso,
    // mostramos el valor actual de 'i' en la consola.
    console.log(i);
  }, i * 1000); // El retraso aumenta en 1000ms (1 segundo) en cada iteración.
}

console.log("El bucle for ha terminado (esto se muestra casi inmediatamente).");

// Explicación detallada:

// 1. Sincronía del bucle 'for':
//    El bucle 'for' en sí mismo es código síncrono. Esto significa que se ejecuta
//    de forma secuencial y bloquea la ejecución de otras partes del código
//    hasta que el bucle termina. En este caso, el bucle se ejecuta rápidamente
//    y programa 10 llamadas a 'setTimeout'.

// 2. Asincronía de 'setTimeout':
//    'setTimeout' es una función asíncrona. Cuando se llama, no espera a que
//    el tiempo de retraso termine para continuar con la siguiente línea de código.
//    En cambio, registra la función callback (la función dentro de '() => { ... }')
//    y el tiempo de retraso con el motor de JavaScript y continúa con la ejecución.

// 3. Comportamiento con 'let':
//    Cuando se utiliza 'let' para declarar la variable de iteración 'i' dentro del
//    bucle 'for', cada iteración del bucle crea una nueva vinculación (una nueva
//    variable 'i' en un nuevo ámbito). Esto significa que la función callback
//    dentro de cada llamada a 'setTimeout' "recuerda" el valor de 'i' que tenía
//    en esa iteración específica del bucle. Por lo tanto, verás los números del 1 al 10
//    impresos en la consola con un retraso de un segundo entre cada uno.

// --- ¿Qué sucede si se usa 'var' en lugar de 'let'? ---

console.log("\nComienza el timer con bucle for (usando var - ¡presta atención!):");

for (var j = 1; j <= 10; j++) {
  setTimeout(() => {
    console.log(j);
  }, j * 1000);
}

console.log("El bucle for ha terminado (con var).");

// Explicación del comportamiento con 'var':

// 1. Ámbito de 'var':
//    Cuando se utiliza 'var' para declarar una variable dentro de un bucle 'for'
//    (o cualquier bloque de código que no sea una función), la variable tiene un
//    ámbito de función o global (dependiendo de dónde se declare fuera de funciones).
//    En este caso, 'j' tiene un ámbito que persiste a través de todas las iteraciones
//    del bucle.

// 2. Cierre (Closure) y 'var':
//    Las funciones callback dentro de los 'setTimeout' crean cierres sobre el entorno
//    lexical en el que fueron creadas. Sin embargo, debido al ámbito de 'var', todas
//    las funciones callback terminan cerrando sobre la *misma* variable 'j'.

// 3. Resultado con 'var':
//    Cuando los 'setTimeout' finalmente se ejecutan (después de los retrasos), el bucle
//    'for' ya habrá terminado, y el valor de 'j' será 11 (ya que el bucle continúa
//    hasta que la condición 'j <= 10' es falsa). Por lo tanto, verás el número 11
//    impreso en la consola 10 veces, con un retraso de un segundo entre cada uno.

// --- ¿Cómo corregir el comportamiento al usar 'var'? ---

console.log("\nTimer con bucle for (usando var corregido con IIFE):");

for (var k = 1; k <= 10; k++) {
  // Utilizamos una Immediately Invoked Function Expression (IIFE) para crear
  // un nuevo ámbito para cada iteración del bucle.
  (function(currentK) {
    setTimeout(() => {
      console.log(currentK);
    }, currentK * 1000);
  })(k); // Pasamos el valor actual de 'k' a la IIFE.
}

console.log("El bucle for ha terminado (con var corregido).");

// Explicación de la corrección con IIFE:

// 1. IIFE (Immediately Invoked Function Expression):
//    '(function(currentK) { ... })(k)' crea una función anónima y la ejecuta
//    inmediatamente. 'k' se pasa como argumento a esta función, y dentro de la
//    función, se recibe como el parámetro 'currentK'.

// 2. Nuevo ámbito para cada iteración:
//    Cada vez que el bucle 'for' se ejecuta, se crea una nueva instancia de la IIFE,
//    y 'currentK' se convierte en una variable local dentro de esa instancia,
//    capturando el valor de 'k' en ese momento.

// 3. Cierre sobre la variable correcta:
//    La función callback dentro de 'setTimeout' ahora cierra sobre la variable 'currentK'
//    de la IIFE en la que fue creada. Como cada IIFE tiene su propia variable 'currentK'
//    con el valor de la iteración del bucle en ese momento, cada 'setTimeout' recordará
//    el valor correcto de la cuenta.

// 4. Resultado corregido con 'var' e IIFE:
//    Verás los números del 1 al 10 impresos en la consola con un retraso de un segundo
//    entre cada uno, similar al comportamiento cuando se usa 'let'.

// Conclusión:
// El uso de 'let' en el bucle 'for' simplifica el manejo de cierres en escenarios
// asíncronos como este, ya que crea un nuevo ámbito para la variable de iteración
// en cada iteración. Con 'var', es necesario utilizar técnicas como las IIFE para
// lograr el mismo comportamiento debido a su ámbito de función.