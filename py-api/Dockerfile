# 使用官方 Python 3
FROM python:3

# 建立資料夾
WORKDIR /app

# 複製檔案到目前容器目錄
COPY app.py ./
COPY itempool.py ./
COPY requirements.txt ./

# 安裝需要套件
RUN pip install -r requirements.txt

# Expose App 使用的端口
EXPOSE 8080

# 定義容器啟動後執行的 Command
CMD ["python", "app.py"]