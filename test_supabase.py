import urllib.request
import json

url = "https://mwuhbwlerbcvqlregxff.supabase.co/rest/v1/cafes"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dWhid2xlcmJjdnFscmVneGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODMwOTYsImV4cCI6MjA5MzQ1OTA5Nn0.YZjR8MAqPdD_xYw6mr9QLJ0ci-B6LHMPUxV6-Y4LuaI",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dWhid2xlcmJjdnFscmVneGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODMwOTYsImV4cCI6MjA5MzQ1OTA5Nn0.YZjR8MAqPdD_xYw6mr9QLJ0ci-B6LHMPUxV6-Y4LuaI",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# DELETE
delete_req = urllib.request.Request(f"{url}?id=eq.7", headers=headers, method="DELETE")
try:
    with urllib.request.urlopen(delete_req) as response:
        print("DELETE Status:", response.status)
        print("DELETE Data:", response.read().decode())
except urllib.error.HTTPError as e:
    print("DELETE Error Status:", e.code)
    print("DELETE Error Body:", e.read().decode())
