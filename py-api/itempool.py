import random
import threading

class ItemPool:
    def __init__(self) :
        self.items = []
        # self.max_prizes = 10000
        self.mongodb_col = ''
        self.lock = threading.Lock()
    
    def add_item(self):
        # for item, num in zip(dataframe['item_name'], dataframe['prob_nums']):
        #     num = int(float(num.strip().replace('%', ''))*100)
        #     self.items += [item] * num
        # random.shuffle(self.items)
        for col in self.mongodb_col.find():
            num = int(float(col['prob_nums'].strip().replace('%', ''))*100)
            self.items += [col['item_name']] * num
        random.shuffle(self.items)

    def draw_item(self):
        with self.lock:
            # 如果獎池為空補充獎池
            if not self.items:
                # Refill poll
                self.add_item()

            # Draw
            random_item_index = random.randint(0, len(self.items) - 1)
            # pop => 移除並取得該 index 的物品
            random_item = self.items.pop(random_item_index)
            
            return random_item