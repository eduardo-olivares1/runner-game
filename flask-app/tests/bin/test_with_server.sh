#!/usr/bin/env bash
export FLASK_APP=application.py
flask run --port=5000 &
python -m unittest discover tests --verbose