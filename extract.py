import pickle
with open("./data/processed/Dataset_2/content_polluters_tweets.pickle", 'rb') as infile:
    new_dict = pickle.load(infile)
    print(dict)
    dict.clear()
