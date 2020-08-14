import pickle
from datetime import datetime
import pandas as pd

valid_followers_adj_list = {}
with open('./data/raw/Dataset_2/legitimate_users_followings.txt') as valid_followers_f:
    lines = valid_followers_f.readlines()
    #import pdb; pdb.set_trace()
    for line_i in lines:
        followee, followers = tuple(line_i.split('\t'))
        followers = list(map(int, followers.strip().split(",")))
        valid_followers_adj_list[int(followee)] = followers

with open("data/processed/Dataset_2/legitimate_users_followings.pickle", 'wb') as pickle_f:
    pickle.dump(valid_followers_adj_list, pickle_f)

invalid_followers_adj_list = {}
with open('./data/raw/Dataset_2/content_polluters_followings.txt') as invalid_followers_f:
    lines = invalid_followers_f.readlines()
    for line_i in lines:
        followee, followers = tuple(line_i.split('\t'))
        followers = list(map(int, followers.strip().split(",")))
        invalid_followers_adj_list[int(followee)] = followers


with open("data/processed/Dataset_2/content_polluters_followings.pickle", 'wb') as pickle_f:
    pickle.dump(invalid_followers_adj_list, pickle_f)

valid_users_list =[] 
with open('data/raw/Dataset_2/legitimate_users.txt') as valid_users_f:
    lines = valid_users_f.readlines()
    for line_i in lines:
        line_i_list = line_i.strip().split('\t')
        line_i_list[0] = int(line_i_list[0])
        line_i_list[1] = datetime.strptime(line_i_list[1],"%Y-%m-%d %H:%M:%S")
        line_i_list[2] = datetime.strptime(line_i_list[2],"%Y-%m-%d %H:%M:%S")
        line_i_list[3] = int(line_i_list[3])
        line_i_list[4] = int(line_i_list[4])
        line_i_list[5] = int(line_i_list[5])
        line_i_list[6] = int(line_i_list[6])
        line_i_list[7] = int(line_i_list[7])
        valid_users_list.append(line_i_list)

users_columns = ["UserID", "CreatedAt", "CollectedAt", "NumerOfFollowings",
                       "NumberOfFollowers","NumberOfTweets","LengthOfScreenName",
                       "LengthOfDescriptionInUserProfile"]

valid_users_df = pd.DataFrame(valid_users_list, columns=users_columns)
valid_users_df.to_csv("data/processed/Dataset_2/legitimate_users.csv", index=False)


with open("data/processed/Dataset_2/legitimate_users.pickle", 'wb') as pickle_f:
    pickle.dump(valid_users_df, pickle_f)

invalid_users_list = [] 
with open('data/raw/Dataset_2/content_polluters.txt') as invalid_users_f:
    lines = invalid_users_f.readlines()
    for line_i in lines:
        line_i_list = line_i.strip().split('\t')
        line_i_list[0] = int(line_i_list[0])
        line_i_list[1] = datetime.strptime(line_i_list[1],"%Y-%m-%d %H:%M:%S")
        line_i_list[2] = datetime.strptime(line_i_list[2],"%Y-%m-%d %H:%M:%S")
        line_i_list[3] = int(line_i_list[3])
        line_i_list[4] = int(line_i_list[4])
        line_i_list[5] = int(line_i_list[5])
        line_i_list[6] = int(line_i_list[6])
        line_i_list[7] = int(line_i_list[7])
 
        invalid_users_list.append(line_i_list)

invalid_users_df = pd.DataFrame(invalid_users_list, columns=users_columns)
invalid_users_df.to_csv("data/processed/Dataset_2/content_polluters.csv", index=False)


with open("data/processed/Dataset_2/content_polluters.pickle", 'wb') as pickle_f:
    pickle.dump(invalid_users_df, pickle_f)

tweets_columns = ["UserID","TweetID","Tweet","CreatedAt"]

valid_tweets_list = [] 
with open('data/raw/Dataset_2/legitimate_users_tweets.txt') as valid_tweets_f:
    lines = valid_tweets_f.readlines()
    for line_i in lines:
        line_i_list = line_i.strip().split('\t')
        line_i_list[0] = int(line_i_list[0])
        line_i_list[1] = int(line_i_list[1])
        line_i_list[3] = datetime.strptime(line_i_list[3],"%Y-%m-%d %H:%M:%S")
 
        valid_tweets_list.append(line_i_list)

valid_tweets_df = pd.DataFrame(valid_tweets_list, columns=tweets_columns)
valid_tweets_df.to_csv("data/processed/Dataset_2/legitimate_users_tweets.csv", index=False)


with open("data/processed/Dataset_2/legitimate_users_tweets.pickle", 'wb') as pickle_f:
    pickle.dump(valid_tweets_df, pickle_f)

invalid_tweets_list = [] 
with open('data/raw/Dataset_2/content_polluters_tweets.txt') as invalid_tweets_f:
    lines = invalid_tweets_f.readlines()
    for line_i in lines:
        line_i_list = line_i.strip().split('\t')
        line_i_list[0] = int(line_i_list[0])
        line_i_list[1] = int(line_i_list[1])
        line_i_list[3] = datetime.strptime(line_i_list[3],"%Y-%m-%d %H:%M:%S")
 
        invalid_tweets_list.append(line_i_list)

invalid_tweets_df = pd.DataFrame(invalid_tweets_list, columns=tweets_columns)
invalid_tweets_df.to_csv("data/processed/Dataset_2/content_polluters_tweets.csv", index=False)


with open("data/processed/Dataset_2/content_polluters_tweets.pickle", 'wb') as pickle_f:
    pickle.dump(invalid_tweets_df, pickle_f)


#invalid_followers_adj_list = {}
#with open('filename') as invalid_followers_f:
#    lines = invalid_followers_f.readlines()
#    for line_i in lines:
#        followee, followers = tuple(line_i.split('\t'))
#        followers = list(map(int, followers.strip()))
#        invalid_followers_adj_list[followee] = followers
#

