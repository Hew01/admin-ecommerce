import os, sys
from flask import Flask, request

VERIFY_TOKEN = "EAADr2C3NhfMBO7ZBfTpVyI3QmHvFTYZCTkZBZCur5bEJfx6F3XkLWoHkVC2VCdJZBmUQmZBWZCdm58wHS6jYNZBLFOvBcvPbwmxl3sNsM9qjvU0JlFTmXsGO4k9wkjg0bStWJZBxOjedU4LjsOdRZATh46o5b4bIZAg5dAUiJRdfZACMHIKphuuKaQwC7VTsLwpvKcZAV"

app = Flask(__name__)

@app.route('/webhook', methods=['GET'])
def verify():
    if request.method == "GET":
        hub_challenge = request.args.get("hub.challenge")
        verify_token = request.args.get("hub.verify_token")
        print(verify_token)
        if verify_token == "hello":
            return hub_challenge  # Successful verification
        else:
            return "Verification failed", 403  # Unauthorized

    # Process POST requests containing messages (logic not shown here)

        return "ok", 200

if __name__ == "__main__":
    app.run(debug=True, port=80)


