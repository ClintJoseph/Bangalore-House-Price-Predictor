from flask import Flask,request,jsonify
from flask_cors import CORS
import utils
app = Flask(__name__)
CORS(app)
@app.route('/get_location_names')
def get_location_names():
    utils.load_artifacts()
    response = jsonify({
        'locations':utils.get_locations()
    })
    
    return response

@app.route('/predict_home_price',methods=['POST'])
def predict_home_price():
    utils.load_artifacts()
    data = request.json # Expecting JSON data
    area = float(data['area_sqft'])
    bhk = float(data['bhk'])
    bath = float(data['bath'])
    location = data['location']
    
   
    response = jsonify({
        'estimated_price': utils.get_estimated_price(location,area,bhk,bath)
        
    })
    
    return response


if __name__ == "__main__":
    app.run()
