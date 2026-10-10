
# Câu 51: Sử dụng Node.js làm Base Image
FROM node:22-alpine

# Câu 52: Thiết lập thư mục làm việc
WORKDIR /app

# Câu 53: Sao chép các file package
COPY package*.json ./

# Câu 54: Cài đặt thư viện React
RUN npm install

# Câu 55: Sao chép source code React
COPY . .

# Câu 56: Build React thành bản production
RUN npm run build

# Cổng dùng để xem bản build bằng Vite Preview
EXPOSE 4173

# Khởi động bản build React
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
