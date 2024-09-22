from newsapi import NewsApiClient


def get_articles(ticker: str, size: int, newsapi: object) -> list[str]:
    """utilizes the newsAPI and returns the contents of 10 relevant 
    news articles regarding the ticker in a list"""
    all_articles = newsapi.get_everything(q=ticker,
                                        language='en',
                                        sort_by='relevancy',
                                        page=1,
                                        page_size=size)
    
    contents = []
    articles = all_articles['articles']
    
    for article in articles:
        contents.append(article['content'])

    return contents
