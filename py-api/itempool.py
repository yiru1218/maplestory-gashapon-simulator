import random
import threading

class ItemPool:
    def __init__(self) :
        self.items = []
        # self.max_prizes = 10000
        self.df = ''
        self.lock = threading.Lock()
    
    def add_item(self, dataframe):
        for item, num in zip(dataframe['item_name'], dataframe['prob_nums']):
            num = int(float(num.strip().replace('%', ''))*100)
            self.items += [item] * num
        random.shuffle(self.items)
    
    def draw_item(self):
        with self.lock:
            # 如果獎池為空補充獎池
            if not self.items:
                # Refill poll
                self.add_item(self.df)

            # Draw
            random_item_index = random.randint(0, len(self.items) - 1)
            # pop => 移除並取得該 index 的物品
            random_item = self.items.pop(random_item_index)
            
            return random_item