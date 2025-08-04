import requests
import json
import os

def create_dictionary():
    if not os.path.exists('data'):
        os.makedirs('data')


def fetch_armor():
    try:
        res = requests.get("https://eldenring.fanapis.com/api/armors?limit=750")
        res.raise_for_status()

        data = res.json()

        armor_list = data.get('data', [])

        with open('data/all_armor.json', 'w', encoding='utf-8') as f:
            json.dump(armor_list, f, indent=2, ensure_ascii=False)

        helmets = []
        chests = []
        legs = []
        gauntlets = []

        for armor in armor_list:
            category = armor.get('category', '').lower()

            if 'helmet' in category:
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

        categories = list(set(armor.get('category') for armor in armor_list if armor.get('category')))
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
