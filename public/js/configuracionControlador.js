// ruta al controlador

router.get('/presentaciones/list/:desde/:hasta/:actividades/:cuenta/:cuit/:pagado/:eximido', middleware.isAuth(), presentacionesController.listAnio);

// función controlador
exports.listAnio = async (req, res) => {
  const conn = require('knex')(req.db_tasas);
  const desde = parseInt(req.params.desde);
  const hasta = parseInt(req.params.hasta);
  try {
    const list = await listAnio(conn, desde, hasta, req);
    return res.json(list);
  }
  catch (e) { res.status(400).send({ error: true, message: e.message }) }
  finally { conn.destroy() }
};

async function listAnio(conn, desde, hasta, request) {
  var start = request.query.start;
  var query_length = request.query.length;
  var draw = request.query.draw;
  var order_data = request.query.order;
  //orden de los datos
  if (typeof order_data == 'undefined' || (order_data[0]['column'] == 0 && order_data[0]['dir'] == 'asc')) {
    var column_sort_order = 'ASC';
    var data_order = [
      { column: "ANIO", order: column_sort_order },
      { column: "CUOTA", order: column_sort_order }
    ];

  }
  else {
    var column_index = order_data[0]['column'];

    var column_name = request.query.columns[column_index]['data'];

    var column_sort_order = order_data[0]['dir'];
    if (column_name == "ANIO") {
      var data_order = [{ column: "CUOTA", order: 'ASC' }, { column: column_name, order: column_sort_order }]
    } else if (column_name == "CUOTA") {
      var data_order = [{ column: "ANIO", order: 'ASC' }, { column: column_name, order: column_sort_order }]
    } else {
      var data_order = [{ column: column_name, order: column_sort_order }]
    }

  }

  var total_records = await conn("ING_REPORT_DDJJ_131")
    .count("* as total")
    .whereBetween("ANIO", [desde, hasta])
    .whereNotNull("TIPO_LIQUIDACION");

  //search data

  if (request.params.actividades != "Actividades") {
    var search_activities = request.params.actividades;
    search_activities = search_activities.replace(/\*/g, '/');
    if (search_activities == 'sign') {
      search_activities = '?';
    }
  } else {
    var search_activities = "%";
  }


  if (request.params.cuenta != "cuenta") {
    var search_account = request.params.cuenta;
  } else {
    var search_account = "%";
  }

  if (request.params.cuit != "cuit") {
    var search_cuit = request.params.cuit;
  } else {
    var search_cuit = "%";
  }

  if (request.params.pagado != "pagado") {
    var search_pagado = request.params.pagado;
  } else {
    var search_pagado = "%";
  }

  if (request.params.eximido != "eximido") {
    var search_eximido = request.params.eximido;
  } else {
    var search_eximido = "%";
  }

  if (
    search_activities == "%" &&
    search_account == "%" &&
    search_cuit == "%" &&
    search_pagado == "%" &&
    search_eximido == "%"
  ) {
    var total_records_with_filter = await conn("ING_REPORT_DDJJ_131")
      .count("* as total")
      .whereBetween("ANIO", [desde, hasta])
      .whereNotNull("TIPO_LIQUIDACION")
  } else {
    var total_records_with_filter = await conn("ING_REPORT_DDJJ_131")
      .count("* as total")
      .whereBetween("ANIO", [desde, hasta])
      .whereNotNull("TIPO_LIQUIDACION")
      .where((builder) => {
        builder
          .where("NRO_COMERCIO", "like", `${search_account}`)
          .andWhere("ACTIVIDAD_DESCRIPCION", "like", `${search_activities}`)
          .andWhere("CUIT", "like", `${search_cuit}`)
          .andWhere("CUOTA_PAGA", "like", `${search_pagado}`)
          .andWhere("EXIMIDO", "like", `${search_eximido}`);
      });
  }


  var data_arr = [];
  let voucher_url = process.env.OLD_VOUCHER_URL;
  let voucher_separator = process.env.OLD_VOUCHER_SEPARATOR;

  var data = await conn("ING_REPORT_DDJJ_131")
    .select("*")
    .whereBetween("ANIO", [desde, hasta])
    .whereNotNull("TIPO_LIQUIDACION")
    .where('NRO_COMERCIO', 'like', `${search_account}`)
    .where('ACTIVIDAD_DESCRIPCION', 'like', `${search_activities}`)
    .where('CUIT', 'like', `${search_cuit}`)
    .where('CUOTA_PAGA', 'like', `${search_pagado}`)
    .where('EXIMIDO', 'like', `${search_eximido}`)
    .orderBy(data_order)
    .offset(start)
    .limit(query_length)
    .then(function (data) {
      data.forEach(function (row) {
        data_arr.push({
          NRO_COMERCIO: row.NRO_COMERCIO,
          CUIT: row.CUIT,
          RAZON_SOCIAL: row.RAZON_SOCIAL,
          ANIO: row.ANIO,
          CUOTA: row.CUOTA,
          TIPO_LIQUIDACION: row.TIPO_LIQUIDACION,
          PRESENTACION_TIPO: row.PRESENTACION_TIPO,
          FECHA_CREACION: row.FECHA_CREACION,
          PORCENTAJE_DESC: row.PORCENTAJE_DESC,
          MONTO_DECLARADO: row.MONTO_DECLARADO,
          DEDUCCIONES: row.DEDUCCIONES,
          MONTO_PAGAR: row.MONTO_PAGAR,
          CUOTA_PAGA: row.CUOTA_PAGA,
          ACTIVIDAD_DESCRIPCION: row.ACTIVIDAD_DESCRIPCION,
          EMPLEADOS_DECLARADOS: row.EMPLEADOS_DECLARADOS,
          EXIMIDO: row.EXIMIDO,
          EMAIL: row.EMAIL,
          TIPO_COMPROB: row.TIPO_COMPROB,
          NRO_COMPROBANTE: row.NRO_COMPROBANTE,
          VOUCHER_URL: voucher_url,
          VOUCHER_SEPARATOR: voucher_separator,
        });
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  var dataObject = {
    draw: draw,
    iTotalRecords: total_records[0].total,
    iTotalDisplayRecords: total_records_with_filter[0].total,
    data: data_arr,
  };
  return dataObject;
}