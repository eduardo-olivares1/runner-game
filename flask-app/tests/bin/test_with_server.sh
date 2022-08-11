#!/usr/bin/env bash
flask run --port=5000 &
python -m unittest discover tests --verbose