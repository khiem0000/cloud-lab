
# Câu 32: Chọn Node.js làm Base Image
FROM node:22-alpine

# Câu 33: Thiết lập thư mục làm việc
WORKDIR /app

# Câu 34: Sao chép các file quản lý package
COPY package*.json ./

# Câu 35: Cài đặt dependencies
RUN npm install

# Câu 36: Sao chép mã nguồn Backend
COPY . .

# Câu 37: Khai báo port Backend
EXPOSE 5000

# Câu 38: Khởi động Backend
CMD ["npm", "start"]
