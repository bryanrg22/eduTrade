import google.generativeai as genai
import PIL.Image
import os

class GeminiPortal:

    api_key = os.environ["GOOGLE_API_KEY"]
    genai.configure()
    model = genai.GenerativeModel("gemini-1.5-flash")

    def get_stock_info(ticker, model=any):
        response = model.generate_content("Tell me about the " + ticker + " stock")
        return response

