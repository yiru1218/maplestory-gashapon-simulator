import requests
from bs4 import BeautifulSoup 
import pandas as pd
from flask import Flask
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "hello"

@app.route("/fashion-box-data")
def getFashionBoxData():
    # r = requests.get("https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=8373") #將此頁面的HTML GET下來
    # # print(r.text) #印出HTML
    # # 將網頁資料以html.parser
    # soup = BeautifulSoup(r.text,"html.parser")
    # sel = soup.select("tbody tr td")

    # fashion_box = {}
    # fashion_box['item_name'] = []
    # fashion_box['prob_nums'] = []

    # for idx, s in enumerate(sel):
    #     if(idx > 1 and idx % 2 == 0):
    #         fashion_box['item_name'].append(s.text.strip())
    #         #print(idx, s.text.strip()) # strip() 去除空格
    #     elif(idx > 1 and idx % 2 == 1):
    #         fashion_box['prob_nums'].append(int(float(s.text.strip().replace('%', ''))*100))

    # df = pd.DataFrame(fashion_box)
    # pool = []
    # for item, num in zip(fashion_box['item_name'], df['prob_nums']):
    #     pool += [item] * num
    # random.shuffle(pool)
    # pool_json = {"pool": pool}
    fashion_box_table = pd.read_html("https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=8373")
    # [1:] 不拿第一排
    fashion_box_df = fashion_box_table[0][1:]
    fashion_box_df.columns = ['item_name', 'prob_nums']
    pool = []
    for item, num in zip(fashion_box_df['item_name'], fashion_box_df['prob_nums']):
        num = int(float(num.strip().replace('%', ''))*100)
        pool += [item] * num
    random.shuffle(pool)
    pool_json = {"pool": pool}

    return pool_json

@app.route('/fashion-box-img-url')
def getFashionBoxUrl():
    fashion_box_url_json = {
        "item_info": [
            {
                "item_name": "時裝神奇剪刀",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/2114ae5e5fdf014485a5f503d800e1c9.png"
            },
            {
                "item_name": "超性能擴音器",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/38781d92c7feaffd72af2fdc92136458.png"
            },
            {
                "item_name": "核心寶石1個交換券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/249f0f430670f449070b1ea87a76bbf2.png"
            },
            {
                "item_name": "日拋隱形眼鏡",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/a40e94b4bbc7eb04f181c0d36e6f9a44.png"
            },
            {
                "item_name": "通用高級染髮券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/e42b51beee2d8709db634c9273b90651.png"
            },
            {
                "item_name": "通用高級護膚券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/6227334b08697cbe964ec731f12c62fb.png"
            },
            {
                "item_name": "通用高級整形券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/ca19c1f7d20634a4afbcbaa34fde1f21.png"
            },
            {
                "item_name": "通用整形券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/c26c653101d0febc1c65740d6562fa10.png"
            },
            {
                "item_name": "通用高級美髮券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/c7567d19dffa9e48f5fe9b1c6c80cacb.png"
            },
            {
                "item_name": "通用美髮券",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/e11ebe7fb1198a4603838e41a1f17c9e.png"
            },
            {
                "item_name": "透明耳環",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/1f839e522dc7a24257bcc2f24d4dafeb.png"
            },
            {
                "item_name": "透明鞋子",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/6ebd2a68b2a6ae487ebc8b6780144c16.png"
            },
            {
                "item_name": "透明手套",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/5716ee1ac0a463d19a4a783652e3a55f.png"
            },
            {
                "item_name": "透明披風",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/80dbf37c9dda85d66316ddb50a9609bf.png"
            },
            {
                "item_name": "透明眼部裝飾",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/190e9cea4c6079303cb295dbf8939eca.png"
            },
            {
                "item_name": "透明面具",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/09e35695e8a3f5c1aa062a0225dbd549.png"
            },
            {
                "item_name": "透明帽",
                "item_url": "http://gametsg.techbang.com/maplestory/icon_item/d98f022ce80aac2bf6c117f4ca5489e4.png"
            }
        ]
    }

    return fashion_box_url_json

if __name__ == '__main__':
    app.run()