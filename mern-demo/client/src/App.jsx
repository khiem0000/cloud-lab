import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Danh sách sinh viên
  const [students, setStudents] = useState([]);

  // Dữ liệu Form
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: ""
  });


  // ==========================
  // GET danh sách sinh viên
  // ==========================
  const loadStudents = async () => {
    try {
      const response = await fetch("/api/students");

      if (!response.ok) {
        throw new Error("Không thể tải danh sách sinh viên");
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Lỗi tải danh sách:", error);
    }
  };


  // Gọi GET khi trang vừa mở
  useEffect(() => {
    loadStudents();
  }, []);


  // ==========================
  // Xử lý khi nhập Form
  // ==========================
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };


  // ==========================
  // POST thêm sinh viên
  // ==========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.studentId || !form.name || !form.email) {
      alert("Vui lòng nhập đầy đủ MSSV, Họ tên và Email");
      return;
    }

    try {
      const response = await fetch("/api/students", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sinh viên");
      }

      // Xóa dữ liệu trên Form sau khi thêm
      setForm({
        studentId: "",
        name: "",
        email: ""
      });

      // Tải lại danh sách
      await loadStudents();

    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);

      alert("Thêm sinh viên thất bại");
    }
  };


  return (
    <div className="container">

      <h1>Quản lý sinh viên</h1>


      {/* Form thêm sinh viên */}
      <form onSubmit={handleSubmit}>

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

        <button type="submit">
          Thêm sinh viên
        </button>

      </form>


      {/* Danh sách sinh viên */}
      <h2>Danh sách sinh viên</h2>

      <table>

        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student._id}>

              <td>{student.studentId}</td>

              <td>{student.name}</td>

              <td>{student.email}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;