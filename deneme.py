from google import genai

client = genai.Client(api_key="AIzaSyD2_YnVjw4POaqEqxuGnJNRfPcVqA8rPFk")


user_input = input("Hastalıkların:")


response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["Hastalıklarımı sana söylüyorum bana tavsiyeler ver(Nedenleri söyleme sadece ne yapmam gerektiğini söyle KISA OLSUN) :"+user_input]
    )
print(response.text)
