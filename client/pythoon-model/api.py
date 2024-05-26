from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the trained model
with open('commentmodel.pkl', 'rb') as f:
    model = pickle.load(f)

# # CORS headers
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Allow requests from any origin
#     response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
#     response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'
#     return response
class CORSMiddleware:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        def cors_start_response(status, headers, *args, **kwargs):
            headers.append(('Access-Control-Allow-Origin', 'http://localhost:3000'))
            headers.append(('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'))
            headers.append(('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept'))
            return start_response(status, headers, *args, **kwargs)

        if environ['REQUEST_METHOD'] == 'OPTIONS':
            response = cors_start_response('200 OK', [])
            return response

        return self.app(environ, cors_start_response)

# Apply CORS middleware
app.wsgi_app = CORSMiddleware(app.wsgi_app)

    
@app.route('/')
def home():
    return(
        "<h1>Hello to flask api</h1>"
    )
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
       
        data = request.args.get('text')
        
        
        # text = data['text']

        # Make predictions
        prediction = model.polarity_scores(data)
        print(data)

        # Return prediction as JSON response
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5001)
# from flask import Flask, request, jsonify
# import pickle

# app = Flask(__name__)

# # Load the trained model
# with open('commentmodel.pkl', 'rb') as f:
#     model = pickle.load(f)

# # CORS middleware
# class CORSMiddleware:
#     def __init__(self, app):
#         self.app = app

#     def __call__(self, environ, start_response):
#         def cors_start_response(status, headers, *args, **kwargs):
#             headers.append(('Access-Control-Allow-Origin', 'http://localhost:3000'))
#             headers.append(('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'))
#             headers.append(('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept'))
#             return start_response(status, headers, *args, **kwargs)

#         if environ['REQUEST_METHOD'] == 'OPTIONS':
#             response = cors_start_response('200 OK', [])
#             return response

#         return self.app(environ, cors_start_response)

# # Apply CORS middleware
# app.wsgi_app = CORSMiddleware(app.wsgi_app)

# @app.route('/')
# def home():
#     return "<h1>Hello to flask api</h1>"

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get data from request
#         data = request.json
        
#         # Extract text from request data
#         text = data.get('text')

#         if text is None:
#             return jsonify({'error': 'No text provided in the request body'}), 400

#         # Make predictions
#         prediction = model.polarity_scores(text)
#         print(text)

#         # Return prediction as JSON response
#         return jsonify({'prediction': prediction})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

