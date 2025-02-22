from rest_framework.response import Response
from rest_framework.decorators import api_view
from google import genai

# API Key ile Client oluştur
client = genai.Client(api_key="AIzaSyD2_YnVjw4POaqEqxuGnJNRfPcVqA8rPFk")

@api_view(["POST"])
def get_gemini_response(request):
    user_input = request.data.get("user_input", "")

    if not user_input:
        return Response({"error": "Giriş boş olamaz!"}, status=400)

    # Modeli kullanarak içerik üret
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[f"Hastalıklarımı söylüyorum, bana tavsiyeler ver: {user_input}"]
    )

    return Response({"response": response.text})
