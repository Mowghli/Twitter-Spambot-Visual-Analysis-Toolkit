import pickle
import pandas as pd


class FeatureExtractor:
    def __init__(self):
        self.dataset1 = {}
        self.dataset2 = {}

    def load_base_data(self, polluters2="./data/processed/Dataset_2/content_polluters.pickle",
                             legitimate2="./data/processed/Dataset_2/legitimate_users.pickle",
                             polluters1="", legitimate1=""):

        #with open(polluters1, 'rb') as polluter1_file:
        #    self.dataset1["polluters"] = pickle.load(polluter1_file)

        #with open(legitimate1, 'rb') as legitimate1_file:
        #    self.dataset1["legitimate"] = pickle.load(legitimate1_file)
        
        with open(polluters2, 'rb') as polluter2_file:
            self.dataset2["polluters"] = pickle.load(polluter2_file)

        with open(legitimate2, 'rb') as legitimate2_file:
            self.dataset2["legitimate"] = pickle.load(legitimate2_file)

        
    def create_viz_data(self):
        self.load_data()

