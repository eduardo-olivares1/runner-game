#!/usr/bin/env bash
export FLASK_APP='app:create_app("default")'
flask run --port=5000 &
python -m unittest discover tests --verbose