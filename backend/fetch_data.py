import requests
import json
import os

def create_dictionary():
    if not os.path.exists('data'):
        os.makedirs('data')


def fetch_armor():
    all_armor = []
    page = 0

    while True:
        try:
            print(f"looking at page {page}")
            res = requests.get(f"https://eldenring.fanapis.com/api/armors?limit=100&page={page}")
            res.raise_for_status()

            data = res.json()

            armor_list = data.get('data', [])

            if not armor_list:
                break
        
            all_armor.extend(armor_list)
            page += 1

            if page > 20:
                break

        except requests.RequestException as r:
            print(f"trouble getting data from {page}: {r}")
            break

    try:

        with open('data/all_armor.json', 'w', encoding='utf-8') as f:
            json.dump(all_armor, f, indent=2, ensure_ascii=False)

        helmets = []
        chests = []
        legs = []
        gauntlets = []

        for armor in all_armor:
            category = armor.get('category', '').lower()

            if 'helmet' in category or 'helm' in category:
                helmets.append(armor)
            elif 'chest armor' in category:
                chests.append(armor)
            elif 'leg armor' in category or 'leg piece' in category:
                legs.append(armor)
            elif 'gauntlets' in category:
                gauntlets.append(armor)
        
        armor_types = {
            'helmets': helmets,
            'chests': chests,
            'legs': legs,
            'gauntlets': gauntlets
        }

        for armor_type, armor_pieces in armor_types.items():
            with open(f'data/{armor_type}.json', 'w', encoding = 'utf-8') as f:
                json.dump(armor_pieces, f, indent = 2, ensure_ascii = False)

            dropdown = [{
                'id': armor.get('id'),
                'name': armor.get('name')
            } for armor in armor_pieces]

            with open(f'data/{armor_type}_dropdown.json', 'w', encoding = 'utf-8') as f:
                json.dump(dropdown, f, indent = 2, ensure_ascii = False)

        categories = list(set(armor.get('category') for armor in all_armor if armor.get('category')))
        categories.sort()

        with open('data/armor_categories.json', 'w', encoding = 'utf-8') as f:
            json.dump(categories, f, indent = 2, ensure_ascii = False)

        print(f"found all armor!")

    except requests.RequestException as r:
        print(f"something went wrong with armor data: {e}")
    except Exception as e:
        print(f"error saving armor data: {e}")

if __name__ == "__main__":
    print("doing data fetching now!")
    create_dictionary()

    fetch_armor()

    f = open('data/all_armor.json')
    item_dict = json.load(f)
    print(len(item_dict))
