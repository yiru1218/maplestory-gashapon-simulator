from itempool import ItemPool
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pandas as pd
import http.client

app = Flask(__name__)
CORS(app)

### 時尚隨機箱 ###

# fashion_box_html = requests.get("https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=8373", 
#                                 verify=True, tls_version=ssl.PROTOCOL_TLSv1_2)
# fashion_box_html_content = fashion_box_html.text
# fashion_box_table = pd.read_html(fashion_box_html_content)
fashionbox_conn = http.client.HTTPSConnection("tw.beanfun.com")
fashionbox_conn.request("GET", "/beanfuncommon/EventAD_Mobile/EventAD.aspx?EventADID=8373")
fashionbox_response = fashionbox_conn.getresponse()
fashionbox_html = fashionbox_response.read()
fashionbox_conn.close()
fashion_box_table = pd.read_html(fashionbox_html)

# 不拿第一排
fashion_box_df = fashion_box_table[0][1:]
fashion_box_df.columns = ['item_name', 'prob_nums']
# 建立一個新獎池
fashion_box_pool = ItemPool()
# 獎池使用的 df
fashion_box_pool.df = fashion_box_df


### 寵物隨機箱 ###
# pet_box_table = pd.read_html("https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=8374")
pet_box_html = requests.get("https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=8374")
pet_box_html_content = pet_box_html.text
pet_box_table = pd.read_html(pet_box_html_content)
# 不拿第一排
pet_box_df = pet_box_table[0][1:]
pet_box_df.columns = ['item_name', 'prob_nums']
# 建立一個新獎池
pet_box_pool = ItemPool()
pet_box_pool.df = pet_box_df

@app.route("/")
def home():
    return "home"

@app.route("/draw-fashion-box")
def getFashionBoxDrawItem():
    return fashion_box_pool.draw_item()

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

@app.route("/draw-pet-box")
def getPetBoxDrawItem():
    return pet_box_pool.draw_item()

@app.route('/pet-box-img-url')
def getPetBoxUrl():
    pet_box_url_json = {
        "item_info": [
            {
                "item_name": "褐色小狗",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/d4a0cef7020e676f01cc2b0b34d14493.png"
            },
            {
                "item_name": "粉紅兔子",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/d661674a0eeabcc9aadc30548f0bd8a1.png"
            },
            {
                "item_name": "小魔龍",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/c32fc8975dc0f3fb1c78ea6b28ef14c7.png"
            },
            {
                "item_name": "黑色小貓",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/444cf83b8ea3ddf66778c78b0bca2b4c.png"
            },
            {
                "item_name": "白色兔子",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/76fc1aeb5b79a6c3f5a36e5d727dd07c.png"
            },
            {
                "item_name": "熊貓",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/d88a28911f17116cc3d8abd0cb3f4c7d.png"
            },
            {
                "item_name": "迪諾龍",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/83d3b6ef9b391ec8b290840dc146e729.png"
            },
            {
                "item_name": "妮諾龍",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/98a849a787e02256be2ba23b2e25843a.png"
            },
            {
                "item_name": "猴子",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/48848b728cf45b6fbb57a01f93b9ae27.png"
            },
            {
                "item_name": "大象",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/737b921b79d412988dfa672955c8fd62.png"
            },
            {
                "item_name": "雲豹",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/5fd1955e427298ee024d24d84eff2d67.png"
            },
            {
                "item_name": "雪吉拉",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/8c7f59c499d590fcaeddcbb88db83dfb.png"
            },
            {
                "item_name": "火雞",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/bb44f99c3f6739576f6c690598e2d494.png"
            },
            {
                "item_name": "小企鵝",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/1a10873f9fa554d5850c2e8fb826e6db.png"
            },
            {
                "item_name": "小巴洛古",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/f4afcafc42df4cbb30c1967278bc2ebf.png"
            },
            {
                "item_name": "豬八戒",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/56acb60bcff4604eddca54b7828e7b82.png"
            },
            {
                "item_name": "小刺蝟",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/033bec13453fb20d915e27cb04316303.png"
            },
            {
                "item_name": "菇菇寶貝",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/684ddcb8f8555b80191d339314bcb9d6.png"
            },
            {
                "item_name": "小帥虎",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/a4bbb19aa8f4169b267b3f8c3d5952d4.png"
            },
            {
                "item_name": "臭鼬",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/9ac9cecb8d48ac8a802b6cde06086765.png"
            },
            {
                "item_name": "噴水鯨魚",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/3fc0498ac1b691bf9deb312cfb0f04bc.png"
            },
            {
                "item_name": "鸚鵡噓噓",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/6120e4298f8d34b2edc2580fcd010584.png"
            },
            {
                "item_name": "海獺阿德力",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/1d31fc5360bdb9b73548ecf11934b2e7.png"
            },
            {
                "item_name": "猩猩龐克",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/76e306751b2295d5a2fd9ec3a45fd311.png"
            },
            {
                "item_name": "迷你冰騎士",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/9ecc003b89c73e822840fb74f018fe46.png"
            },
            {
                "item_name": "甜美犰狳",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/06ec35f481fd7f9e096714466dfb96dd.png"
            },
            {
                "item_name": "檸檬犰狳",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/6a517f06e7244c68cf48dc834ba39fd4.png"
            },
            {
                "item_name": "綠色犰狳",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/9293d108e88fb9755977a4df7b051826.png"
            },
            {
                "item_name": "生栗子",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/eed8ab44ddcdbb51c8efbdec93214147.png"
            },
            {
                "item_name": "小栗子",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/dff5ac06f8907064f6650cfae65e82e2.png"
            },
            {
                "item_name": "烤焦栗子",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/e91687721a97d3752a6db3d837d4d07a.png"
            },
            {
                "item_name": "灰色哈士奇",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/10ec8b2cee049290087fa7e2ba0e391e.png"
            },
            {
                "item_name": "小萊伊",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/5e6f0027a70c8d4cc0b5612d0e7fb77a.png"
            },
            {
                "item_name": "小波波",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/2047e2e423c0813405b284b52f3a3650.png"
            },
            {
                "item_name": "小阿樂",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/ec6ef7fa125bf1e93f8da94ee86b973e.png"
            },
            {
                "item_name": "松鼠亞倫",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/41307760e5eb10bc7b1dc69f162fee6a.png"
            },
            {
                "item_name": "松鼠薄荷",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/0240c8211d0a548e66cfe4e852c25fcc.png"
            },
            {
                "item_name": "松鼠娉可",
                "item_url": "http://www.gametsg.com/maplestory/icon_item/7a4bc171577b70f6bb89f98527e00c5e.png"
            }
        ]
    }

    return pet_box_url_json

if __name__ == '__main__':
    app.run(debug=True)