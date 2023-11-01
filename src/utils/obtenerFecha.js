module.exports = function obtenerFecha(fechaString) {
  const fecha = new Date(fechaString);
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('default', { month: 'long' });
  const año = fecha.getFullYear();

  return `${dia} de ${mes} de ${año}`;
};

/* obtenerFecha('Thu Feb 06 1997 21:00:00 GMT-0300 (hora estándar de Argentina)') */
