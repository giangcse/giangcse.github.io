import requests
from pyairtable import Table

# Airtable setup
AIRTABLE_API_KEY = "patNTQ16tN1lO8XPS.e9f528d6c5d548512f647134acb32915fa21f7b357e2d4d03a9540d22329a9d3"  # Thay bằng API key
AIRTABLE_BASE_ID = "app6Th0E9WNStZhGl"          # Thay bằng Base ID
AIRTABLE_TABLE_NAME = "INSTAGRAM PROFILES"    # Thay bằng tên table
table = Table(AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME)

# RapidAPI setup
RAPIDAPI_URL = "https://instagram-premium-api-2023.p.rapidapi.com/v1/user/by/username"
headers = {
    "x-rapidapi-key": "bc13a3b95fmsh363e7c905bef240p123ca9jsn517e096771d8",
    "x-rapidapi-host": "instagram-premium-api-2023.p.rapidapi.com"
}

# Lấy tất cả records từ Airtable
records = table.all()

# Duyệt qua từng record
for record in records:
    record_id = record["id"]
    fields = record["fields"]
    url = fields.get("URL", "")
    
    if url:
        print(f"Đang xử lý URL: {url}")
        # Gửi request tới RapidAPI với URL
        querystring = {"username": url.split('/')[-2]}  # Lấy username từ URL
        response = requests.get(RAPIDAPI_URL, headers=headers, params=querystring)
        print(f"HTTP Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {data}")
        
        # Giả sử response có cấu trúc chứa user info
        if data:
            user = data
            update_data = {
                "full_name": user.get("full_name", ""),
                "profile_pic_url": user.get("profile_pic_url", "")
            }
            
            # Cập nhật record trong Airtable
            table.update(record_id, update_data)
            print(f"Đã cập nhật {record_id}: {update_data['full_name']}")
        else:
            print(f"Không lấy được dữ liệu cho URL: {url}")
    else:
        print(f"Record {record_id} không có URL")