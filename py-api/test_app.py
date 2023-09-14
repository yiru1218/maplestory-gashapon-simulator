import unittest
from app import app
import pymongo
import os


# 測試用 class 需要繼承自unittest.TestCase，以便使用unittest測試框架的功能
class TestAPP(unittest.TestCase):
    # 測試前先建立 app
    def setUp(self):
        self.app = app.test_client()

    # 測試完清除 app
    def tearDown(self):
        pass

    def test_mongodb_connection(self):

        try:
            # 連到 mongodb
            mongo_uri = os.environ.get("MONGO_URI")
            client = pymongo.MongoClient(mongo_uri)
            client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")

        except Exception as e:
            # 連接失敗
            self.fail(f"MongoDB connection test failed: {str(e)}")

    # 測試 home page route
    def test_home_route(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200) # 檢查 response code
        self.assertEqual(response.data.decode('utf-8'), 'home') # 檢查 response content 是否為 home

    # 測試 /draw-fashion-box
    def test_draw_fashion_box_route(self):
        response = self.app.get('/draw-fashion-box')
        self.assertEqual(response.status_code, 200)

    # 測試 /fashion-box-img-url
    def test_fashion_box_img_url_route(self):
        response = self.app.get('/fashion-box-img-url')
        self.assertEqual(response.status_code, 200)

    # 測試 /draw-pet-box
    def test_draw_pet_box_route(self):
        response = self.app.get('/draw-pet-box')
        self.assertEqual(response.status_code, 200)

    # 測試 /pet-box-img-url
    def test_pet_box_img_url_route(self):
        response = self.app.get('/pet-box-img-url')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()