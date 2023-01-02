
// hàm tự động chạy khi trang load xong
$(document).ready(function () {
    //Load danh sách nhân viên
    loadData();

    // Tạo sự kiện cho các thành phần
    initEnvents();
});

/**
 * Load dữ liệu
 * CreateBy: PDDUY (27/11/2022)
 */
function loadData() {
    try {
        // loading
        $(".loading").show();

        //   Gọi api thực hiện lấy dữ liệu:
        fetch("https://cukcuk.manhnv.net/api/v1/employees")
        .then(res => res.json())
        .then(data=>{
            console.log(data);
            $("table#tbEmployeeList tbody").empty();
            for (const employee of data) {
                var employeeCodde = employee.EmployeeCode;
                let fullName = employee.FullName;
                let gender = employee.GenderName;
                let dateOfBirth = employee.DateOfBirth;
                let identityNumber = employee.IdentityNumber;
                let positionName = employee.PositionName;
                let departmentName = employee.DepartmentName;
                // Xử lý dữ liệu:
                // --> Định dạng dữ liệu ngày tháng: Chuyển thành dd/mm/yyyy
                dateOfBirth = fomatDate(dateOfBirth);

                // --> Định dạng dữ liệu tiền tệ
                

                //  Hiển thị dữ liệu lên table:
                // Build trHTML
                let trHTML = `<tr>
                                <td ><input type="checkbox"></td>
                                <td>${employeeCodde||""}</td>
                                <td>${fullName||"" }</td>
                                <td>${gender||""}</td>
                                <td  class="text-align--center">${dateOfBirth||""}</td>
                                <td>${identityNumber||""}</td>
                                <td>${positionName||""}</td>
                                <td>${departmentName||""}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="td-last">
                                    <button id="btn-change-employee"class="table-button td-title">Sửa</button>
                                    <button id="table-function-button" class="table-button function-button">
                                        <i class="icofont-caret-down"></i>
                                       
                                    </button>
                                </td>
                            </tr>`
                $("table#tbEmployeeList tbody").append(trHTML);

                // Ẩn loading
                $(".loading").hide();
            }
        })
        .catch(error => {
            console.log(error);
        })
        

        


    } catch (error) {
        console.log(error);
    }
}

/**
 * Lập trình sự kiện cho các thành phần
 * CreateBy: PDDUY (27/11/2022)
 */
function initEnvents() {
   try {
        // Nhấn thêm mới hiển thị form nhân viên để thêm 
        $("#btn-add-employee").click(function() {
            $("#form-employee-title").html("Thông tin nhân viên");
            $("#form-employee").css("display","flex");
            $("#form-employee").show();
            $("#input-code-employee").focus();
        })

        // Nhấn icon x để ẩn form nhân viên
        $("#btn-x").click(function() {
            $("#form-employee").hide();
        })

        // Nhấn nút hủy để ẩn form nhân viên
        $("#btn-cancel").click(function() {
            $("#form-employee").hide();
        })

        // Nhấn nút mũi tên để hiển thị danh sách chọn số bản ghi trên 1 trang
        $("#btn-records-page").click(function() {
            $("#records-page-data").show();
        })

        // Bắt sự kiện khi focus đến nút hủy sẽ quay lại focus vào ô mã nhân viên
        $("#btn-cancel").keydown(function(e) {
            try {           
                // debugger
                e.preventDefault();
                $("#input-code-employee").focus();
            } catch (error) {
                console.log(error);
            }
        })
        
        // Bắt sự kiện double click vào 1 hàng trong bảng hiện form sửa nhân viên
       $(document).on("dblclick",'tr' ,function () {
        try {
            // $("#form-employee-title").empty();
            $("#form-employee-title").html("Sửa thông tin nhân viên");
            $("#form-employee").css("display","flex");
            $("#form-employee").show();
            $("#input-code-employee").focus();
        } catch (error) {
            console.log(error);
        }
            
        });

        // Bắt sự kiện click vào một hàng trong bảng thì hàng đó thay đổi background
        $(document).on("click",'tr',function() {
            try {
                $("tr").css("background-color","rgb(236, 236, 236)")
            } catch (error) {
                console.log(error);
            }
        })

        // Bắt sự kiện click nút sửa trên bảng để hiện form sửa nhân viên
        $(document).on("click",'#btn-change-employee', function() {
            try {
                $("#btn-change-employee").click(function() {
                    // $("#form-employee-title").empty();
                    $("#form-employee-title").html("Sửa thông tin nhân viên");
                    $("#form-employee").css("display","flex");
                    $("#form-employee").show();
                    $("#input-code-employee").focus();
                }) 
            } catch (error) {
                console.log(erro);
            }
        })

        // Nhấn nút mũi tên trên ảng hiển thị các chức năng để lựa chọn
        // try {
        //     $("#btn-delete").click(function() {
        //         $("#btn-dropdown-menu").show();
        //     })
        // } catch (error) {
        //     console.log(error)
        // }

        try {
            $("#table-function-button").click(function() {
                $("#table-menu-function").show();
            })
        } catch (error) {
            console.log(error);
        }
        
        // Nhấn nút x trên dialog xóa để ẩn nó đi
        try {
            $("#dialog-delete--close").click(function() {

                $("#dialog-delete").hide();
            })
        } catch (error) {
            console.log(erro)
        }

        // Bắt sự kiện trong dialog khi focus đến nút không sẽ quay lại nút có
        $("#btn-dialog--no").keydown(function(e) {
            try {           
                // debugger
                e.preventDefault();
                $("#btn-dialog--yes").focus();
            } catch (error) {
                console.log(error);
            }
        })

        // Nhấn nút x trên dialog cảnh báo để ẩn nó đi
        try {
            $("#dialog-warning--close").click(function() {
                $("#dialog-warning").hide();
            })
            
        } catch (error) {
            console.log(erro)
        }

        // Bắt sự kiện nút đóng trên dialog cảnh báo để ẩn nó đi

        try {
            $("#btn-dialog--warning").click(function() {
                $("#dialog-warning").hide();
            })
            
        } catch (error) {
            console.log(erro)
        }

        // Nhấn nút x trên dialog lưu dữ liệu để ẩn nó đi
        try {
            $("#dialog-save--close").click(function() {
                $("#dialog-save").hide();
            })
            
        } catch (error) {
            console.log(erro)
        }



        // Để copy cho nhanh
        try {
            
        } catch (error) {
            console.log(erro)
        }
        
   } catch (error) {

   }
}