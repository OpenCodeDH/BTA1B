$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/vehicle-plate-number',
    method: 'GET',
    success: function (res) {
      $('#provinceDropdown').select2({
        data: res.data,
        placeholder: 'Select a province'
      });
      $('#provinceDropdown').val('').trigger('change');
    },
    error: function (jqXHR, _) {
      alert(jqXHR.statusText);
    },
  });
});

$('#provinceDropdown').on('select2:select', function (e) {
  const provinceId = e.params.data.id;
  $.ajax({
    url: `http://localhost:3000/vehicle-plate-number/${ provinceId }`,
    method: 'GET',
    success: function (res) {
      $('#vehiclePlateNumber').html(`Biển số xe: ${ res.data.vehiclePlateNumber }`);
    },
    error: function (jqXHR, _) {
      alert(jqXHR.statusText);
    },
  });
});
