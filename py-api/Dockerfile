# 使用官方 Python 3
FROM python:3

# 建立資料夾
WORKDIR /app

# 複製檔案到容器
COPY ./py-api/app.py .

# 安裝需要套件
RUN pip install -r ./py-api/requirements.txt

# Expose App 使用的端口
EXPOSE 8080

# 定義容器啟動後執行的 Command
CMD ["python", "app.py"]