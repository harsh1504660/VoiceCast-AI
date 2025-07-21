import requests
import os 
def fetch_unsplash_image(query):
    def make_request(api_key, cse_id):
        url = "https://www.googleapis.com/customsearch/v1"
        params = {
            "key": api_key,
            "cx": cse_id,
            "q": query,
            "searchType": "image",
            "num": 1,
            "imgSize": "xlarge",
            "fileType": "png,jpg,jpeg,svg"
        }

        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            items = data.get("items")
            if items:
                print("✅ High-res Image URL:", items[0]["link"])
                return items[0]["link"]
            else:
                print("❌ No image found.")
        except Exception as e:
            print("❌ Error fetching image with given keys:", e)
        return None

    # First attempt
    result = make_request(os.getenv('unsplash_api1'), os.getenv('unsplash_cce1'))
    
    # Fallback to second key if first fails
    if not result:
        print("🔁 Trying fallback API key...")
        result = make_request(os.getenv('unsplash_api2'), os.getenv('unsplash_cce2'))

    return result

# result = fetch_unsplash_image('why cricket is so important game in india')
# print(result)