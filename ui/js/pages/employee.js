
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
                                    <div class="td-title">Sửa</div>
                                    <button class="td-button"><i class="icofont-caret-down"></i></button>
                                </td>
                            </tr>`
                $("table#tbEmployeeList tbody").append(trHTML);

                // Ẩn loading
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
            $("#form-employee").show();
        })

        // Nhấn icon x để ẩn form nhân viên
        $("#btn-x").click(function() {
            $("#form-employee").hide();
        })
   } catch (error) {
    
   }
}