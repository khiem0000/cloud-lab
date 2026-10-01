import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: ""
  });

  const [editingId, setEditingId] = useState(null);


  // =========================
  // GET danh sách sinh viên
  // =========================

  const loadStudents = async () => {
    try {
      const response = await fetch("/api/students");

      if (!response.ok) {
        throw new Error("Không thể tải danh sách sinh viên");
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Không thể tải danh sách sinh viên");
    }
  };


  useEffect(() => {
    loadStudents();
  }, []);


  // =========================
  // Xử lý nhập Form
  // =========================

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };


  // =========================
  // THÊM / CẬP NHẬT
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.studentId || !form.name || !form.email) {
      alert("Vui lòng nhập đầy đủ MSSV, Họ tên và Email");
      return;
    }


    try {

      // =====================
      // CẬP NHẬT
      // =====================

      if (editingId) {

        const response = await fetch(
          `/api/students/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(form)
          }
        );


        if (!response.ok) {
          throw new Error("Cập nhật sinh viên thất bại");
        }


        alert("Cập nhật sinh viên thành công");


        setEditingId(null);
      }


      // =====================
      // THÊM MỚI
      // =====================

      else {

        const response = await fetch(
          "/api/students",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(form)
          }
        );


        if (!response.ok) {
          throw new Error("Thêm sinh viên thất bại");
        }


        alert("Thêm sinh viên thành công");
      }


      // Xóa Form

      setForm({
        studentId: "",
        name: "",
        email: ""
      });


      // Tải lại danh sách

      await loadStudents();


    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  // =========================
  // Bắt đầu chỉnh sửa
  // =========================

  const handleEdit = (student) => {

    setEditingId(student._id);

    setForm({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });

  };


  // =========================
  // Hủy chỉnh sửa
  // =========================

  const handleCancel = () => {

    setEditingId(null);

    setForm({
      studentId: "",
      name: "",
      email: ""
    });

  };


  // =========================
  // XÓA
  // =========================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sinh viên này?"
    );


    if (!confirmed) {
      return;
    }


    try {

      const response = await fetch(
        `/api/students/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {
        throw new Error("Xóa sinh viên thất bại");
      }


      alert("Xóa sinh viên thành công");


      await loadStudents();


    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  return (
    <div className="page">

      <div className="container">

        {/* ========================= */}
        {/* TIÊU ĐỀ */}
        {/* ========================= */}

        <h1>Quản lý sinh viên</h1>

        <p className="subtitle">
          Hệ thống quản lý sinh viên MERN
        </p>


        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="studentId"
            placeholder="MSSV"
            value={form.studentId}
            onChange={handleChange}
          />


          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={form.name}
            onChange={handleChange}
          />


          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />


          <button
            type="submit"
            className="btn-primary"
          >
            {editingId
              ? "Cập nhật"
              : "Thêm sinh viên"}
          </button>


          {editingId && (
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Hủy
            </button>
          )}

        </form>


        {/* ========================= */}
        {/* DANH SÁCH */}
        {/* ========================= */}

        <div className="list-header">
          <h2>Danh sách sinh viên</h2>

          <span>
            {students.length} sinh viên
          </span>
        </div>


        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>MSSV</th>

                <th>Họ tên</th>

                <th>Email</th>

                <th>Thao tác</th>

              </tr>

            </thead>


            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="empty"
                  >
                    Chưa có sinh viên
                  </td>

                </tr>

              ) : (

                students.map((student) => (

                  <tr key={student._id}>

                    <td>
                      {student.studentId}
                    </td>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td className="actions">

                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() =>
                          handleEdit(student)
                        }
                      >
                        Sửa
                      </button>


                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() =>
                          handleDelete(student._id)
                        }
                      >
                        Xóa
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;