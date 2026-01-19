import requests
import json

url = "http://127.0.0.1:8000/process-profile"
payload = {
    "name": "Test User",
    "education": "B.Tech CS",
    "skills": "Python, React",
    "interests": "AI, Web Dev",
    "experience": "Fresher"
}

try:
    print(f"Sending request to {url}...")
    response = requests.post(url, json=payload, timeout=300)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
