from textblob import TextBlob

def generate_response(contents: list[str], stock: str, sample_size: int, model: object) -> tuple[str, float, str, str]:
    """Generate response by analyzing the sentiment of articles and getting advice from the model."""

    total = 0.0
    vals = []
    for content in contents:
        blob = TextBlob(content)
        vals.append(float(blob.sentiment.polarity))
        total += float(blob.sentiment.polarity)

    avg_polarity = total / sample_size

    try:
        # Generate the response using the model
        response = model.generate_content(f"You are a financial advisor giving advice to a client on whether to buy a specific stock, the stock is the {stock} stock and based off the the past month from 10 relevant news/article sources about the stock, they have been read through a sentiment reader in which it return {avg_polarity} which is based on a -1 to 1 scale where 1 is overwhelmingly positive and -1 is overwhelmingly negative. Provide them with the advice to buy, sell, or hold, don't address the score, this is some of the information from the news sources {contents}, give your reason on why you chose to buy, sell, or hold, and why you wouldn't do the other options. Be more inclined to say Buy or Sell. Do all of this in just two-three sentences")
        response_action = model.generate_content(f"From the following advice, {response.text}, return me either, buy, sell, or hold, no explanation, either buy, sell, or hold, one word. Be more inclined to say Buy or Sell")
        response_values = model.generate_content(f"From the sentiment values, {vals}, give me the percentage for positive, neutral, and negative totalling up to 100%, an example would be something like 10, 40, 50, I just want those values in the order of positive, neutral, negative no explanation, just the numbers, don't clarify just the numbers, no commas, separate by spaces, don't add a escape sequence at the end")
        advice_text = response.text  # Assuming the generated content is in `text` field
        action = response_action.text
        positive, neutral, negative = get_distribution(response_values.text)

        return advice_text, avg_polarity, action, positive, neutral, negative
    
    except Exception as e:
        print(e)
        return "Error generating response", avg_polarity
    
def get_distribution(values: str) -> tuple:
    distro = values.split(' ')

    return distro[0], distro[1], distro[2]