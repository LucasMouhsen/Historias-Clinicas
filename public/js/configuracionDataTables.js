
 var table = $('#tasas').DataTable({
   'serverSide': true,
   'serverMethod': 'get',
   ajax: `/ddjj/presentaciones/list/${anioActual}/${anioActual}/Actividades/cuenta/cuit/pagado/eximido`,
   pageLength: 10,
   deferRender: true,
   columns: [
     { data: "NRO_COMERCIO" },
     { data: "CUIT" },
     { data: "RAZON_SOCIAL" },
     { data: "ANIO" },
     { data: "CUOTA" },
     { data: "TIPO_LIQUIDACION" },
     { data: "PRESENTACION_TIPO" },
     { data: "FECHA_CREACION" },
     { data: "PORCENTAJE_DESC" },
     { data: "MONTO_DECLARADO" },
     { data: "DEDUCCIONES" },
     { data: "MONTO_PAGAR" },
     { data: "CUOTA_PAGA" },
     { data: "ACTIVIDAD_DESCRIPCION" },
     { data: "EMPLEADOS_DECLARADOS" },
     { data: "EXIMIDO" },
     { data: "EMAIL" },
     {
       data: null,
       render: function (data) {
         let url = `${data.VOUCHER_URL}${data.TIPO_COMPROB}${data.VOUCHER_SEPARATOR}${data.NRO_COMPROBANTE}`;
         return `<a target="_blank" class="btn btn-info btn-circle" href="${url}"><i title="Imprimir comprobante" class="fa fa-pencil"></a>`;
       }
     }
   ],
   columnDefs: [
     {
       targets: [17],
       orderable: false
     },
     {
       targets: [7],
       render: function (data) {

         let fecha = new Date(data);
         let fechaFormateada = fecha.toLocaleDateString('en-GB');

         return fechaFormateada;
       }

     },
     {
       targets: [9, 11],
       render: function (data, type) {
         if (type === 'display') {
           data = '<span class="label label-custom">' + '<i class="ti-money"> </i>' + data.toFixed(2) + '</span>';
         }
         return data;
       }
     },
     {
       targets: 10,
       render: function (data, type) {
         if (data != null && type === 'display') {
           data = '<span class="label label-warning">' + '<i class="ti-money"> </i>' + data.toFixed(2) + '</span>';
         }
         return data;
       }
     },
     {
       targets: 12,
       render: function (data) {
         return data === 1 ? 'Si' : 'No';
       }
     },
     { "className": "dt-center", "targets": "_all" }
   ],
   language: {
     url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
   },
   order: [0, "asc"],
   dom: 'Brtip',
   buttons: [
     {
       extend: 'excel',
       text: 'Excel',
       action: function (e, dt, node, config) {
         var columnIndex = dt.order()[0][0];
         var columnOrder = dt.order()[0][1];
         if (columnIndex == undefined)
         {
           var columnName = undefined;
         }else{
           var columnName = dt.settings().init().columns[columnIndex].data;
         } 
         
         const desde = $('#desde').val();
         const hasta = $('#hasta').val();
         let cuenta = $('#cuenta').val() ? $('#cuenta').val() : 'cuenta';
         let cuit = $('#cuit').val() ? $('#cuit').val() : 'cuit';
         let pagado = $('#pagado').prop("checked") ? 1 : "pagado";
         let eximido = $('#eximido').prop("checked") ? 'S' : "eximido";
         let actividades = $('#actividades').val() ? $('#actividades').val().replaceAll('/', '*') : 'Actividades';
         if (actividades == '?') {
           actividades = "sign";
         }

         $.ajax({
           url: `/ddjj/presentaciones/export/${desde}/${hasta}/${actividades}/${cuenta}/${cuit}/${pagado}/${eximido}`,
           type: 'GET',
           data: { columnName: columnName,
                   columnOrder: columnOrder}, // Coloca aquí los parámetros que necesites para la petición AJAX
           success: function (data, textStatus, jqXHR) {
             var exportData = buildExportData(data);
             // Utilizamos:
             // Crea un objeto Blob con los datos del archivo Excel
             var blob = buildExportData(data);

             // Guarda el archivo Excel en el cliente
             saveAs(blob, 'Consulta de presentaciones (DDJJ).xlsx');
           },
         });
       },
       ajax: {
         url: `/ddjj/presentaciones/export/${desde}/${hasta}/${actividades}/${cuenta}/${cuit}/${pagado}/${eximido}`,
         type: 'GET',
         data: {},
         dataSrc: '',
       },
     },
     {
       extend: 'pdf',
       text: 'PDF',
       action: function (e, dt, node, config) {
         exportPDF(dt);
       }
     }
   ],
 });