import pickle

data = pickle.load(open('artificats/componet_list.pkl', 'rb'))
similarity = pickle.load(open('artificats/similarity.pkl', 'rb'))

def recommend(model):
    index = data[data['Model'] == model].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key = lambda x: x[1])
    recommend_events_Model = []
    for i in distances[1:6]:
        recommend_events_Model.append(data.iloc[i[0]]['Model'])
    return recommend_events_Model


