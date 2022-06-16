// Call the dataTables jQuery plugin
$(document).ready(function () {
    dataTable = $("#dataTable").DataTable();
});

// Additions:
// - Filter through `status` column
$(document).ready(function () {
    dataTable = $("#ticketDataTable").DataTable({});

    $(".filter-checkbox").on("change", function (e) {
        var searchTerms = [];
        $.each($(".filter-checkbox"), function (i, elem) {
            if ($(elem).prop("checked")) {
                searchTerms.push($(this).val());
            }
        });
        dataTable.column(1).search(searchTerms.join("|"), true, false).draw();
    });

    $(".filter-btn").on("click", function (e) {
        var val = $(this).val();
        dataTable.column(5).search(val).draw();
    });
});
