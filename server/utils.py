import json
import pickle
import numpy as np

__data_columns=None
__locations=None
__model = None
  
def get_locations():
    return __locations

def get_estimated_price(location,area,bhk,bath):
    try:
        loc = __data_columns.index(location.lower())
    except:
        loc = -1
    x=np.zeros(len(__data_columns))
    x[0] = bath
    x[1] = bhk
    x[2] = area
    if(loc >= 0):
        x[loc]=1
    return __model.predict([x])[0].round(2)

def load_artifacts():
    global __data_columns
    global __locations
    global __model

    with open('./artifacts/locations.json' ,'r') as f:
        __data_columns=json.load(f)['data_columns']
        __locations = __data_columns[3:]
    with open('./artifacts/mdl.pickle' , 'rb') as f:
        __model = pickle.load(f)
        pass
    
if __name__ == "__main__":
    load_artifacts()
    print(get_locations())
    print(get_estimated_price('1st Phase JP Nagar',1000,3,3))
