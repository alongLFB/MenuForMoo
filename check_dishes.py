import json

def count_dishes():
    with open('menu-data-cn.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        dishes_count = len(data['dishes'])
        print(f'菜品总数：{dishes_count}')

if __name__ == '__main__':
    count_dishes()