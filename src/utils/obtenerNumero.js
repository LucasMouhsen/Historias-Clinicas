module.exports = obtenerNumeros = (str) => {
  const numeros = str.match(/\d+/g);
  return numeros ? numeros.join('') : '';
};
